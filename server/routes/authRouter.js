const res = require("express/lib/response");
const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
//register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    const newuser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashed,
    });

    const user = await newuser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.send(400);
  }
});








//login
router.post("/login", async (req, res) => {
    try {    
      const user = await User.findOne({email:req.body.email});
      !user && res.status(404).json("user not found")
      const validPass = await bcrypt.compare(req.body.password,user.password)
      !validPass && res.status(400).json("WRONG pass")
      res.status(200).send(user);
    } catch (err) {
      console.log(err);

    }
  });
module.exports = router;
