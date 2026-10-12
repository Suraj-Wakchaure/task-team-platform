const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");
const { registerUser, loginUser, getUsers, deleteUser } = require("../controllers/auth");
        
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", authMiddleware, getUsers);
router.delete("/users/:id", authMiddleware, deleteUser);

module.exports = router;