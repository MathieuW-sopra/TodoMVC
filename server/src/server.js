const chalk = require("chalk");
const debug = require("debug")("app");
const { MongoClient } = require('mongodb');
const config = require('./config/config')
const makeApp = require('./app.js')
const taskRepo = require("./repos/taskRepo");
const https = require("https");
const fs = require("fs");

const mongoClient = new MongoClient(config.db.url);
const app = makeApp(taskRepo);

const httpsServer = https.createServer({
    key: fs.readFileSync('./src/tls/server.key'),
    cert: fs.readFileSync('./src/tls/server.crt'),
    requestCert: true,
    rejectUnauthorized: true,
    ca: fs.readFileSync('./src/tls/ca.crt'),
  },
  app)

mongoClient.connect().then(() => {
  httpsServer.listen(config.port,()=>{
    // debug("httpsServer :"+httpsServer.ca )
    debug(`listening on port ${chalk.green(config.port)}`);
  })
})
