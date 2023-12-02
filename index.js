async function RunMainCode(){
 var adminLoginKey = "✓";
 require("./DB/mongo.connect.js");
function delay(milliseconds) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
};
 const express = require("express"),
    bodyParser = require('body-parser'),
    path = require("path"),
    cookieParser = require("cookie-parser"),
    app = express(),
    server = app.listen(3000),
    io = require('socket.io')(server);

  //using modules
  app
    .use(cookieParser("putaMexican_WtfItsASong", {
      maxAge: 900000 * 4 * 24 * 5,
      secure: true,
    }))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(bodyParser.urlencoded({ extended: true }))
    .engine("html", require("ejs").renderFile)
    .set("view engine", "ejs")
    .use(express.static(path.join(__dirname, "/public")))
    .set("views", path.join(__dirname, "/views"))
  io.use((socket, next) => {
    const sockcookies = socket.request.headers.cookie;
    socket.cookies = sockcookies;
    next();
  });
let data = [];
  app.post("/data/add", async(req, res) => {
var name = req.query.name;
var val = req.query.value;
    data.push({ name: name, value: val });
    res.send("success");
  });
  app.post("/data/get", async(req, res) => {
 res.json(data);
  });
  
app.get("/", async(req, res) => {
res.send("Hello Rahul (updated 9)");
});
app.get("/admin/panel", async(req, res) => {
 if(!req.cookies.admin_key || req.cookies.admin_key !== adminLoginKey){
 return res.render("admin/login");
 }
  res.render("admin", {
    data: data
  });
});
app.post("/admin/login", async(req, res) => {
var usr = req.body.user;
var pwd = req.body.password;
 if(!usr || !pwd){
 return res.send(false);
 }
 if(usr == "usr" || pwd == "pwd"){

 }
 res.send(false);
});

setTimeout(async() => {
// error_hain_ye
 console.log(await db.set("test", 0));
 console.log(await db.get("test"));
}, 5000);
};
RunMainCode();
