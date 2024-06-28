const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/user.model");
const blacklist = require("../BlacklistToken");
require("dotenv").config();

const register = (req, res) => {
  const { userName, email, password, role } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.send({ message: "Something went wrong while hashing" });
      } else {
        const user = new UserModel({ userName, email, password: hash, role });
        await user.save();
        res.status(200).send({ message: "User Registered Successfully" });
      }
    });
  } catch (error) {
    res.status(500).send({ message: "Internal error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.send({ messge: "Error while comparing password" });
      }
      if (result) {
        const token = jwt.sign(
          { email: user.email, role: user.role, id: user._id, userName:user.userName },
          process.env.JWT_SECRET
        );
        res
          .status(200)
          .send({ message: "Login Successful", token: token, role: user.role });
      } else {
        res.send({ message: "Wrong Password" });
      }
    });
  } else {
    res.send({ message: "Wrong credentials. Enter correct email address." });
  }
};

const logout = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    blacklist.push(token);
    res.status(200).send({ message: "Logout Successful." });
  }
};

module.exports = { register, login, logout };
