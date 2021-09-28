const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const helmet = require('helmet');
const nocache = require("nocache");
const taskRepo = require('./repos/taskRepo')

module.exports = () => {
  const app = express();  
  app.use(helmet());
  app.use(nocache());
  app.use(express.urlencoded({extended: true}));
  app.use(express.json());
  app.use(morgan("tiny"));
  app.use(cors());

  app.get('/task/get', taskRepo.get);

  app.post('/task/add', taskRepo.add);

  app.put('/task/replace', taskRepo.replace);

  app.delete('/task/remove', taskRepo.remove);

  return app

}