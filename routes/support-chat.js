var express = require('express');
var router = express.Router();

router.get("/", async(req, res) => {
  let userCok = req.cookie.guestSupportChat;
  let chat = {};
  if(!userCok){
    chat = {}
  }else if(await 
res.send("support chat page will show here");
});

router.get("/chat/:id", async(req, res) => {
  let userCok = req.cookie.guestSupportChat;
res.render(`support-chat`);
});

router.post("/chat", async(req, res) => {
  let userCok = req.cookie.guestSupportChat;
  let { title, name } = req.body;
  res.json({success: true, id: `somthing random unique id", msg: "Support Chat Created Successfully ✓ named ${title}`});
});

router.delete("/chat/:id", async(req, res) => {
 res.json({success: true, msg: `${req.params.id} Chat Deleted ✓`}); 
});


module.exports = router;


/**
* support chat data structur
* 
*     aupportChats:[] = items:{} => name:String, title:String, createdAt:Number, id:String
* 
* 
* chat messgae store data structure
*  
*     sChatMessage_{id}:[] => messages:{} => cnt:String, time:Number, by:String, admin:Boolean, bot:Boolean
* 
* 
**/
