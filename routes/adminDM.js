var express = require("express");
var router = express.Router();
var wsAdminDm = socketIo.of("/ws/dm/admin");

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
  wsAdminDm.emit("new.query", { sender: senderName, query: query });
    await db.push("user.query", {
    sender: senderName,
    query: query
  });
});

router.delete("/query", async(req, res) => {
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
    msg: "query has been deleted"
  });
    try {
    console.log(await db.pull("user.query", JSON.stringify({
    sender: senderName,
    query: query
  })));
    }catch (i) { console.log(i); };
});

module.exports = router;
