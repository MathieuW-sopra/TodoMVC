const debug = require("debug")("app");
const express = require('express');
const morgan = require("morgan");
const cors = require("cors");


module.exports = (Repo) => {
  const app = express();  
  app.use(express.urlencoded({extended: true}));
  app.use(express.json());
  app.use(morgan("tiny"));
  app.use(cors());

  app.get('/task/get',async (req, res)=>{
    const response = await Repo.get()
    debug("/task/get "+JSON.stringify(response))
    res.type('application/json')
    res.send(response);
  })

  app.post('/task/add',async (req, res)=>{
    if (!req.body.title) {
      res.sendStatus(400)
      return
    }
    const response = await Repo.add(req.body);
    res.type('application/json')
    res.send(response);
  })

  app.put('/task/replace',async (req, res)=>{
    if (!req.body.title || (req.body.completed === undefined)) {
      res.sendStatus(400)
      return
    }
    const response = await Repo.replace(req.body);
    res.type('application/json')
    res.send(response);
  })

  app.delete('/task/remove',async (req, res)=>{
    if (!req.body.id) {
      res.sendStatus(400)
      return
    }
    const response = await Repo.remove(req.body.id);
    res.type('application/json')
    res.send(response);
  })

  return app

}