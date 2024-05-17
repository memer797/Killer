var express = require('express');
var router = express.Router();

router.get("/", async(req, res) => {
res.send("support chat page will show here");
});
