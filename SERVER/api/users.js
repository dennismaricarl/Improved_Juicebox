const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const JWT = process.env.JWT;
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

// <---------------------GET, REGISTER, LOGIN USER------------------------------->

//Get users
router.get("/", async (req, res, next) => {
  try {
    const user = await prisma.users.findMany();
    res.send(user);
  } catch (error) {
    next(error);
  }
});

//Register new user
router.post("/register", async (req, res, next) => {
  try {
    const { username, password, name, location } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const user = await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
        name,
        location,
      },
    });
    console.log(user, "hello");

    delete user.password;

    //generate a token for new user
    const token = jwt.sign({ id: user.id }, "hello");

    res.status(201).send({
      username,
      name,
      location,
      message: "thanks for signing up",
      token,
    });
  } catch (error) {
    next(error);
  }
});

//Log in existing user
router.post("/login", async (req, res, next) => {
  try {
    // console.log(req.body, "hello");
    const { username, password } = req.body;
    console.log(await prisma.users.findMany());
    const user = await prisma.users.findUnique({
      where: { username: username },
    });
    console.log(user);

    //if user doesn't exist, send an error response
    if (!user) {
      res.status(401).send({ message: "User not found!" });
      return;
    }

    //verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).send({ message: "Invalid password" });
    }
    //generate a JWT token for logged in user
    const token = jwt.sign({ id: user.id }, "hello");

    res.status(200).send({ user, token });
  } catch (error) {
    next(error);
  }
});

module.exports = router;