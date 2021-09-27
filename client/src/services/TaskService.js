import Api from '@/services/Api';
import https from 'https';
import clientCert from 'raw-loader!./client1.crt';
import clientKey from 'raw-loader!./client1.key';
import ca from 'raw-loader!./ca1.crt';

const httpsAgent = new https.Agent({
});


export default {
  
  get () {
    httpsAgent.cert= clientCert,
    httpsAgent.key= clientKey,
    httpsAgent.ca = ca;
    httpsAgent.requestCert = true;
    httpsAgent.rejectUnauthorized= true;
    console.log("ca: "+JSON.stringify(httpsAgent.cert))
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
