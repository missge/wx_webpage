import axios from 'axios';
import GlobalConfig from '../GlobalConfig'
var querystring = require('querystring');
let base = GlobalConfig.base;
// var isProduction = process.env.NODE_ENV === 'production';
// let base = 'http://localhost:8008';
// if (isProduction) {
//     base = ""
// }

export const requestLogin = params => { return axios.post(`${base}/rest/account/api/login`,  querystring.stringify(params)).then(res => res.data); };

export const requestLogout = params => { return axios.post(`${base}/rest/account/api/logout`).then(res => res.data); };
