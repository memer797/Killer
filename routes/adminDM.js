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
  res.json({
    success: true,
    msg: "query has been submitted"
  });
  await db.push("user.query", {
    sender: senderName,
    query: query
  });
})

module.exports = router;
