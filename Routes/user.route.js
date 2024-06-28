const express = require("express");
const { register, login, logout } = require("../Conrtollers/user.controller");
require("dotenv").config();

const userRouter = express.Router();

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.get("/logout", logout);

module.exports = userRouter;
