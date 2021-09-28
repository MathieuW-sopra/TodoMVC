const chalk = require("chalk");
const debug = require("debug")("app");
const { MongoClient } = require('mongodb');
const config = require('./config/config')
const makeApp = require('./app.js')
const taskRepo = require("./repos/taskRepo");

const mongoClient = new MongoClient(config.db.url);
const app = makeApp(taskRepo);

mongoClient.connect().then(() => {
  app.listen(config.port,()=>{
    debug(`listening on port ${chalk.green(config.port)}`);
  })
})
