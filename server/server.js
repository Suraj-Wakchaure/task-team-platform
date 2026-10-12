const express = require("express");
const cors = require('cors')
const dotenv = require('dotenv');
const mongoDBConn = require("./config/db");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

dotenv.config();
mongoDBConn();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', authRoutes);
app.use('/', taskRoutes);

app.get('/', (req, res)=>{
    res.send({message: "Task running..."});
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});