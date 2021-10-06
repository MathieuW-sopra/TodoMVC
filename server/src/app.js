const bootstrap = require('./services/bootstrap.js')
const routes = require("./routers/router");
const index = require('./services/index.js')
const [db, app] = bootstrap();
routes(app);
index(db,app);
