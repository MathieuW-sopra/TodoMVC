const makeApp = require("./services/express/bootstrap.js");
const makeDB = require("./services/mongoose/bootstrap.js");
const routes = require("./routers/router");
const index = require("./services/express/index.js");
require("./services/passport/bootstrap.js");

async function appAndRouter(){
  return new Promise(resolve => {
    makeApp().then(app => routes(app).then(app => resolve(app)));
  });
}

async function main (){
  Promise.all([appAndRouter(), makeDB()]).then((resp) => {
    index(resp[0]);
  });
}
main();
