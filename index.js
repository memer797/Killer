async function RunMainCode(){
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
 app
    .use(cookieParser("putaMexican_WtfItsASong", {
      maxAge: 900000 * 4 * 24 * 5,
      secure: true,
    }))
    .use(express.urlencoded({ extended: false }))
    .use(express.json())
    .engine("html", require("ejs").renderFile)
    .set("view engine", "ejs")
    .use(express.static(path.join(__dirname, "/public")))
    .set("views", path.join(__dirname, "/views"))
  io.use((socket, next) => {
    const sockcookies = socket.request.headers.cookie;
    socket.cookies = sockcookies;
    next();
  });
var apiRoute = require("./routes/api");
var adminRoute = require("./routes/admin");

  app.use("/api", apiRoute);
  app.use("/admin", adminRoute);
 
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

app.get("/movie/:id", async(req, res) => {
  if(!req.params.id || req.params.id.trim() === ""){
   return res.send(`4** error, id parameter is required to fetch the movie example:: /movie/Jfo48BKue`);
  }
var id = req.params.id;
  var movie_info = await db.getArray("info.movie").filter(i => i.id === id);
  if(!movie_info || movie_info.length < 1){
    return res.send(`4** error, N 0 Movie F()und With ${id} id`);
  }
  res.json(movie_info);
});

  //post methods
app.post("/login/admin", async(req, res) => {
var usr = req.body.user;
var pwd = req.body.password;
 console.log(req.body);
 console.log(usr, pwd);
 if(!usr || !pwd){
 return res.send(false);
 }
 if(usr == process.env.admin_user || pwd == process.env.admin_pass){
res.cookie('admin_key', process.env.admin_login_cookie, {
      maxAge: 1000 * 3600 * 12,
      secure: true,
      httpOnly: true,
    });
  console.log("last");
  return res.send(true);
 }
 res.send(false);
});
};
RunMainCode();
