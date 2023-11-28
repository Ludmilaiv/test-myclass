const http = require("http");
const app = require("./app");
const db = require("./models/dbclient")

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
const server = http.createServer(app);

main().catch(console.log);

async function main() {
  await db.connect();
  const testQueryRes = await db.query("SELECT 'Successful connection to the database!' AS message");
  db.on('error', (err) => {
    console.error('something bad has happened!', err.stack)
  });
  console.log(testQueryRes.rows[0].message);
  server.listen(port);
  server.on("error", onErrorListening);
  server.on("listening", onListening);
}

function normalizePort(val) {
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
}

function onErrorListening(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  
  // handle specific listen errors with friendly messages
  switch (error.code) {
  case 'EACCES':
    console.error('port requires elevated privileges');
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.error('port is already in use');
    process.exit(1);
    break;
  default:
    throw error;
  }
}

function onListening () {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
