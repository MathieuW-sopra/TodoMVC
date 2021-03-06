const taskRepo = require("../controllers/taskController");
const Task = require("../models/Task");
const authenticationRepo = require("../controllers/authController");
const User = require("../models/User");
const isAuthenticated = require("../controllers/policies/isAuthenticated");

module.exports = (app) => {
  return new Promise(resolve => {

    app.post("/login", authenticationRepo(User).login);
    app.post("/register", authenticationRepo(User).register);
  
    app.get("/task/get", taskRepo(Task).get);
    app.get("/task/getPage", taskRepo(Task).getPage);
    app.post("/task/add", isAuthenticated, taskRepo(Task).add);
    app.put("/task/replace", isAuthenticated, taskRepo(Task).replace);
    app.delete("/task/remove", isAuthenticated, taskRepo(Task).remove);
    
    resolve(app);
  });


};