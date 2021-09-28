const { ObjectID } = require('bson');
const Task = require("../models/Task")

module.exports = (db) => {

    async function get(query){
        try {
            return await Task.find(query)

        } catch (error) {
            console.error(error)
        }
    }

    async function add(task){
        try {
            return await Task.create(task)
        } catch (error) {
            console.error(error)
        }

    }

    async function replace(item){
        try {
            return await Task.findByIdAndUpdate(item._id,item,{ returnDocument: 'after' })
        } catch (error) {
            console.error(error)
        }
    }

    async function remove(id){
        try {
            const res = await Task.findByIdAndRemove(id)
            return res
        } catch (error) {
            console.error(error)
        }
    }

    return{get,add,replace,remove}

}