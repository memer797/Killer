const express = require("express");
const router = express.Router();
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

router.get("/", async(req, res) => {
  var data = await db.getArray("info.movie");
  var data = data.filter(item => item.contentType === "movie");
    var trendDataNow =  await db.getArray("trend.movie");
  const result = Object.values(data.reduce((acc, { name, category, img }) => {
  category.forEach(category => {
    acc[category] = acc[category] || { category, items: [] };
    acc[category].items.push({ name, img });
    // Shuffle the items array and keep only the first 5 items
    acc[category].items = shuffle(acc[category].items).slice(0, 10);
  });
  return acc;
}, {}));
let tmdtal = [];
  trendDataNow.forEach(g => {
var udf = data.filter(j => j.name === g && j.contentType === "movie");
    if(udf.length > 0){
      tmdtal.push({name: udf[0].name, img: udf[0].img }); 
    }
  });
  res.render('index', { data: result, trend: tmdtal });
});
// generate download link route: get
router.get('/generate/download/:name', async(req, res) => {
  if(!req.params.name || req.params.name.trim() === ""){
   return res.json({
   succcess: false,
   msg: `name is not provided, try to refresh your page`
   });
  }

var name = req.params.name;
  var movie_info = await db.getArray("info.movie");
  var movie_info = movie_info.filter(i => (((i.name).toLowerCase()).replace(/ /g, "-")) === (name.toLowerCase()).replace(/ /g, "-"));
  if(!movie_info || movie_info.length < 1){
    return res.json({
      success: false,
      msg: `${name} movie not found`
    });
  }
  // console.log(movie_info); //var links = movie_info[0].links;
    var links = movie_info[0].links;
    res.json({
      links: links
    });
});

// movie download link page
router.get("/download/:name", async(req, res) => {
  if(!req.params.name || req.params.name.trim() === ""){
   return res.send(`4** error, name parameter is required to fetch the movie example:: /movie/download/jawan`);
  }
var name = req.params.name;
  if(name.includes(".html")){
var name = name.replace(".html", "");
  }
  var movie_info = await db.getArray("info.movie");
  var movie_info = movie_info.filter(i => (((i.name).toLowerCase()).replace(/ /g, "-")) === (name.toLowerCase()).replace(/ /g, "-"));
  if(!movie_info || movie_info.length < 1){
    return res.send(`4** error, N 0 Movie F()und With ${name} name`);
  }
  console.log(movie_info);
  var name = movie_info[0].name;
  var description = movie_info[0].description;
  var img = movie_info[0].img;
  var category = movie_info[0].category;
  var tags = movie_info[0].tags;
  var duration = movie_info[0].duration;
  var language = movie_info[0].language;
  var release_date = movie_info[0].release_date;
  var cast = movie_info[0].cast;
  var links = movie_info[0].links;
  var h_type = movie_info[0].h_type ?? "Not Provided";
  var ScreenshotUrl = movie_info[0].ScreenshotUrl ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s';
  res.render("show_movie", {
    name: name,
    banner: {
      jpg: img
    },
    release_date: release_date,
    duration: duration,
    category: category,
    actors: cast,
    language: language,
    description: description,
    downloads: links,
    tags,
    h_type
  });
});

module.exports = router;
