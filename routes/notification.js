var express = require('express');
var router = express.Router();

router.get("/", async(req, res) => {
  res.send("cannot get './notification.html' | unable to read notification.html");
});

router.post("/subscribe", async(req, res) => {
  res.send("no code to evaluate");
});

router.get("/get/:id", async(req, res) => {
  //
});

router.post("/perform-search", async(req, res) => {
  let query = req.query.term;
});
