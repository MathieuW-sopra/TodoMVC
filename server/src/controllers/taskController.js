const config = require('../config/config')

module.exports = (Task) => {

    async function get(req, res){
        res.type('application/json');
        try {
            const query = Task.find()
            const resDB = await query;
            res.status(200);
            res.send(resDB);
        } catch (error) {
            res.status(500)
            res.send({
                error: 'an error has occured trying to get the tasks'
            })
        }
    }

    async function getPage(req, res){
        res.type('application/json');
        if(req.query.page<1){
            res.status(400)
            res.send({
                error: 'page  number must have a number greater than 0'
            })
            return
        }
        try {
            const options = {
                page: req.query.page,
                limit: config.pageLength,
                collation: {
                  locale: 'en',
                },
            };
            const query = Task.find()
            const resDB = await Task.paginate(query,options)
            res.status(200);
            res.send(resDB.docs);
        } catch (error) {
            console.log(error)
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
    return {get,getPage,add,replace,remove}
}