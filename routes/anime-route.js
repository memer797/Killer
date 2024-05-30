var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
res.send("Anime page");
});

module.exports = router;
