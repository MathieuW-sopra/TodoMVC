/* eslint-disable */
const express = require('express');
const cors = require("cors");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const assert = require("assert");
const { MongoClient } = require('mongodb');

const data = require("./task.json");

const config = require('./config/config')
const {Task} = require("./models/Task");


const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

require("./routes")(app)




const client = new MongoClient(config.db.url);
client.connect().then(() => {
  app.listen(config.port,()=>{
    console.log(`listening on port ${chalk.green(config.port)}`);
    debug(`listening on port ${chalk.green(config.port)}`);
  })
})

// async function main(){
//     let query = {completed: true};
//     let newItem = {
//         "task" : "task3",
//         "completed" : false
//     }
//     const client = new MongoClient(url);
//     await client.connect();
//     try {
//         const results = await taskRepo.loadData(data);
//         // assert.equal(data.length, results.insertedCount);

//         const getData = await taskRepo.get();
//         // assert.equal(data.length, getData.length);

//         const filterData = await taskRepo.get(query);
//         // assert.equal(true, filterData[0].completed);

//         const addedItem = await taskRepo.add(newItem);
//         // assert(addedItem.insertedId)

//         const removed = await taskRepo.remove(addedItem.insertedId);
//         assert(removed);

//     } catch (error) {
//         console.log(error)
//     } finally {
//         const admin = client.db(dbName).admin();
//         // await client.db(dbName).dropDatabase();
//         client.close();
//     }

// }
// main();
