var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
res.send("Movie page");
});

module.exports = router;
