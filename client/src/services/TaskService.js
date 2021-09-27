import Api from '@/services/Api';
import https from 'https';
import clientCert from 'raw-loader!./client.crt';
import clientKey from 'raw-loader!./client.key';
import ca from 'raw-loader!./ca.crt';

const httpsAgent = new https.Agent({
  // cert: clientCert,
  // key: clientKey,
  // ca: ca,
});


export default {
  
  get () {
    httpsAgent.cert= clientCert,
    httpsAgent.key= clientKey,
    httpsAgent.ca = ca;
    console.log("ca: "+JSON.stringify(httpsAgent.cert))
    return Api().get('task/get', httpsAgent)
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
