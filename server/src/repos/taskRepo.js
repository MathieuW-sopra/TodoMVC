const debug = require("debug")("app");
const getLimit = 5;
// const Task = require("../models/Task")

module.exports = (Task) => {
    async function get(req, res){
        res.type('application/json');
        try {
            const resDB = await Task.find();//.limit(getLimit)
            console.log("resDB: "+JSON.stringify(resDB));
            res.status(200);
            res.send(resDB);
        } catch (error) {
            res.status(500)
            res.send({
                error: 'an error has occured trying to get the tasks'
            })
        }
    }

    async function add(req, res){
        res.type('application/json');
        if (!req.body.title) {
            res.status(400)
            res.send({
                error: 'task must have a title'
            })
            return
          }
        try {
            const resDB = await Task.create(req.body);
            res.status(200)
            res.send(resDB);
        } catch (error) {
            res.status(500)
            res.send({
                error: 'an error has occured trying to add the task'
            })
        }
    }

    async function replace(req, res){
        res.type('application/json');
        if (!req.body.title && (req.body.completed === undefined)) {
            res.status(400)
            res.send({
                error: 'it must have at least one property to modify'
            })
            return
          }
        try {
            const resDB = await Task.findByIdAndUpdate(req.body._id,req.body,{ returnDocument: 'after' })
            res.status(200)
            res.send(resDB);
        } catch (error) {
            res.status(500)
            res.send({
                error: 'an error has occured trying to replace the task'
            })
        }
    }

    async function remove(req, res){
        res.type('application/json');
        if (!req.body.id) {
            res.status(400)
            res.send({
                error: 'must have an id'
            })
            return
          }
        try {
            const resDB = await Task.findByIdAndRemove(req.body.id)
            res.status(200)
            res.send(resDB);
        } catch (error) {
            res.status(500)
            res.send({
                error: 'an error has occured trying to remove the task'
            })
        }
    }
    return {get,add,replace,remove}
}