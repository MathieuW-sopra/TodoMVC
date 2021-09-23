const debug = require("debug")("app");
const express = require('express');
const morgan = require("morgan");
const cors = require("cors");

module.exports = (Repo) => {
  const app = express();
  app.use(express.json());
  app.use(morgan("tiny"));
  app.use(cors());

  app.get('/task/get',async (req, res)=>{
    debug("/task/get "+JSON.stringify(await Repo.get()))
    res.send(await Repo.get());
  })

  app.post('/task/add',async (req, res)=>{
    const response = await Repo.add(req.body);
    res.send(response);
  })

  app.put('/task/replace',async (req, res)=>{
    const response = await Repo.replace(req.body);
    res.send(response);
  })

  app.delete('/task/remove',async (req, res)=>{
    const response = await Repo.remove(req.body.id);
    res.send(response);
  })

  return app

}