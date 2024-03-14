var chat = socketIo.of("/contact/live/chat/admin");

chat.on("connection", async(socket) => {
socket.on("disconnect", async() => {
 // user disconnected 
});

  socket.on('new.chat', async() => {
//handle new chat creation
  });

  socket.on('message', async() => {
    // handle message event for upcomming message use less block to reduce delay
    // send alert to online admins send web push notification to ofline admins
    // if message sent from any admin then notify the user if he or she is online in the website
    // if notonline then try to send a webpush if webpush sending failed ask to admin to allow to send email notification if the admin allowes to send email notification then send an email notification
    // after reflecting the message to user save it immideatly into DB with sender namer, message, time, isAdnim or isUser
  });

  socket.on('chat.delete', async() => {
    // handle delete chat event 
    // this event will fire when a user or admin deletes a chat 
    // save the chat transcript for 15 days to get a preview of the chat 
    // make a dounload route with some random id to dounload the chat 
    // chat dounload link will aivalable for 15 days
    // user can continue chatting if continue button is pressed within 10 days from chat deletion
    //if 15 days over no response got from user delete the chat permanently store the transcript data in json format and provide the dounload link in admin panel
    // thats it
  });
  
  

});
