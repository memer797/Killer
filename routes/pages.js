var express = require("express");
var router = express.Router();

router.get('/see-all', async(req, res) => {
var pageNum = req.query.pageN;
if(!pageNum || pageNum.trim() === '' || isNaN(pageNum)){
return res.json({success: false, error: 'invalid page number provided'});
}
// here to do
});

router.get('/category', async(req, res) => {
var pageNum = req.query.pageN;
if(!pageNum || pageNum.trim() === '' || isNaN(pageNum)){
return res.json({success: false, error: 'invalid page number provided'});
}
// here to do
});

router.get('/tags', async(req, res) => {
var pageNum = req.query.pageN;
if(!pageNum || pageNum.trim() === '' || isNaN(pageNum)){
return res.json({success: false, error: 'invalid page number provided'});
}
// here to do
});





module.exports = router;
