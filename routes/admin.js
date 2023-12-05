var express = require('express');
var router = express.Router();
01 router.use("*", async(req, res, next) => {
if(!req.cookies.admin_key || req.cookies.admin_key !== process.env.admin_login_cookie){
 return res.render("admin/login");
 }
next();
 });

router.get("/", async(req, res) => {
res.render("admin/panel");
});

module.exports = router;
