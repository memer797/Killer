var express = require("express");
var router = express.Router();

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

router.get("/", async(req, res) => {
  var data = await db.getArray("info.movie");
  var data = data.filter(item => item.contentType === "webseries");
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
var udf = data.filter(j => j.name === g && j.contentType === "webseries");
    if(udf.length > 0){
      tmdtal.push({name: udf[0].name, img: udf[0].img }); 
    }
  });
  res.render('index', { data: result, trend: tmdtal });
});

module.exports = router;
