var express = require("express");
var router = express.Router();

router.get('/', async(req, res) => {
res.send({ success: true, msg; 'api route' });
});

router.get('/data', async(req, res) => {
res.json({ success: true, msg: 'data route' });
}):
router.get('/data/movie/:id', async(req, res) => {
var id = req.params.id;
  if(!id || id.trim() === ''){
  return res.json({ success: false, msg: 'id is not provided!'});
};
  
});
module.exports = router;
