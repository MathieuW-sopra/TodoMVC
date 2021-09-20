/* eslint-disable */
const { ObjectID } = require('bson');
const { MongoClient } = require('mongodb');
const config = require('../config/config')

function taskRepo(){
    const url = config.db.url;
    const dbName = config.db.name;
    const collectionName = "task";

    function get(query){
        return new Promise(async (resolve,reject) => {
            const client = new MongoClient(url)
            try {
                await client.connect();
                const db = client.db(dbName);
                const items = db.collection(collectionName).find(query);
                resolve(await items.toArray());
                client.close();

            } catch (error) {
                reject(error)
            }
        })
    }

    function loadData(data){
        return new Promise(async (resolve,reject) => {
            const client = new MongoClient(url)
            try {
                await client.connect();
                const db = client.db(dbName);
                results = await db.collection(collectionName).insertMany(data);
                resolve(results);
                client.close();

            } catch (error) {
                reject(error)
            }
        })
    }

    function add(item){
        return new Promise(async (resolve,reject) => {
            const client = new MongoClient(url)
            try {
                await client.connect();
                const db = client.db(dbName);
                const addedItem = await db.collection(collectionName).insertOne(item);
                resolve(addedItem);
                console.log(JSON.stringify(addedItem));
                client.close();

            } catch (error) {
                reject(error)
            }
        })
    }

    function replace(item){
        return new Promise(async (resolve,reject) => {
            const client = new MongoClient(url)
            try {
                await client.connect();
                const db = client.db(dbName);
                const destrucItem =(({ title, completed }) => ({ title, completed }))(item);
                const addedItem = await db.collection(collectionName).findOneAndReplace(
                    {_id: ObjectID(item._id)},
                    destrucItem,
                    { returnDocument: 'after' }
                    );
                resolve(addedItem.value);
                client.close();

            } catch (error) {
                reject(error)
            }
        })
    }

    function remove(id){
        return new Promise(async (resolve,reject) => {
            const client = new MongoClient(url)
            try {
                await client.connect();
                const db = client.db(dbName);
                const removed = await db.collection(collectionName).deleteOne({_id: ObjectID(id)});
                resolve(removed.deletedCount === 1);
                client.close();

            } catch (error) {
                reject(error)
            }
        })
    }

    return{loadData,get,add,replace,remove}

}

module.exports = taskRepo();