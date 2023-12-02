var mongoos = require("mongoose");
 
mongoos.set('strictQuery', false);
  mongoos.connect(process.env["mongo_db_url"], {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  }).then(async (a, b) => {
    await console.log(`Connected MongoDB`);
   require("./mdb.js");
  }).catch((err) => {
   console.log(err)
    });

