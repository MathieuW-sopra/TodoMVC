const config = require('../config/config')
const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const helmet = require('helmet');
const nocache = require("nocache");
const mongoose = require('mongoose');

module.exports = () => {

  mongoose.connect(config.db.url);
  const db = mongoose.connection; 

  const app = express();  
  app.use(helmet());
  app.use(nocache());
  app.use(express.urlencoded({extended: true}));
  app.use(express.json());
  app.use(morgan("tiny"));
  app.use(cors());
  
  require('./passport')

  return [db, app]

}