var express = require('express');
var router = express.Router();
function generateRandomString(length) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomString += charset.charAt(randomIndex);
    }

    return randomString;
}
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
if(!name || name.trim() === ""){ return res.json({success: false, msg: "name is required" }); };
 var description = req.body.description ? req.body.description : "No Description Provided";
 var tags = req.body.tags ? req.body.tags : [];
 var category = req.body.category ? req.body.category : "Unknown";
 var img = req.body.img ? req.body.img : "";
 var rID = generateRandomString(20);
 await db.push("info.movie", {name: name});
 res.json({success: true, msg: "movie saves successfully", id: rID});
});
router.post("/data/get/movie", async(req, res) => {
if(!req.cookies.admin_key || req.cookies.admin_key !== process.env.admin_login_cookie){
 return res.json({success: false, msg: " err_authontication"});
}
 var movAray = await db.getArray("info.movie");
 var sendAre = [];
 movAray.forEach(dt => {
sendAre.push({ name: dt });
 });
 res.json({success: true, data: sendAre});
});
router.post("/data/delete/movie", async(req, res) => {
if(!req.cookies.admin_key || req.cookies.admin_key !== process.env.admin_login_cookie){
 return res.json({success: false, msg: " err_authontication"});
}
 console.log(req.body.id);
 if(!req.body || !req.body.id || req.body.id.trim() === ''){
return res.json({success: false, msg: 'id is not provided!'});
 }
 await db.pull("info.movie", req.body.id);
 res.json({success: true, msg: `movie ${req.body.id} removed successfully`});
});








//get methods to serve files
router.get("/", async(req, res) => {
res.render("admin/panel");
});
router.get('/movie', async(req, res) => {
 //   await db.delete("info.movie");
 res.render('admin/movie');
});


module.exports = router;
