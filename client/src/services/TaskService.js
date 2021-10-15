import Api from '@/services/Api';


export default {
  
  get () {
    return Api().get('task/get')
  },
  getPage (request) {
    return Api().get('task/getPage', request)
  },
  add (task) {
    return Api().post('task/add', task)
  },
  replace (task) {
    return Api().put('task/replace', task)
  },
  remove (id) {
    return Api().delete('task/remove', { data: {'id': id} })
  }

}
