var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
res.send("display.render(page[home].webseries())");
});

module.exports = router;
