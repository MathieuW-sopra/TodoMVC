const mongoose = require('mongoose');
const config = require('../../config/config')

module.exports =  () => {

  return new Promise(async resolve => {
    try {
      await mongoose.connect(config.db.url);
      const db = mongoose.connection;
      resolve(db); 

    } catch (error) {
      handleError(error);
    }
  });
}