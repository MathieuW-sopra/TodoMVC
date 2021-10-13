const chalk = require("chalk");
const debug = require("debug")("app");
const config = require('../../config/config')

module.exports = (app) => {
  
  app.listen(config.port,()=>{
    debug(`listening on port ${chalk.green(config.port)}`);
  })

}