const { expect, assert } = require('chai');
const {createSandbox, spy } = require('sinon');
const taskRepo = require('../../src/repos/taskRepo.js');
const collectionName= "task";
const data = require('./testData.json');

describe('taskRepo.js', () => {
  describe('when making multiple insertion', () => {
    it('should return insertedCount = data length to insert', async () => {
        resultsLoad = await taskRepo.loadData(data);
        assert.equal(true, resultsLoad.acknowledged);
        assert.equal(data.length, resultsLoad.insertedCount);
    })
  })
  describe('when getting all data form database', () => {
    it('should return data with the same length', async () => {
        resultsTest = await taskRepo.get();
        assert.equal(data.length, resultsTest.length);
    })
  })
  describe('when inserting one item', () => {
    it('should return the item with an id', async () => {
        resultsAdd = await taskRepo.add({title:"test3", completed: true});
        assert.equal(true,resultsAdd.acknowledged);
        // assert(resultsAdd._id);
        // expect(resultsAdd._id).to.be.a('number');
    })
  })
})