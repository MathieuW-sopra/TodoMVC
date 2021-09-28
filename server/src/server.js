const chalk = require("chalk");
const debug = require("debug")("app");
const mongoose = require('mongoose');
const config = require('./config/config')
const makeApp = require('./app.js')
const taskRepo = require("./repos/taskRepo");

mongoose.connect(config.db.url);

const db = mongoose.connection; 
const app = makeApp(taskRepo(db));

db.on('error', console.error.bind(console, 'Erreur lors de la connexion')); 
db.once('open', function (){
    debug("Connection to database OK"); 
    app.listen(config.port,()=>{
      debug(`listening on port ${chalk.green(config.port)}`);
    })
});



