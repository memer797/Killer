var express = require("express");
var router = express.Router();

router.get("*", async(req, res, next)=> {
  next();
});

router.get("/", aaync(req, res) => {
  res.send("/route for login-signup");
});

router.get("/login", async(req, res) => {
  res.render("auth/login");
});

router.get("/signup", async(req, res) => {
  res.send("Signup Page hobek");
});

router.get("*", (req, res) => {
  res.send("huh!? ato kon link?");
});


module.exports = router;
