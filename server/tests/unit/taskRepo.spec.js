const { expect, assert } = require('chai');
const taskRepo = require('../../src/repos/taskRepo.js');
const data = require('./testData.json');
const  ObjectID = require('mongodb').ObjectId;

describe('taskRepo.js', () => {
  let resultsAdd;
  let resultsGet1;
  let resultsGet2;
  describe('when making a get request', () => {
    it('should return data in a array', async () => {
      resultsGet1 = await taskRepo.get();
      expect(resultsGet1).to.be.a('array');
    })
  })

  describe('when making multiple insertion', () => {
    it('should return data in a array', async () => {
      resultsGet1 = await taskRepo.get();
      expect(resultsGet1).to.be.a('array');
    })
    it('should return acknowledged = true', async () => {
      resultsLoad = await taskRepo.loadData(data);
      assert.equal(resultsLoad.acknowledged,true);
    })
    it('should have length equals to inital length + lenght of data inserted', async () => {
      resultsGet2 = await taskRepo.get();
      assert.equal(resultsLoad.insertedCount, resultsGet2.length-resultsGet1.length);
    })
  })

  describe('when inserting one item', () => {
    it('should return the item with an auto-created id', async () => {
      resultsAdd = await taskRepo.add({title:"test3", completed: false});
      assert.equal(resultsAdd.acknowledged,true);
      expect(resultsAdd.insertedId).to.exist;
    })
    it('should exist in the database with the same id and be unique', async () => {
      resultsGet = await taskRepo.get({_id : ObjectID(resultsAdd.insertedId)});
      assert.equal(resultsGet.length,1);
      assert.equal(ObjectID(resultsGet[0]._id).toString(),ObjectID(resultsAdd.insertedId).toString());
    })
  })
  describe('when replacing one item', () => {
    let resultsReplace;
    it('should return true', async () => {
      resultsReplace = await taskRepo.replace({_id : ObjectID(resultsAdd.insertedId), title:"test3", completed: true});
      assert.equal(resultsReplace.completed,true);
    })
    it('should exist in the database with the same id and be unique', async () => {
      resultsGet = await taskRepo.get({_id : ObjectID(resultsReplace._id)});
      assert.equal(resultsGet.length,1);
      assert.equal(ObjectID(resultsGet[0]._id).toString(),ObjectID(resultsReplace._id).toString());
    })
  })
  describe('when removing one item', () => {
    let resultsRemove;
    it('should return true', async () => {
      resultsRemove = await taskRepo.remove(resultsAdd.insertedId);
      assert.equal(resultsRemove,true);
    })
    it('should no longer exist in the database', async () => {
      resultsGet = await taskRepo.get({_id : ObjectID(resultsAdd.insertedId)});
      assert.equal(resultsGet.length,0);
    })
  })
})
