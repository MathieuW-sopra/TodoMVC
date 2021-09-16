const express = require('express');
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");

const app = express();

app.use(morgan("tiny"));


app.get('/',(req, res)=>{
    res.send("Hello form my app");
})

app.listen(3000,()=>{
    console.log("test");
    debug(`listening on port ${chalk.green(3000)}`);
})