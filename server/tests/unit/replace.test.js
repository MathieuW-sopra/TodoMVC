const { ObjectID } = require('bson');
const taskRepo = require('../../src/repos/taskRepo.js');

describe.skip('when replacing one item', () => {
  it('should return the new object', async () => {
    resultsAdd = await taskRepo.add({title:"test3", completed: false});
    resultsReplace = await taskRepo.replace({_id : ObjectID(resultsAdd.insertedId), title:"test3", completed: true});
    expect(resultsReplace.completed).toEqual(true);
  })
  it('should exist in the database with the same id and be unique', async () => {
    resultsGet = await taskRepo.get({_id : ObjectID(resultsReplace._id)});
    expect(resultsGet.length).toEqual(1);
    expect(ObjectID(resultsGet[0]._id).toString()).toEqual(ObjectID(resultsReplace._id).toString());
  })
})