var express = require("express");
var router = express.Router();
var user_model = require("../models/user.model");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/reg", function (req, res, next) {
  var { email, password } = req.body;
  var user = new user_model({
    email,
    password,
  });
  user_model.find(
    {
      email,
      password,
    },
    (err, doc) => {
      if (doc.length) {
        return res.json({ code: 500, msg: "User already exists" });
      }
      user.save();
      return res.json({ code: 200, msg: "success" });
    }
  );
});





module.exports = router;