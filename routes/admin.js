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
 var category = req.body.category;
if(!name || name.trim() === ""){ return res.json({success: false, msg: "name is required" }); };
if(!category || category.length == 0){ return res.json({success: false, msg: "atlease one category is required!" });}
 var description = req.body.description ? req.body.description : "No Description Provided";
 var tags = req.body.tags ? req.body.tags : [];
 var img = req.body.imageUrl ? req.body.imageUrl : "https://placekitten.com/200/100";
 var duration = req.body.duration ? req.body.duration : "00:00:00";
 var language = req.body.language ? req.body.language : "Unspecified";
 var release_date = req.body.release_date ? req.body.release_date : "No Date Specified!";
 var cast = req.body.cast ? req.body.cast : "!";
 var links = req.body.links ? req.body.links : [];
 var rID = generateRandomString(20);
 await db.push("info.movie", {
     name: name,
     description: description,
     tags: tags,
     category: category,
     img: img,
     id: rID
     });
    
 res.json({success: true, msg: "movie saves successfully", id: rID});
});
router.post("/data/get/movie", async(req, res) => {
if(!req.cookies.admin_key || req.cookies.admin_key !== process.env.admin_login_cookie){
 return res.json({success: false, msg: " err_authontication"});
}
 var movAray = await db.getArray("info.movie");
 res.json({success: true, data: movAray});
});
router.post("/data/delete/movie", async(req, res) => {
if(!req.cookies.admin_key || req.cookies.admin_key !== process.env.admin_login_cookie){
 return res.json({success: false, msg: " err_authontication"});
    }
 if(!req.body || !req.body.id || req.body.id.trim() === ''){
return res.json({success: false, msg: 'id is not provided!'});
 }
    var toRemVe = (await db.getArray('info.movie')).filter(i => i.id === req.body.id);
    if(!toRemVe || toRemVe.length < 1) {
        return res.json({success: false, msg: "no Movie Found With This Id"});
    }
console.log(toRemVe);
//   return res.json(toRemVe);
    console.log(await db.getArray("info.movie"));
 await db.pull("info.movie", toRemVe[0]);
        console.log(await db.getArray("info.movie"));
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
router.get("/stat", async(req, res) => {
res.render("admin/stat");
});

module.exports = router;
