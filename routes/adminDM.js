var express = require("express");
var router = express.Router();
var wsAdminDm = socketIo.of("/ws/dm/admin");

wsAdminDm.on("connection", (soc) => {
  soc.on("ping", (cb) => {
cb(true);
  console.log("Ping req");
});
});

router.post("/query", async(req, res) => {
var senderName = req.body.name;
var query = req.body.q;
var qType = req.body.type || "feedback"; //newReq, feedback
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
    type: qType
  });
});

router.delete("/query", async(req, res) => {
var senderName = req.body.name;
var query = req.body.q;
  console.log("query to delete ↓");
  console.log({
    sender: senderName,
    query: query
  });
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
      var qqtoremv = await db.getArray("user.query");
      var qqtoremv = qqtoremv.filter(i => i.sender === senderName && i.query === query);
      if(qqtoremv.length < 1) return;
    console.log(await db.pull("user.query", qqtoremv[0]));
    }catch (i) { console.log(i); };
});

module.exports = router;
