const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const helmet = require('helmet');
const nocache = require("nocache");
const taskRepo = require('./repos/taskRepo')
const Task = require("./models/Task")
const authenticationRepo = require('./repos/authenticationRepo')
const User = require("./models/User")

module.exports = () => {
  const app = express();  
  app.use(helmet());
  app.use(nocache());
  app.use(express.urlencoded({extended: true}));
  app.use(express.json());
  app.use(morgan("tiny"));
  app.use(cors());

  app.post('/login', authenticationRepo(User).login)
  app.post('/register', authenticationRepo(User).register)

  app.get('/task/get', taskRepo(Task).get);
  app.post('/task/add', taskRepo(Task).add);
  app.put('/task/replace', taskRepo(Task).replace);
  app.delete('/task/remove', taskRepo(Task).remove);

  return app

}