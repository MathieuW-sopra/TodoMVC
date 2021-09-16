const express = require('express');
const cors = require("cors");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");


const port = process.env.port || 8081;

const app = express();


app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());


app.get('/',(req, res)=>{
    res.send({
        message : "Hello form my app"
    });
})

app.listen(port,()=>{
    console.log(`listening on port ${chalk.green(port)}`);
    debug(`listening on port ${chalk.green(port)}`);
})