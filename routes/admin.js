var express = require('express');
var router = express.Router();
var nowOnlineAdmin = socketIo.of("/ws/admin/me/online");
let nowOnlineAdminArray = [];
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

//settings route
router.get("/data/settings", async(req, res) => {
let gwd = global.webDisabled;
    res.json({
isInMaintainance: gwd
});
});
router.post("/data/settings", async(req, res) => {
var dat = req.body.te;
    global.webDisabled = dat;
res.json({
    success: true
});
});
//post routes for data handling
router.post("/data/save/trend/movie", async(req, res) => {
var name = req.body.name;
    if(!name || name.trim() === ""){
   return res.json({error: "invalid ${name}"});
    }
    var check = await db.getArray("info.movie");
var reallyAva = check.filter(d => ((d.name).toLowerCase()) === ((name).toLowerCase()));
    if(reallyAva.length === 0){
 return res.json({error: "not found"});
    }
    res.json({success: true, data: {
        name: reallyAva[0].name,
    }});
    await db.push("trend.movie", reallyAva[0].name);
});

router.post("/data/delete/trend/movie", async(req, res) => {
var name = req.body.name;
    if(!name || name.trim() === "") return;
res.json({success: true});  
    try{
 await db.pull("trend.movie", name);
    }catch{}
});

router.get("/data/get/trend/movie", async(req, res) => {
var dtaAAA = await db.getArray("trend.movie");
var dtaBBB = await db.getArray("info.movie");
let WhatToSend = [];
    dtaAAA.forEach(w => {
  var lop = dtaBBB.filter(n => ((n.name).toLowerCase()) === ((w).toLowerCase()));
        if(lop.length > 0){
            WhatToSend.push({ name: lop[0].name });
        }else{
            WhatToSend.push({ name: `[outdated] ${w}`, action: w});
          }
    });
    res.json(WhatToSend);
});

        

//save movie
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
 var language = req.body.language ? req.body.language : ["unknown"];
 var release_date = req.body.release_date ? req.body.release_date : "No Date Specified!";
 var cast = req.body.cast ? req.body.cast : "!";
 var links = req.body.links ? req.body.links : [];
 var h_type = req.body.h_type ? req.body.h_type : "Not Provided";
 var lastMod = Date.now();
    var validarray = await db.getArray("info.movie");
    var validarray = validarray.filter(k => ((k.name).toLowerCase()) === ((name).toLowerCase()));
    if(validarray.length > 0){
return res.json({
    success: false,
    msg: "Name Already aivalable",
    toast: {
        msg: `${name} this Movie is already aivalable in our DB`,
        type: "warning",
        time: 5000
    }
});
    }
 await db.push("info.movie", {
     name: name,
     h_type: h_type,
     description: description,
     tags: tags,
     category: category,
     img: img,
     duration: duration,
     language: language,
     release_date: release_date,
     cast: cast,
     links: links,
     lastMod: lastMod
     });
    
 res.json({success: true, msg: "movie saves successfully"});
});

//edit movie
router.post("/data/edit/movie", async(req, res) => {
    try{
if(!req.cookies.admin_key || req.cookies.admin_key !== process.env.admin_login_cookie){
 return res.json({success: false, msg: " err_authontication"});
}
 var name = req.body.name;
var lastName = req.body.lastName;
var h_type = req.body.h_type ? req.body.h_type : "Not Provided";
 var category = req.body.category;
if(!name || name.trim() === ""){ return res.json({success: false, msg: "name is required" }); };
if(!lastName || lastName.trim() === ""){ return res.json({success: false, msg: "name is required" }); };
if(!category || category.length == 0){ return res.json({success: false, msg: "atlease one category is required!" });}
 var description = req.body.description ? req.body.description : "No Description Provided";
 var tags = req.body.tags ? req.body.tags : [];
 var img = req.body.imageUrl ? req.body.imageUrl : "https://placekitten.com/200/100";
 var duration = req.body.duration ? req.body.duration : "00:00:00";
 var language = req.body.language ? req.body.language : ["unknown"];
 var release_date = req.body.release_date ? req.body.release_date : "No Date Specified!";
 var cast = req.body.cast ? req.body.cast : "!";
 var links = req.body.links ? req.body.links : [];
 var majorUpdate = req.body.majorUpdate;
 var lastMod;

    var allData = await db.getArray("info.movie");
    var lastData = allData.filter(f => ((f.name).toLowerCase()) === ((lastName).toLowerCase()));
    if(!lastData || lastData < 1){
   return res.json({success: false, msg: "name not found"});
    }
    var lastData = lastData[0];
    if(majorUpdate){
        var lastMod = Date.now();
    }else{
        var lastMod = lastData.lastMod || Date.now();
    }
 await db.pull("info.movie", lastData);
 await db.push("info.movie", {
     name: name,
     h_type: h_type,
     description: description,
     tags: tags,
     category: category,
     img: img,
     duration: duration,
     language: language,
     release_date: release_date,
     cast: cast,
     links: links,
     lastMod: lastMod
     });
        console.log(tags);
    
 res.json({success: true, msg: "movie edited successfully"});
    }catch(error){
        console.log(error);
        res.json({success: false, msg: "smt wnt wrng"});
    }
    });

