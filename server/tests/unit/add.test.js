const { ObjectID } = require('bson');
const { MongoClient } = require('mongodb');
const sinon = require("sinon");
const jest = require('jest');
const proxyquire = require("proxyquire");
const config = require('../../src/config/config')
const taskRepo = require('../../src/repos/taskRepo.js');


const url = config.db.url;
const dbName = config.db.name;
const collectionName = "task";
const client = new MongoClient(url)

beforeEach(() => {
});

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
  // it('should not call insertOne if item has no title', async () => {
  //   await client.connect();
  //   const db = client.db(dbName);
  //   const insertMock = sinon.mock(db.collection(collectionName));
  //   insertMock.expects("insertOne").never();
  //   const taskRepo = proxyquire("../../src/repos/taskRepo.js", db.collection(collectionName))
  //   try {
  //     taskRepo.add({completed: false})
  //   } catch (error) {
      
  //   }
  //   insertMock.verify();
  // })

})

afterEach(() => {
});