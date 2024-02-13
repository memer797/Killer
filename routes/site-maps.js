var express = require("express");
var router = express.Router();

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


router.get("/dynamic/all-movies.xml", async(req, res) => {
  var movieDataToMap = await db.getArray("info.movie");
res.header('Content-Type', 'application/xml');
  res.send(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${movieDataToMap.map(data =>`<url>
<loc>https://memer797.onrender.com/movie/${data.id}</loc>
<lastmod>${formatDateForSitemap(new Date(data.lastMod))}</lastmod>
<changefreq>weekly</changefreq>
<priority>0.80</priority>
</url>
`).join('')}
</urlset>`);
    
  });


module.exports = router;
