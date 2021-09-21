const express = require('express');
const cors = require("cors");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const { MongoClient } = require('mongodb');

const config = require('./config/config')

const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

require("./routes")(app)

const client = new MongoClient(config.db.url);
client.connect().then(() => {
  app.listen(config.port,()=>{
    debug(`listening on port ${chalk.green(config.port)}`);
  })
})

