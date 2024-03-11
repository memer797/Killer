var express = require("express");
var router = express.Router();

router.post("/query", async(req, res) => {
var senderName = req.body.name;
var query = req.body.q;
  if(!senderName || !query){
    return res.json({
      success: false,
      msg: `${senderName ? "" : "name"}${senderName ? "" : query ? "" : " and" }${query ? "" : " query"} is required!!`
    });
  }
})

module.exports = router;
