process.on('unhandledRejection', async(reason, promise) => {
  console.error( "[ANTI-CRASH] An error has occured and been successfully handled: [unhandledRejection]")
console.log(reason, promise);
Tbot.sendMessage(-4033651296, reason).catch();
Tbot.sendMessage(-4033651296, promise).catch();
});

process.on("uncaughtException", async(err, origin) => {
  console.error(`[ANTI-CRASH] An error has occured and been successfully handled: [uncaughtException]`)
console.log(err, origin);
Tbot.sendMessage(-4033651296, err).catch();
Tbot.sendMessage(-4033651296, origin).catch();
});

process.on('uncaughtExceptionMonitor', async(err, origin) => {
  console.error("[ANTI-CRASH] An error has occured and been successfully handled: [uncaughtExceptionMonitor]");
   console.log(err, origin);
   Tbot.sendMessage(-4033651296, err).catch();
Tbot.sendMessage(-4033651296, origin).catch();
 })
