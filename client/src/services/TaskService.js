import Api from '@/services/Api';


export default {
  
  get () {
    return Api().get('task/get')
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
