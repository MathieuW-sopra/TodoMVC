/* eslint-disable */
const { ObjectID } = require('bson');
const { MongoClient } = require('mongodb');

function taskRepo(){
    const url = "mongodb+srv://dbadmin:12345@todomvc.u9mu0.mongodb.net/todomvc?retryWrites=true&w=majority";
    const dbName = "todomvc";

    function get(query){
        return new Promise(async (resolve,reject) => {
            const client = new MongoClient(url)
            try {
                await client.connect();
                const db = client.db(dbName);

                const items = db.collection("task").find(query);
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

                results = await db.collection("task").insertMany(data);
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

                const addedItem = await db.collection("task").insertOne(item);
                resolve(addedItem);
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
                console.log("destrucItem"+JSON.stringify(destrucItem))
                const addedItem = await db.collection("task").findOneAndReplace(
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
                const removed = await db.collection("task").deleteOne({_id: ObjectID(id)});
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