const chalk = require("chalk");
const debug = require("debug")("app");
const config = require('../config/config')

module.exports = (db,app) => {

  db.on('error', console.error.bind(console, 'Error on connection')); 
  db.once('open', function (){
      debug("Connection to database OK"); 
      app.listen(config.port,()=>{
        debug(`listening on port ${chalk.green(config.port)}`);
      })
  });

}