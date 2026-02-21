const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET;

async function registerUser(req, res) {
  try {
    const { firstName, lastName, username, password } = req.body;

    // basic validation
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    // check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        message: "User already registered with this username",
      });
    }

    // create user
    const user = new User({
      firstName,
      lastName,
      username,
      password,
    });

    await user.save(); // password is hashed by schema middleware

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
}

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    // console.log("afd",username)
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send({ message: "Authentication Failed" });
    }
    const isPasswordVaild = await user.comparePassword(password);
    if (!isPasswordVaild) {
      return res.status(404).send({ message: "you entered wrog password" });
    }
    let token = jwt.sign({ _id: user?._id }, secretKey, { expiresIn: "1h" });

    console.log("asfd", user?._id);
    let finalData = {
      _id: user?._id,
      username: user?.username,
      firstName: user?.firstName,
      lastName: user?.lastName,
      token,
    };
    res.send(finalData);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

const AuthController = {
  registerUser,
  loginUser,
};

module.exports = AuthController;
