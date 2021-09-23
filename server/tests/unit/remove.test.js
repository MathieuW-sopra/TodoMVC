const { ObjectID } = require('bson');
const taskRepo = require('../../src/repos/taskRepo.js');

describe('when removing one item', () => {
    it('should return true', async () => {
      resultsAdd = await taskRepo.add({title:"test3", completed: false});
      resultsRemove = await taskRepo.remove(resultsAdd.insertedId);
      expect(resultsRemove).toEqual(true);
    })
    it('should no longer exist in the database', async () => {
      resultsGet = await taskRepo.get({_id : ObjectID(resultsAdd.insertedId)});
      expect(resultsGet.length).toEqual(0);
    })
  })