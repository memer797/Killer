async function RunMainCode(){
  var fakeLastMod = 1707477427165;
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
  app.use((req, res, next) => {
  console.log(req.originalUrl); // Output: current URL path
  next();
});
var apiRoute = require("./routes/api");
var adminRoute = require("./routes/admin");
let disabled = false;
  app.use("/api", apiRoute);
  app.use("/admin", adminRoute);
  if(disabled){
    app.use("*", async(req, res, next) => {
if(!req.cookies.admin_key || req.cookies.admin_key !== process.env.admin_login_cookie){
return res.send("We are updating the site");
 }
next();
 });
  }
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
  var daToSend = data.filter(ii => (ii.category).toLowerCase() === itemName.toLowerCase());
  res.render("category list", {
    list: daToSend,
    category: itemName
  });
});


//💩 hagna start
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
  app.get("/ping", async(req, res)=> {
    res.send(true);
  });
  function formatDateForSitemap(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if necessary
  const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if necessary
  const hours = String(date.getHours()).padStart(2, '0'); // Add leading zero if necessary
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Add leading zero if necessary
  const seconds = String(date.getSeconds()).padStart(2, '0'); // Add leading zero if necessary
  const timezoneOffset = date.getTimezoneOffset();
  const timezoneHours = Math.abs(Math.floor(timezoneOffset / 60)).toString().padStart(2, '0'); // Add leading zero if necessary
  const timezoneMinutes = Math.abs(timezoneOffset % 60).toString().padStart(2, '0'); // Add leading zero if necessary
  const timezoneSign = timezoneOffset > 0 ? '-' : '+';
  const timezoneString = `${timezoneSign}${timezoneHours}:${timezoneMinutes}`;

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezoneString}`;
}

var FakeDateToShowInGoogle = formatDateForSitemap(new Date(fakeLastMod));

app.get("/sitemap/dynamic/all-movies.xml", async(req, res) => {
  var movieDataToMap = await db.getArray("info.movie");
res.header('Content-Type', 'application/xml');
  res.send(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${movieDataToMap.map(data =>`<url>
<loc>https://memer797.onrender.com/movie/${data.id}</loc>
<lastmod>${FakeDateToShowInGoogle}</lastmod>
<changefreq>weekly</changefreq>
<priority>0.80</priority>
</url>
`).join('')}
</urlset>`);
    
  });  
app.post("/test", async(req, res) => {
  console.log(req.body);
});
  setTimeout(async() => {
    await db.pull("info.movie", {
     name: "Array category test",
     description: "nothing",
     tags: [],
     category: ["io"],
     img: "https://+_)₹",
     id: "test"
     });
  await db.push("info.movie", {
     name: "Array category test",
     description: "nothing",
     tags: [],
     category: ["io", "numm"],
     img: "https://+_)₹",
     id: "test"
     });
  }, 5000);
};
RunMainCode();
