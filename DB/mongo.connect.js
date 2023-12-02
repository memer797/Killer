var mongoos = require("mongoose");
 
mongoos.set('strictQuery', false);
  mongoos.connect("mongodb+srv://movieDB:wtf@moviedb.jd2czql.mongodb.net/?retryWrites=true&w=majority"/*process.env["mongo_db_url"]*/, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  }).then(async (a, b) => {
    await console.log(`Connected MongoDB`);
   require("./mdb.js");
  }).catch((err) => {
   console.log(err)
    });

