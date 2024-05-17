var express = require('express');
var router = express.Router();

router.get("/", async(req, res) => {
res.send("support chat page will show here");
});

router.get("/chat/:id", async(req, res) => {
res.send(`opening chat id: ${req.params.id}`);
});

router.post("", async(req, res) => {
 res.send({success: true, chat_id: "xyz"}); 
});