//get movie
router.post("/data/get/movie", async(req, res) => {
if(!req.cookies.admin_key || req.cookies.admin_key !== process.env.admin_login_cookie){
 return res.json({success: false, msg: " err_authontication"});
}
 var movAray = await db.getArray("info.movie");
 res.json({success: true, data: movAray});
});

//get aprticular movie
router.get("/data/get/movie/:name", async(req, res) => {
if(!req.cookies.admin_key || req.cookies.admin_key !== process.env.admin_login_cookie){
 return res.json({success: false, msg: " err_authontication"});
}
    try {
 var movAray = await db.getArray("info.movie");
   var movAray = movAray.filter(s => ((s.name).toLowerCase()) === ((req.params.name).toLowerCase()));
    if(!movAray || movAray < 1){
        return res.json({success: false, msg: "Invalid or Unknown Movie Name provided!"});
    }
        var movAray = movAray[0];
 res.json({success: true, data: movAray});
    }catch{
        res.json({success: false, msg: "error***"});
    }
    
    });

//delete movie
router.post("/data/delete/movie", async(req, res) => {
if(!req.cookies.admin_key || req.cookies.admin_key !== process.env.admin_login_cookie){
 return res.json({success: false, msg: " err_authontication"});
    }
 if(!req.body || !req.body.name || req.body.name.trim() === ''){
return res.json({success: false, msg: 'name is not provided!'});
 }
    var toRemVe = (await db.getArray('info.movie')).filter(i => ((i.name).toLowerCase()) === ((req.body.name).toLowerCase()));
    if(!toRemVe || toRemVe.length < 1) {
        return res.json({success: false, msg: "no Movie Found With This name"});
    }
console.log(toRemVe);
 await db.pull("info.movie", toRemVe[0]);
 res.json({success: true, msg: `movie ${req.body.name} removed successfully`});
});








//get methods to serve files
router.get("/", async(req, res) => {
    var ttlMov = await db.getArray("info.movie");
    var ttlTrendMov = await db.getArray("trend.movie");
    var queryCount = await db.getArray("user.query");
res.render("admin/panel", {
    uniqueMagaViews,
    totalMagaViews,
    srarchTermRecord: global.srarchTermRecord,
    uptime: Date.now() - global.server.startTime,
    totalMovCount: ttlMov.length,
    totalTrendCount: ttlTrendMov.length,
    isInMaintainance: global.webDisabled,
    queryCount: queryCount.length,
    userQueryes: queryCount
});
});
router.get('/movie', async(req, res) => {
 //   await db.delete("info.movie");
 res.render('admin/movie');
});
router.get("/stat", async(req, res) => {
res.render("admin/stat");
});

//db view and dounload
router.get("/db/view", async(req, res) => {
var all = await db.all();
    res.json(all);
});
router.get("/db/dounload", async(req, res) => {
    res.setHeader('Content-disposition', 'attachment; filename=data.json');
  res.setHeader('Content-type', 'application/json');
    var all = await db.all();
    res.json(all);
});

nowOnlineAdmin.on("connection", async(socket) => {
    nowOnlineAdminArray.push(socket.id);
 socket.on("data", (cb) => {
cb(nowOnlineAdminArray);
 });
});

    
module.exports = router;
