const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const helmet = require('helmet');
const nocache = require("nocache");



module.exports = () => {
  return new Promise(resolve => {
    const app = express();  
    app.use(helmet());
    app.use(nocache());
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use(morgan("tiny"));
    app.use(cors());
    resolve(app);
  });
}