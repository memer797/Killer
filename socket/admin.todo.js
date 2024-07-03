var todoSocket = socketIo.of("/ws/admin/todo");

todoSocket.on("connection", (socket) => {
  socket.on("get.list", (req) => {
    req([{
      name: "Test",
      isDone: false,
      isDeleted: false,
    }]);
  });

  socket.on("new.todo", (req
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


//"todo.update"
/**
* todo structyre
*[
*  {
*    name: String,
*    isDone: Boolean,
*  }
*]
**/


// "new.todo"
 // todo = name;
