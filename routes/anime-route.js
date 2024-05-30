var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
res.send("display.render(page[home].anime())");
});

module.exports = router;
