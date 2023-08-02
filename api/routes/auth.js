const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    const userData = await user.save();
    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
  }
  // const user = new User({
  //   username: "Ali",
  //   email: "aliblkt@gmail.com",
  //   password: "12345678",
  // });
  // await user.save();
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    console.log("Inside login");
    !user && res.status(404).json("User not found in the DBASE");

    const pass = await bcrypt.compare(password, user.password);
    pass ? res.status(200).json(user) : res.status(404).json("Wrong password");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
