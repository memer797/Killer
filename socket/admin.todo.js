var todoSocket = socketIo.of("/ws/admin/todo");

todoSocket.on("connection", (socket) => {
  socket.on("get.list", async(req) => {
    
    let allTodos = await db.getArray("admin.todos");
    req(allTodos);
  });

  socket.on("new.todo", async(req) => {
    if(!req || req.trim() === "" || typeof req !== "string") return;
  await db.push("admin.todos", {
    title: req,
    isDone: false,
  });
    todoSocket.emit("new.todo", req);
  });

  socket.on("todo.update", async(req) => {
    let title = req.title;
    let isDone = req.isDone;
    if(isDone){
      isDone = true;
    } else {
      isDone = false;
    }
    if(!title) return;
    //await db.pull("admin.tools", title).catch();
   /* await db.push("admin.todos", {
      title: title,
      isDone: isDone,
    });*/
    let allTodosForEdit_raw = await db.getArray("admin.todos");
    let todoForEdit = allTodosForEdit_raw.filter(i => i.title === title);
    if(!todoForEdit || todoForEdit.length < 1) return;
    await db.pull("admin.todos", todoForEdit[0]);
    await db.push("admin.todos", {
      title: title,
      isDone: isDone,
    });
    todoSocket.emit("todo.update", {title: title, isDone: isDone});
  });

  socket.on("todo.delete", async(req) => {
    let all = await db.getArray("admin.todos");
    let whatifound = all.filter(i => i.title === req);
    if(!whatifound || whatifound.length < 1) return;
    await db.pull("admin.todos", whatifound[0]);
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
