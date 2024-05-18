var express = require('express');
var router = express.Router();

router.get("/", async(req, res) => {
  let userCok = req.cookies.guestSupportChat;
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
  let userCok = req.cookies.guestSupportChat;
  let chatMsg = [];
  if(!userCok){
    chatMsg = [];
  }else{
    let dbDataChatMsg = await db.getArray(`$chat_hist_${userCok}`); 
    if(!dbDataChatMsg || dbDataChatMsg.length === 0){
      chatMsg = [];
    }else{
      chatMsg = dbDataChatMsg; /*
                {
                  "cnt": String,
                  "admin": Boolean,
                  "bot": Boolean,
                  "time": Number,
                  "name": String
                }
      */
    }   
  }
  res.render(`support-chat`, { chatMsg });
});

router.post("/chat", async(req, res) => {
  let userCok = req.cookies.guestSupportChat;
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
