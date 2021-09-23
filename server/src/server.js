const chalk = require("chalk");
const debug = require("debug")("app");
const { MongoClient } = require('mongodb');
const config = require('./config/config')
const makeApp = require('./app.js')
const taskRepo = require("./repos/taskRepo");

const app = makeApp(taskRepo);

const client = new MongoClient(config.db.url);
client.connect().then(() => {
  app.listen(config.port,()=>{
    debug(`listening on port ${chalk.green(config.port)}`);
  })
})

