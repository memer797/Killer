var express = require('express');
var router = express.Router();

router.get("/", async(req, res) => {
res.send("support chat page will show here");
});

router.get("/chat/:id", async(req, res) => {
res.render(`support-chat`);
});

router.post("", async(req, res) => {
 res.send({success: true, chat_id: "xyz"}); 
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
*     sChatMessage_{id}:[] => messages:{} => cnt:String, time:Number, by:String, admin:Boolean, bot:Boolean, reply
* 
* 
**/
