var express = require("express");
var router = express.Router();


router.get("/", async(req, res) => {
  res.send("Chat Page");
});

//message store
router.get("/message/store", async(req, res) => {
res.json([{}]);
});


module.exports = router;
