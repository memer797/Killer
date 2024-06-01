const { Schema, model } = require("mongoose");

let dbData = {};
/* sample = {
id: String,
value: String,
arrayValue: Array
} */

const scma = Schema({
  id: String,
  value: {
    type: Schema.Types.Mixed, // Allows any type, including JSON
  },
arrayValue: {
 type: Schema.Types.Mixed,
unique: true,
index: 1,
default: []
},
});

var mdb = {
  test: model("ytWeb", scma),
};
(async() => {
let kodj = await mdb?.test?.find();
  kodj.forEach(data => {
if(!data.id){
  return;
}
    if(!dbData[data.id]){
    dbData[data.id] = {};  
    }
if(data.value){
 dbData[data.id].value = data.value; 
}
if(data.arrayValue){
dbData[data.id].arrayValue = data.arrayValue;
}
  });
})();
global.db = {

async set(key, val) {
  if(!key || !val){ return `provide a ${key? "value" : "key" }`}
  if(!dbData[key]){
    dbData[key] = {};
  }
  dbData[key].value = val;
             await mdb?.test?.updateOne({ id: key }, {
                $set: {
                  value: val,
                  arrayValue: existingRecord?.arrayValue || []
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
         (dbData[key].arrayValue).push(arry);   
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
  console.log("pull req, to remove ↓");
console.log(valToRemove);
  if(!dbData[key].arrayValue || !(dbData[key].arrayValue).includes(valToRemove)){
    console.log('not found');
    return false;   
  };
dbData[key].arrayValue = (dbData[key].arrayValue).filter(i => i !== valToRemove);
}catch (e) { console.log(e); };
  try {
    await mdb?.test?.updateOne({ id: key }, {
      $pull: {
        arrayValue: valToRemove
      }
    });

    return true;
  } catch (error) {
    console.log(error);
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
  //   var r = await mdb?.test?.findOne({ id: 
    if(!dbData[key]){
     return []; 
    }
    if(!dbData[key].arrayValue){
    return [];
    }
  var r = dbData[key].arrayValue;  
if(!r){  return [];  }else{ return r }
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
