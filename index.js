async function RunMainCode(){
function delay(milliseconds) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
};
  const express = require("express"),
    bodyParser = require('body-parser'),
    path = require("path"),
    cookieParser = require("cookie-parser"),
    app = express(),
    server = app.listen(80),
    io = require('socket.io')(server);


  
app.get("/", async(req, res) => {
res.send("Hello Rahul");
});


};
RunMainCode();
