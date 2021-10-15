const config = require('../config/config')
const statusManager = require('../services/statusManager/task')

module.exports = (Task) => {

    async function get(req, res){
        try {
            const query = Task.find()
            const task = await query;
            statusManager(res, 200, task);
        } catch (error) {
            statusManager(res, 500, 'an error has occured trying to get the tasks');
        }
    }

    async function getPage(req, res){
        if(req.query.page<1){
            return statusManager(res, 400, 'page  number must be greater than 0');
        }
        const options = {
            page: req.query.page,
            limit: req.query.limit < config.pageLength ? req.query.limit : config.pageLength,
            collation: {locale: 'en',},
            sort: { title: 1 }
        };
        let query;
        if(req.query.completed == undefined){
            query = Task.find()
        }
        else{query = Task.find({completed: req.query.completed})}
        try {
            let task = await Task.paginate(query,options)
            statusManager(res, 200, task);
        } catch (error) {
            console.log(error)
            statusManager(res, 500, 'an error has occured trying to get the tasks');
        }
    }

    async function add(req, res){
        if (!req.body.title) {
            return statusManager(res, 400, 'task must have a title');
          }
        try {
            const task = await Task.create(req.body);
            statusManager(res, 200, task);
        } catch (error) {
            statusManager(res, 500, 'an error has occured trying to add the task');
        }
    }

    async function replace(req, res){
        if (!req.body.title && (req.body.completed === undefined)) {
            return statusManager(res, 400, 'it must have at least one property to modify');
          }
        try {
            const task = await Task.findByIdAndUpdate(req.body._id,req.body,{ returnDocument: 'after' })
            statusManager(res, 200, task);
        } catch (error) {
            statusManager(res, 500, 'an error has occured trying to replace the task');
        }
    }

    async function remove(req, res){
        if (!req.body.id) {
            return statusManager(res, 400, 'it must have an id');
          }
        try {
            const task = await Task.findByIdAndRemove(req.body.id)
            statusManager(res, 200, task);
        } catch (error) {
            statusManager(res, 500, 'an error has occured trying to remove the task');
        }
    }
    return {get,getPage,add,replace,remove}
}