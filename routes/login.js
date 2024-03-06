var express = require('express');
var router = express.Router();

router.get('/', async(req, res) => {
res.send('<h1>login route needs a login page <br> so build a login page dear Rahul also build a signup page 🙂!</h1>');
});

module.export = router;
