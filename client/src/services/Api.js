import axios from 'axios'
// const https = require('https');

export default () => {
  return axios.create({
    baseURL: 'https://localhost:8081/'
  })
}
