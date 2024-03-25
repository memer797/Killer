async function RunMainCode(){
  var fakeLastMod = 1707477427165;
 global.server = {
   startTime: Date.now()
 };
 global.uniqueMagaViews = 0;
 global.totalMagaViews = 0;
 global.srarchTermRecord = [];
  var noViwCnt = ["/admin", "/ping"];
 var viw = new Map();
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
  global.socketIo = io;
  const searchAlgo__ = require("./search algorithm .js");

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
  app.use((req, res, next) => {
    var iip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(iip);
  console.log(req.originalUrl); // Output: current URL path
  console.log(!(req.originalUrl.startsWith("/admin")));
var ip = req.ip;

    if(req.method.toLowerCase() === "get"){
      if(!(req.originalUrl.startsWith("/admin")) && !(req.originalUrl.startsWith("/ping"))){
      global.totalMagaViews++;
    if(!(viw.has(ip))){
   global.uniqueMagaViews++;   
    viw.set(ip, 1);
    }
    }
    }
  next();
});
var apiRoute = require("./routes/api");
var adminRoute = require("./routes/admin");
var allPagesRoute = require("./routes/pages");
var siteMapsRouter = require("./routes/site-maps");
var loginRoute = require('./routes/login');
var adminDM = require("./routes/adminDM");
var movieRoute = require("./routes/movie");
global.webDisabled = false;
  app.use("/api", apiRoute);
  app.use("/admin", adminRoute);
  app.use("/sitemap", siteMapsRouter);
  app.use('/pages', allPagesRoute);
  app.use('/login', loginRoute);
  app.use('/dm/admin', adminDM);
  app.use('/movie', movieRoute);
app.use("*", async(req, res, next) => {
if(global.webDisabled){
      if(req.originalUrl == '/login/admin'){ return next(); }else if(!req.cookies.admin_key || req.cookies.admin_key !== process.env.admin_login_cookie){
  return res.send("We are updating the site");
 }
next();
}else{
  next();
}
 }); 
 // if(disabled){
    
//  }
/* 
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
  */
  function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
  }
app.get("/", async (req, res) => {
    var data = await db.getArray("info.movie");
    var trendDataNow =  await db.getArray("trend.movie");
  const result = Object.values(data.reduce((acc, { name, category, img }) => {
  category.forEach(category => {
    acc[category] = acc[category] || { category, items: [] };
    acc[category].items.push({ name, img });
    // Shuffle the items array and keep only the first 5 items
    acc[category].items = shuffle(acc[category].items).slice(0, 5);
  });
  return acc;
}, {}));
let tmdtal = [];
  trendDataNow.forEach(g => {
var udf = data.filter(j => j.name === g);
    if(udf.length > 0){
      tmdtal.push({name: udf[0].name, img: udf[0].img }); 
    }
  });
  res.render('index', { data: result, trend: tmdtal });
});
  
app.get("/suggest", async(req, res) => {
var query = req.query.q ? req.query.q : "";
  var data = await db.getArray("info.movie");
      var options_s = {
        keys: ["name", "description"],
        includeScore: false,
        threshold: 0.4, // Adjust the threshold as needed
      };

      var fuse = new searchAlgo__(data, options_s);
      var result = fuse.search(query);
      res.json(result.map(item => ({name: item.item.name})));
});
  
app.get("/search/:term", async(req, res) => {
var query = req.params.term;
var data = await db.getArray("info.movie");
//console.log(data);  
  var options_s = {
        keys: ["name", "description", "tags", "category"],
        includeScore: false,
        threshold: 0.4, // Adjust the threshold as needed
      };

      var fuse = new searchAlgo__(data, options_s);
      var result = fuse.search(query);
     res.render("search list", {list: result.map(item => ({name: item.item.name, category: item.item.category, img: item.item.img})), term: query});
     //res.json(result.map(item => ({name: item.item.name, id: item.item.id})));

  global.srarchTermRecord.push(`${query} [•|{\\:/}|•] ${result[0] ? result[0].item.name : "404"}`); 
 });

//get all movie with related tag
app.get("/tag/:tagToSe", async(req, res) => {
var tagToSearch = req.params.tagToSe;
var allMovies = await db.getArray("info.movie");
var resultMovies = allMovies.filter(idata => idata.tags.includes(tagToSearch));
res.render("category list");
});

  //see all router
app.get("/see-all", async(req,res) => {
var dballmov = await db.getArray("info.movie");
  res.render("see-all", {
    list: dballmov
  });
});
  //catrgory see all router
app.get("/category/:item", async(req, res) => {
var itemName = req.params.item;
var data = await db.getArray("info.movie");
  var daToSend = data.filter(ii => (ii.category).filter(k => k.toLowerCase() === itemName.toLowerCase()).length > 0);
// var daToSend = data.filter(ii => ii.category.map(c => c.toLowerCase()).includes(itemName.toLowerCase()));

  res.render("category list", {
    list: daToSend,
    category: itemName
  });
});


//💩 hagna start
  //post methods
  var reqsec = new Map();  //set(key, value), get(key), has(key), delete(delete)

  app.post("/login/admin", async(req, res) => {
var usr = req.body.user;
var pwd = req.body.password;
var ip = req.ip;
var NowT = Date.now();
var TimeSt5min = NowT + (1000 * 60 * 5);
    if(reqsec.has(ip)){
      if((reqsec.get(ip)).ttime > NowT){
        if((reqsec.get(ip)).n > 5){
       return res.send("timeOut");
        }else{
        reqsec.set(ip, {
        ttime: TimeSt5min,
        n: (reqsec.get(ip)).n + 1
      });
        }
      }else{
      reqsec.set(ip, {
        ttime: TimeSt5min,
        n: 1
      });
      }
    }else{
      reqsec.set(ip, {
        ttime: TimeSt5min,
        n: 1
      });
    }
    
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

//dynamic sutemaps
  app.get("/sitemap/dynamic/index.xml", (req, res) => {
res.header('Content-Type', 'application/xml');
  res.send(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<url>
<loc>https://all-yt.onrender.com/ff/giveaway</loc>
<lastmod>2023-12-16T14:12:28+00:00</lastmod>
<changefreq>daily</changefreq>
<priority>1.00</priority>
</url>
</urlset>`);
    
  });
  app.get("/privacy-policy", async(req, res) => {
res.render("privacy-policy");
  });
    app.get("/about-us", async(req, res) => {
res.render("about-us");
  });
    app.get("/contact-us", async(req, res) => {
res.render("contact us");
  });
    app.get("/contact/chat", async(req, res) => {
//res.render("privacy-policy");
  });
  app.get("/ping", async(req, res)=> {
    res.send(true);
  });
  
app.post("/test", async(req, res) => {
  console.log(req.body);
});
};
RunMainCode();
