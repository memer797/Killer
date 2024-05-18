var express = require('express');
var router = express.Router();

router.get("/", async(req, res) => {
  let userCok = req.cookie.guestSupportChat;
  let chat = {};
  if(!userCok){
    chat = {};
  }else{
    let dbDataChat = await db.get(`$chat_${userCok}`);
    if(!dbDataChat){
      chat = {};
    }else{
      chat = dbDataChat; /*
             {
              "title": "Title",
              "last_msg": "",
              "show_indi": Boolean,
              "status": :OPEN | CLOSED | SOLVED | PENDING:
             }
      */
    }
  }
res.send("support chat page will show here", { chat });
});

router.get("/chat", async(req, res) => {
let userCok = req.cookie.guestSupportChat;
  let chat = {};
  if(!userCok){
    chat = {};
  }else{
    let dbDataChat = await db.get(`$chat_${userCok}`);
    if(!dbDataChat){
      chat = {};
    }else{
      chat = dbDataChat;
    }
  }
  res.render(`support-chat`, { chat });
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
