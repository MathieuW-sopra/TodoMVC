module.exports = {
   port: process.env.PORT || 8081,
   db:{
      name : process.env.DB_NAME || "todomvc",
      url : process.env.DB_URL ||"mongodb+srv://dbadmin:12345@todomvc.u9mu0.mongodb.net/todomvc?retryWrites=true&w=majority",
   },
   authentication: {
      jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}