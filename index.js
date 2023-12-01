//express body-parser path cookie-parser socket.io ejs cors mongoose web-push
async function RunMainCode(){
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
res.send("Hello Rahul (updated 3)");
});
app.get("/ex/template", async(req, res) => {
  var temp = [
    {
      name: "Ye fagli Fagli keya hai",
      author: "Fagli",
      id: "hobek kichu random id"
    },
    {
      name: "Tera toh game bajana padega",
      author: "babu bhai",
      id: "hobek kichu random id"
    },
    {
      name: "keya gunda banega re tu",
      author: "Unknown",
      id: "hobek kichu random id"
    },
    {
      name: "Mai basti ka hasti",
      author: "M***** C*** Stan",
      id: "hobek kichu random id"
    }
    ];
  
res.render("index", {
  data: temp
    });
});


};
RunMainCode();
