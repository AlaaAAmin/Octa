const { logger } = require('./backend/middlewares/logger.middleware')

// handle uncought exception
process.on('uncaughtException', err => {
  logger.error(err.name, err.message)
  logger.error('UNCAUGHT EXCEPTION! Shutting down...')
  // console stack when development mode
  process.exit(1);

});

const app = require("./backend/app");
const http = require("http");
const { createIOListners } = require('./backend/services/socket.service')
const normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      logger.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  logger.debug("Listening on " + bind)
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
const io = require('socket.io').listen(server);

createIOListners(io)
server.on("error", onError);
server.on("listening", onListening);

server.listen(port);


// unhandled rejection error handling
process.on('unhandledRejection', err => {
  logger.error(err.name, err.message);
  logger.error('UNHANDLED REJECTION! Shutting down...');
  console.log(err.stack)
  process.exit(1);
});

