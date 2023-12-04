var express = require("express");
var router = express.Router();

router.get('/', async(req, res) => {
res.send({ success: true, msg; 'api route' });
});

router.get('/data', async(req, res) => {
res.json({ success: true, msg: 'data route' });
}):

module.exports = router;
