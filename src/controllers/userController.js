const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const route = require("express").Router();

const saltRounds = 10;

const generateJwt = (id) => {
  return jwt.sign(id, privateKey, {
    expiresIn: "1h",
  });
};

route.post("/register", async (req, res) => {
  const { email, name, password } = req.body;
  const User = User.findOne({ where: { email } });

  if (User) res.json({ error: "Account already exists" });

  const hash = bcrypt.hashSync(password, saltRounds);
  const newUser = User.create({ name, email, password: hash });

  const token = generateJwt(newUser.id);

  return res.json({
    account: newUser,
    token: token,
  });
});

route.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const User = User.findOne({ where: { email } });

  const match = User ? bcrypt.compareSync(password, User.password) : null;

  if (!match) res.json({ error: "Account does not exists" });

  const token = generateJwt(User.id);

  return res.json({
    account: newUser,
    token: token,
  });
});

module.exports = route;
