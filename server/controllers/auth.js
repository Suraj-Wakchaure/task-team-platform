const User = require("../models/user");
const generateToken = require("../utils/generateToken")


const registerUser = async (req, res)=>{
    try{
        const {name, email, password} = req.body;

        if (!name || !email || !password){
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                message: "User already exists with this email"
            });
        }

        const user = await User.create({name, email, password});

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}


const loginUser = async (req, res) =>{
    try{
        const {email, password, rememberMe} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message: "Email and Password required."
            })
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                message: "User not found. Please register first."
            });
        }
        if(await user.comparePassword(password)){
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id, rememberMe)
            });
        }else{
            return res.status(401).json({
                message: "Invalid credentials."
            });
        }
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('_id name email');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Task = require("../models/task");

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Task.updateMany({ assignedUser: req.params.id }, { assignedUser: null });
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getUsers, deleteUser };