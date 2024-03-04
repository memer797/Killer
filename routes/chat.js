var express = require("express");
var router = express.Router();
router.get("/", async(req, res) => {
  res.send("Chat Page");
});

//message history
router.get("/history", async(req, res) => {
res.json([{
  name: "String",
  content: "String",
  timestamp: "Number",
  senderId: "Number",
  messageId: "Number",
  role: "String", //user, member, developer, 
}]);
});


module.exports = router;
