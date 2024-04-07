const express = require("express");
const router = express.Router();
router.get("/download/:name", async(req, res) => {
  if(!req.params.name || req.params.name.trim() === ""){
   return res.send(`4** error, name parameter is required to fetch the movie example:: /movie/download/jawan`);
  }
var name = req.params.name;
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
  var h_type = movie_info[0].h_type;
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
