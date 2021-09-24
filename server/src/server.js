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
  key: fs.readFileSync('./src/tls/private-key.pem'),
  cert: fs.readFileSync('./src/tls/public-cert.pem')
}, app)

mongoClient.connect().then(() => {
  app.listen(config.port,()=>{
    debug(`listening on port ${chalk.green(config.port)}`);
  })
})
