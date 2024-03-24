var express = require("express");
var router = express.Router();
var wsAdminDm = socketIo.of("/ws/dm/admin");

router.post("/query", async(req, res) => {
var senderName = req.body.name;
var query = req.body.q;
var ip = req.ip || '0.0.0.0';
  console.log(ip);
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
    query: query,
    ip: ip || '0.0.0.0'
  });
});

router.delete("/query", async(req, res) => {
var senderName = req.body.name;
var query = req.body.q;
var ip = req.body.ip || '0.0.0.0';
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
    await db.pull("user.query", {
    sender: senderName,
    query: query,
    ip: ip
  });
    }catch{};
});

module.exports = router;
