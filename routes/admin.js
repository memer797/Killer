var express = require('express');
var router = express.Router();
router.use("*", async(req, res, next) => {
if(!req.cookies.admin_key || req.cookies.admin_key !== process.env.admin_login_cookie){
 return res.render("admin/login");
 }
next();
 });
//post routes for data handling
router.post("/data/save/movie", async(req, res) => {
if(!req.cookies.admin_key || req.cookies.admin_key !== process.env.admin_login_cookie){
 return res.json({success: false, msg: " err_authontication"});
}
 var name = req.body.name;
 await db.push("info.movie", name);
 res.json({success: true, msg: "movie saves successfully"});
});
router.post("/data/get/movie", async(req, res) => {
if(!req.cookies.admin_key || req.cookies.admin_key !== process.env.admin_login_cookie){
 return res.json({success: false, msg: " err_authontication"});
}
 var movAray = await db.getArray("info.movie");
 res.json({success: true, data: movAray});
});
router.post("/data/delete/movie", async(req, res) => {
 if(!req.body){
  return res.json({success: false, error: "body is not provided});
 }
var idToDel = req.body.id;
  if(!idToDel){
   return res.json({success: false, error: "id is not specified!});
  };
   res.json({success: true, msg: "done"});
});

//get methods to serve files
router.get("/", async(req, res) => {
res.render("admin/panel");
});
router.get('/movie', async(req, res) => {
 res.render('admin/movie');
});


module.exports = router;
