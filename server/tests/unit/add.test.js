const { ObjectID } = require('bson');
const taskRepo = require('../../src/repos/taskRepo.js');

describe('when adding a task', () => {
  it('should return the item with an auto-created id', async () => {
    resultsAdd = await taskRepo.add({title:"test3", completed: false});
    expect(resultsAdd.acknowledged).toEqual(true);
    expect(resultsAdd.insertedId).toBeDefined()
  })
  it('should exist in the database with the same id and be unique', async () => {
    resultsGet = await taskRepo.get({_id : ObjectID(resultsAdd.insertedId)});
    expect(resultsGet.length).toEqual(1);
    expect(ObjectID(resultsGet[0]._id).toString()).toEqual(ObjectID(resultsAdd.insertedId).toString());
  })
})