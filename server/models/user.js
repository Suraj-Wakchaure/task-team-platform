const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, "Please privide a name"],
        trim: true
    },
    email:{
        type: String,
        required: [true, "Please provide email"],
        unique: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 8,
        validate: [validator.isStrongPassword, "Please provide a strong password"]
    }
},
{timestamps: true}
);

userSchema.pre('save', async function(){
    if(!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;