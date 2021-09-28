const { ObjectID } = require('bson');
const Task = require("../models/Task")

module.exports = {
    async get(req, res){
        res.type('application/json');
        try {
            const resDB = await Task.find()
            res.send(resDB);
        } catch (error) {
            res.status(500).send({
                error: 'an error has occured trying to get the tasks'
            })
        }
    },

    async add(req, res){
        res.type('application/json');
        if (!req.body.title) {
            res.status(400).send({
                error: 'task must have a title'
            })
            return
          }
        try {
            const resDB = await Task.create(req.body);
            res.send(resDB);
        } catch (error) {
            res.status(500).send({
                error: 'an error has occured trying to add the task'
            })
        }
    },

    async replace(req, res){
        res.type('application/json');
        if (!req.body.title || (req.body.completed === undefined)) {
            res.status(400).send({
                error: 'it must have at least one property to modify'
            })
            return
          }
        try {
            const resDB = await Task.findByIdAndUpdate(req.body._id,req.body,{ returnDocument: 'after' })
            res.send(resDB);
        } catch (error) {
            res.status(500).send({
                error: 'an error has occured trying to replace the task'
            })
        }
    },

    async remove(req, res){
        res.type('application/json');
        if (!req.body.id) {
            res.status(400).send({
                error: 'must have an id'
            })
            return
          }
        try {
            const resDB = await Task.findByIdAndRemove(req.body.id)
            res.send(resDB);
        } catch (error) {
            res.status(500).send({
                error: 'an error has occured trying to remove the task'
            })
        }
    },

}