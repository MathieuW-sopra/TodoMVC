
module.exports = (app) => {
  const taskRepo = require("./repos/taskRepo");

  app.get('/task/get',async (req, res)=>{
    res.send(await taskRepo.get());
  })

  app.post('/task/add',async (req, res)=>{
    const response = await taskRepo.add(req.body);
    res.send(response);
  })

  app.put('/task/replace',async (req, res)=>{
    const response = await taskRepo.replace(req.body);
    res.send(response);
  })

  app.delete('/task/remove',async (req, res)=>{
    const response = await taskRepo.remove(req);
    res.send(response);
  })
  
}