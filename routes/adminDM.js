var express = require("express");
var router = express.Router();

router.post("/query", async(req, res) => {
var senderName = req.body.name;
var query = req.body.q;
  if(!senderName || !query){
    return res.json({
      success: false,
      msg: `${senderName ?? ""} ${senderName ? query ? "" : "and"  : ""} is required!!`
    });
  }
})

module.exports = router;
