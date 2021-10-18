const mongoose = require("mongoose");
const config = require("../../config/config");

module.exports =  () => {

  return new Promise(resolve => {
    try {
      mongoose.connect(config.db.url).then(()=>{
        const db = mongoose.connection;
        resolve(db); 
      });

    } catch (error) {
      console.log(error);
    }
  });
};