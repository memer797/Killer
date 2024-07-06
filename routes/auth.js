var express = require("express");
var router = express.Router();

router.get("*", async(req, res, next)=> {
  next();
});

router.get("/", async(req, res) => {
  res.send("/route for login-signup");
});

router.get("/login", async(req, res) => {
  res.render("auth/login");
});
router.post("/login", async(req, res) => {
  if(!req.body || !req.body.email || !req.body.pass){
    return res.json({ success: false, msg: `${req.body.email ? req.body.pass ? "Somthing" : "Password" : "Email" } is not provided!`});
  }
});

router.get("/signup", async(req, res) => {
  res.render("auth/signup");
});
router.post("/signup", async(req, res) => {
  res.render("auth/signup");
});


//email activation url
router.get("/active", (req, res) => {
 res.send("Access Denied!");
});
router.get("/active/email", (req, res) => {
 res.send("Access Denied!");
});

router.get("/active/email/:id", async(req, res) => {
  //check if id exists or not 
  // get details of that id { email, sentTimeStamp, }
  // if timestamp + 1000 *60 * 10 < Date.now() it means tome expired show link expired page
  // send set apssword page
  // if all done verify email and send cookie to client to login
  // set email and password in db
});


//post mehtds to send emsil and passeord form client 

router.post("/login", async(req, res) => {
  // if honeypot == somthing return
  // req.limit > 5 -> temp ban for 10 minutes
  // send limit
  //check email if exists or nt
  //if email exists verify password if mached or nt
  //if email and password matched login the user
});

router.post("/signup", async(req, res) => {
  // if honeypot === somthing return safely 
  //* Check if it is temp displolwble email or not!
  // check ramil if already exists or not
  // send email activation link to the email
  // add the activation id to the db with timestamp
  //send auccess page
});

router.get("*", (req, res) => {
  res.send("huh!? ato kon link?");
});


module.exports = router;
