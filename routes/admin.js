var express = require('experss');
var router = express.Router();;

router.get("/", async(req, res) => {
res.send("hi");
});

module.exports = router;
