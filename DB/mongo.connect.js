var mongoos = require("mongoose");
 
mongoos.set('strictQuery', false);
  mongoos.connect(process.env["MONGO_URL"], {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  }).then(async (a, b) => {
    await console.log(`Connected MongoDB`);
   require("./mdb.js");
  }).catch((err) => {
   console.log(err)
    }
