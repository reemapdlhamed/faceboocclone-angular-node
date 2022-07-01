const res = require("express/lib/response");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const isAuth = require("../MW/auth");

const router = require("express").Router();
router.put("/:id",isAuth, async (req, res) => {
  if (req.body.userId === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("updated user");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("only ur account");
  }
});

module.exports = router;
