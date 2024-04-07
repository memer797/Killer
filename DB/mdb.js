const { Schema, model } = require("mongoose");

let dbData = {};
/* sample = {
id: String,
value: String,
arrayValue: Array
} */
const scma = Schema({
  id: String,
  value: String,
arrayValue: {
 type: Schema.Types.Mixed,
unique: true,
index: 1
},
});

var mdb = {
  test: model("ytWeb", scma),
};
global.db = {

async set(key, val) {
  if(!key || !val){ return `provide a ${key? "value" : "key" }`}

  dbData[key].value = val;
             await mdb?.test?.updateOne({ id: key }, {
                $set: {
                  value: val
                }
              }, { upsert: true }).catch(e => { console.log(e)});
  return true;
},
        async push(key, arry) {
  if(!key){
    return `provide a key`
  }
       try{
         if(!dbData[key]){
           dbData[key] = {};
         }
         if(!dbData[key] || !dbData[key].arrayValue){
          dbData[key].arrayValue = [];
          }
          if(!Array.isArray(dbData[key].arrayValue)){
            console.log("not an array");
          return "err... Not An Array";
          }
          if(!(dbData[key].arrayValue).includes(arry)){
         dbData[key].arrayValue = arry;   
          }
        }catch(i){console.log(i);}
          console.log(dbData);
    await mdb?.test?.updateOne({ id: key }, {
                $addToSet: {
                  arrayValue: arry
                }
              }, { upsert: true }).catch(e => { console.log(e) });
  },

        async pull(key, valToRemove) {
  if (!key || valToRemove === undefined) {
    return `Provide a key and value to remove.`;
  }
try {
  if(!dbData[key].arrayValue || !(dbData[key].arrayValue).includes(valToRemove)){
 return false;   
  };
dbData[key].arrayValue = (dbData[key].arrayValue).filter(i => i !== valToRemove);
}catch{};
  try {
    await mdb?.test?.updateOne({ id: key }, {
      $pull: {
        arrayValue: valToRemove
      }
    });

    return true;
  } catch (error) {
    return false;
  }
},

  async get(key) {
  if(!key){
    return `provide a key`
  }
   /*  var r = await mdb?.test?.findOne({ id: key })

if(r == null){  return null;  }else{ return r.value }
 */
    var r = dbData[key].value;
  if(!r){  return null;  }else{ return r }  
   },
  
  async getArray(key) {
  if(!key){
    return `provide a key`
  }
  //   var r = await mdb?.test?.findOne({ id: key })
var r = dbData[key];
    
if(r == null){  return [];  }else{ return r.arrayValue }
  },

 /*   async editArray(key, track, toset) {
  if(!key){
    return `provide a key`
  }
     await mdb?.test?.updateOne({ id: key }, {
                $set: {
                  [`arrayValue.$[elem].${track}`]: toset
                }
              }, { upsert: true }).catch(e => { console.log(e) });
      *
      var name = "op";
var itemName = "yt";

var arrayFilters = [{ [`elem.${name}`]: itemName }];

db.collection.updateOne(
  { "id": "op" }, // Filter documents with the specified id
  { 
    "$set": { [`arrayValue.$[elem].type`]: false } // Set the type field to false for matched items
  },
  { arrayFilters: arrayFilters } // Specify the array filter dynamically
)
*
 },*/

  async all() {
var r = dbData;
 /*    var r = await mdb?.test?.find()
*/
if(!r){  return null;  }else{ return r }
  },

  async delete(key) {
 var r = dbData[key];   
 //    var r = await mdb?.test?.findOne({ id:key });
    if(!r) return `${key} not found`;
await mdb?.test.deleteOne({ id: key })
    return true;
  },

  async deleteAll(pass) {
    if(pass == "db"){
await mdb?.test?.deleteMany()
return true;
    }else{
      return false;
    }
  }
  }
