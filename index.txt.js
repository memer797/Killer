async function main() {
  var notiData = [];
var webpush = require("web-push");
  const publicVapidKey = "BFBYkqKzQhf3M3vX7ob4ShejdLO5bmMG05jvF30O3VyYyzJ1wwraLOwgatPqT-uYMid4pKsYeW4-qh_GycOJKh0";
 const privateVapidKey = "zBc0h3PU7acdbzc-ESn0PAPfFfYzN8V0YcEN7C_7a7U"; // Setup the public and private VAPID keys to web-push library.
 webpush.setVapidDetails("mailto: ora@gmail.com", publicVapidKey, privateVapidKey);
  var webdata = require("./data.json");
  
  function delay(milliseconds) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
  }
 require("./DB/mongo.connect.js");
  require("./_include/common.js");
  require("./📦function/ms.js");
  const express = require("express"),
    bodyParser = require('body-parser'),
    path = require("path"),
    cookieParser = require("cookie-parser"),
    app = express(),
    server = app.listen(80),
    io = require('socket.io')(server);
  var ffRouter = require("./router/ff");
 var apiRouter = require("./router/api");
const cors = require('cors');
 // app.set('trust proxy', 1);
  app.use(cors());
  app
    .use(cookieParser("wyhd", {
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

  function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
 for(i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  }
  function parseCookies(data) {
    return data.split(';').reduce((cookies, cookie) => {
      const [name, value] = cookie.split('=').map(c => c.trim());
      cookies[name] = value;
      return cookies;
    }, {});
  }
  //routes
await delay(3000);
  app.get("/", (req, res) => {
    res.send(`<head><meta name="google-site-verification" content="UUEU7B2WIwH_jh79-XntQKLIT2gvmmYiOn4UUH155ZA" /></head>hii`)
  });
  app.use("/ff", ffRouter);
  app.use("/api", apiRouter);
  app.get("/test", async (req, res) => {

    console.log(Date.now()-(Date.now()+(1000*60*60*24)));
  //  res.cookie('FFsecretToken', 'test', {
    //  maxAge: 900000 * 4 * 24 * 5,
  //    secure: true,
  //    httpOnly: true,
  //  });
    /* let cookies = parseCookies(req.headers.cookie);  await db.push(`FF_user_info`, {
      secret: "test",
      name: 'test babe',
      id: 893
      });*/
    res.send(req.cookies);

    //res.send("hii");
  });


  //generates unique id id fcookieor c
  async function generateCookieSecret() {
    let tknn = generateRandomString();
    var alrlist = await db.getArray("used_cookie_secret_tokens_");
    while (alrlist.includes(tknn)) {
      tknn = generateRandomString();
    }
    await db.push("used_cookie_secret_tokens_", tknn);
    return tknn;
  };
  //free fire signup
  app.get("/signup/ff", async (req, res) => {
    var redirect = req.query.redi;
    if (!redirect) {
      var redirect = `/ff/giveaway`;
    };
let filteredredi = redirect;
    while(filteredredi.startsWith("/")){
      filteredredi = filteredredi.replace(/\//, "");
    }
var titleToSet = webdata[filteredredi] ? webdata[filteredredi] : "Free Fire > Unknown Page";
    console.log(titleToSet)
    if (req.cookies.FFsecretToken) {
      var rawUserData = await db.getArray(`FF_user_info`);
      var rawUserData_ = rawUserData.filter(i => i.secret == req.cookies.FFsecretToken);
      if (rawUserData_.length || rawUserData_.length > 0) {
        return res.redirect(redirect);
      }
    }
    res.render("freefire/signupFF.ejs", {
      redurl: redirect,
      title: titleToSet,
    });
  });
  //signup post
  app.post("/signup/ff", async (req, res) => {
    var body = req.body;
    var id = body.uid;
    var name = body.username;
    var password = body.password;

    if (!id) {
      return res.json({ success: false, message: "id is required", res: "uid" });
    } else if (!name) {
      return res.json({ success: false, message: "name is required", res: "username" });
    } else if (!password) {
      return res.json({ success: false, message: "password is required", res: "password" });
    } else if (name.length < 2) {
      return res.json({ success: false, message: "Name must be at least 2 characters.", res: "username" });
    } else if (name.length > 10) {
      return res.json({ success: false, message: "Name must be Shorter then 11 character.", res: "username" });
    } else if (id.length < 7) {
      return res.json({ success: false, message: "Invalid Uid length.", res: "uid" });
    } else if (id.length > 15) {
      return res.json({ success: false, message: "Invalid Uid length.", res: "uid" });
    } else if (password.length < 4) {
      return res.json({ success: false, message: "Use a Strong Pa$$word", res: "password" });
    }
    var secctoset = await generateCookieSecret();
    res.cookie('FFsecretToken', secctoset, {
      maxAge: 900000 * 4 * 24 * 5,
      secure: true,
      httpOnly: true,
    });
    await db.push(`FF_user_info`, {
      secret: secctoset,
      name: name,
      id: id,
      password: password
    });
    res.json({ success: true });
  });

  // Socket Configaration
  io.on("connection", async (socket) => {
    console.log(`client connected: ..`);
    var secretTKN = parseCookies(socket.request.headers.cookie).FFsecretToken;

    if (!secretTKN) {
      return socket.emit("reload_");
    }
    var userData = await db.getArray("FF_user_info");
    var userData = userData.filter(i => i.secret == secretTKN);
    if (!userData || !userData.length || userData.length === 0) {
      return socket.emit("reload_");
    }
    var userData = userData[0];
    console.log("login ✓ ");
    var name = userData.name;
    var id = userData.id;
    var password = userData.password;
    socket.on("join.giveaway.ff", async (cb) => {
      if(await db.get("giveaway.ff.endsTime") - Date.now() < 1){
        return;
      }
      var userList = await db.getArray("ff_giveaway_user_list_");
      if (!userList) {
        var userList = [];
      };
      if (userList.includes(id)) {
cb(false);
  return;
  };
      await db.push("ff_giveaway_user_list_", id);
   cb(true);   io.sockets.emit("giveaway.ff.join.data", { message: `${name} Joined The Giveaway 🎉`, curr_count: userList.length + 1 });
    });

    socket.on("leave.giveaway.ff", async (cb) => {
      if(await db.get("giveaway.ff.endsTime") - Date.now() < 1){
        return;
      }
      var userList = await db.getArray("ff_giveaway_user_list_");

      if (!userList) {
        var userList = [];
      };
      console.log(userList);
      if (!userList.includes(id)) {
   cb(false);     
return;
};
      await db.pull("ff_giveaway_user_list_", id);
  cb(true);
      io.sockets.emit("giveaway.ff.leave.data", { message: `${name} Left The Giveaway ⛔`, curr_count: userList.length - 1 });
    });
   //#Depricate 
    /*socket.on("giveaway.ff.check_my_entry", async (callback) => {
      if (!callback) { return; };
      var userList = await db.getArray("ff_giveaway_user_list_");
      if (userList.includes(id)) {
        callback(true);
      } else {
        callback(false);
      }
    });*/
    socket.on("giveaway_data_current", async (callback) => {
      var is_ended = await db.get("giveaway.ff.isEnded");
      var winner = await db.get("giveaway.ff.winner");
      var prize = await db.get("giveaway.ff.prize");
      var start = await db.get("giveaway.ff.startTime");
      var end_in = await db.get("giveaway.ff.endsTime");
      if (!is_ended) {
        var is_ended = false;
      };
      if (is_ended == false) {
        var winner = null;
      }
      var userList = await db.getArray("ff_giveaway_user_list_");
      callback({
        user_count: userList.length,
        prize: prize,
        start_time: start,
        ends_in: end_in,
        is_ended: is_ended,
        winner: winner,
      });
    });







  });
  // end of socket configuration 
//****
    await db.set("giveaway.ff.endsTime", Date.now()+(1000*60*60*24));
//await db.set("giveaway.ff.startTime", Date.now());
  //****
  setTimeout(async() => {
    let useerAray = await db.getArray("ff_giveaway_user_list_");
    console.log(useerAray);
   
    if(!useerAray || useerAray.length < 1){
      await db.set("giveaway.ff.winner", `No one participated in the giveaway, so a winner could not be chosen.`);
    io.sockets.emit("ff_giveaway_winner_data", {name: "No one participated in the giveaway, so a winner could not be chosen.", id: "*"});
    console.log("ended WITH NO ONE");
      var payload = JSON.stringify({ title: "Giveaway Ended", body: "Giveaway Is just ended Check Winner Rn" });
 notiData.forEach(data => {   webpush.sendNotification(data, payload).catch(console.log);
                          });

    }else{
       var ranCh = Math.floor(Math.random() * useerAray.length);
var chWid = useerAray[ranCh];
var chWname = await db.getArray("FF_user_info");
var chWname = chWname.filter(x => x.id == chWid)[0].name;

await db.set("giveaway.ff.winner", `${chWname} (${chWid})`);
    io.sockets.emit("ff_giveaway_winner_data", {name: chWname, id: chWid})
    console.log("ended")
     var payload = JSON.stringify({ title: "Giveaway Ended", body: "Giveaway Is just ended Check Winner Rn" });
 notiData.forEach(data => {   webpush.sendNotification(data, payload).catch(console.log);
                          });
    }
 //  await db.delete("ff_giveaway_user_list_");
  }, await db.get("giveaway.ff.endsTime") - Date.now())
console.log(await db.getArray("FF_user_info"));
console.log(await db.getArray("ff_giveaway_user_list_"));

  //notification subscription
  app.post('/subscribe', (req, res) => {
      const subscription = req.body;
      res.status(201).json({});
     var payload = JSON.stringify({ title: "Test Notification", body: "This is a test notification" });
 //notiData.forEach(data => { 
    webpush.sendNotification(subscription, payload).catch(console.log);
console.log(subscription)
           //               });
    notiData.push(subscription);
  });

}
main();


/////new











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
  
app.get("/", async (req, res) => {
    var data = await db.getArray("info.movie");
var result = Object.values(data.reduce((acc, { name, category, img, id }) => {
  acc[category] = acc[category] || { category, items: [] };
  acc[category].items.push({ name, img, id });
  return acc;
}, {}));

  res.render('index', { data: result, allData: data });
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
      res.json(result.map(item => ({name: item.item.name, id: item.item.id})));
});
app.get("/search/:term", async(req, res) => {
var query = req.params.term;
var data = await db.getArray("info.movie");
//console.log(data);  
  var options_s = {
        keys: ["name", "description", "tags", "category", "id"],
        includeScore: false,
        threshold: 0.4, // Adjust the threshold as needed
      };

      var fuse = new searchAlgo__(data, options_s);
      var result = fuse.search(query);
     res.render("search list", {list: result.map(item => ({name: item.item.name, id: item.item.id, category: item.item.category, img: item.item.img})), term: query});
     // res.json(result.map(item => ({name: item.item.name, id: item.item.id})));
});

app.get("/movie/:id", async(req, res) => {
  if(!req.params.id || req.params.id.trim() === ""){
   return res.send(`4** error, id parameter is required to fetch the movie example:: /movie/Jfo48BKue`);
  }
var id = req.params.id;
  var movie_info = await db.getArray("info.movie");
  var movie_info = movie_info.filter(i => i.id === id);
  if(!movie_info || movie_info.length < 1){
    return res.send(`4** error, N 0 Movie F()und With ${id} id`);
  }
  console.log(movie_info);
  var name = movie_info[0].name;
  var description = movie_info[0].description;
  var img = movie_info[0].img;
  var category = movie_info[0].category;
  var tags = movie_info[0].tags;
  res.render("show_movie", {
    name: name,
    banner: {
      jpg: img
    },
    release_date: "16/12/2023",
    duration: "16 minutes",
    category: category,
    actors: ["sujoy", "rahul", "memer", "crystal", "duplicate"],
    language: "english",
    description: description,
    file_size: "1.2 gb",
    downloads: [
      {
        link: "https://prize-pulse.uk.to/ff/giveaway",
        quality: "144",
        size: "500 mb"
      },
      {
        link: "https://prize-pulse.uk.to/ff/giveaway",
        quality: "72p",
        size: "1.2 gb"   
      }
    ],
    tags
  });
});
//get all movie with related tag
app.get("/tag/:tagToSe", async(req, res) => {
var tagToSearch = req.params.tagToSe;
var allMovies = await db.getArray("info.movie");
var resultMovies = allMovies.filter(idata => idata.tags.includes(tagToSearch));
res.render("category list");
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
};
RunMainCode();
