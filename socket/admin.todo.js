var todoSocket = socketIo.of("/ws/admin/todo");

todoSocket.on("connection", (socket) => {
  
});


//"get.list"
/**
* todos structure
* [
*   {
*      title: String,
*      isDone: Boolean,
*      isDeleted: Boolean,
*    },
*    ...
* ]
**/
