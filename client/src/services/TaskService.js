import Api from '@/services/Api'

export default {
  addTask (task) {
    return Api().post('addedTask', task)
  }
}
