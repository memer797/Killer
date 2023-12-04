var express = require("express");
var router = express.Router();

router.get('/', async(req, res) => {
res.send({ success: true, msg: 'api route' });
});

router.get('/data', async(req, res) => {
res.json({ success: true, msg: 'data route' });
});
router.get('/data/movie/:id', async(req, res) => {
var id = req.params.id;
  if(!id || id.trim() === ''){
  return res.json({ success: false, msg: 'id is not provided!'});
};
var movieArray = await db.getArray('info.movie');
  var thatMovie = mmovieArray.filter(mov => mov.id === id);
  if(!thatMovie || thatMovie < 1){
    return res.json({ success: false, msg: `no movie found with this id ${id}`});
  };
});
module.exports = router;
