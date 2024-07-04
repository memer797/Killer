var todoSocket = socketIo.of("/ws/admin/todo");

todoSocket.on("connection", (socket) => {
  socket.on("get.list", async(req) => {
    let allTodos = await db.getArray("admin.todos");
    req(allTodos);
  });

  socket.on("new.todo", async(req) => {
    if(!req || req.trim() === "" || typeof req !== "string") return;
  await db.push("admin.todos", req)
  });
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
