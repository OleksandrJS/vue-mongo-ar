/** @format */

const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel.js");
const generateToken = require("../utils/generateToken.js");

const userRouter = express.Router();

userRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(404)
        .send({ message: "User with this email not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(404).json({ message: "Wrong password" });
    }

    return res.status(200).send({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      phone: user.phone,
      email: user.email,
      token: generateToken(user),
    });
  } catch (e) {
    res.status(403).send({ message: "Invalid email or password" });
  }
});

userRouter.post("/register", async (req, res) => {
  try {
    const checkEmail = await User.findOne({ email: req.body.email });

    if (checkEmail) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      phone: req.body.phone,
      email: req.body.email,
      password: hashedPassword,
    });

    const createdUser = await user.save();

    res.status(201).send({
      _id: createdUser._id,
      first_name: createdUser.first_name,
      last_name: createdUser.last_name,
      username: createdUser.username,
      phone: createdUser.phone,
      email: createdUser.email,
      token: generateToken(createdUser),
    });
  } catch (e) {
    res.status(500).send({ message: "Something went wrong" });
  }
});

module.exports = userRouter;
