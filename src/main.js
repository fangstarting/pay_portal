// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import { Loading } from 'element-ui';
import axios from 'axios'
import * as echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'

//注册
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.prototype.$loading = Loading;
//全局注册axios
// Vue.prototype.$axios = axios;

//每次向服务器发送请求都要填写域名，可以设置一个baseUrl，这样可以省去域名，且更换域名更方便，生产环境和开发环境统一时很有用

// axios.defaults.baseURL = 'http://localhost:8081/pay/';
// axios.defaults.baseURL = '/api'

//sxios 跨域请求无法带上cookie的解决
// axios.defaults.withCredentials = true;
// `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
// 如果请求话费了超过 `timeout` 的时间，请求将被中断
// axios.defaults.timeout = 300000;

// create an axios instance
const service = axios.create({
  // baseURL: process.env.API,
  baseURL: '/payService',
  // baseURL: 'http://localhost:8081/pay/',
  // タイムアウト制限時間を五分（300000ミリ秒）に設定する
  timeout: 300000,
  //sxios 跨域请求携带cookie
  withCredentials: true,
  // socketPath: proxy, // default
  // httpAgent: new http.Agent({ keepAlive: true }),
  // httpsAgent: new https.Agent({ keepAlive: true }),
  // proxy: {
  //   protocol: 'http',
  //   host: '127.0.0.1',
  //   port: 9000,
  //   auth: {
  //     username: 'mikeymike',
  //     password: 'rapunz3l'
  //   }
  // },
})

/**
 * 每次向服务器发送请求，都需要携带Token，这样非常麻烦
 * 因此我们可以使用axios中的拦截器，将每次请求进行拦截
 * 然后添加Token到请求头中，这样每次在向服务器发送请求，则都会携带Token
 */
//请求拦截器
service.interceptors.request.use(function (config) {
  config.headers['Content-Type'] = 'application/json'
  // config.headers['Access-Control-Allow-Origin'] = '*'
  // config.headers['Access-Control-Allow-Headers'] = ' Origin, X-Requested-With, Content-Type, Accept'
  // config.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, DELETE, PUT, GET'
  // config.headers['Content-Type'] = 'application/json;charset=utf-8'
  const token = sessionStorage.getItem("token")
  if (token) {
    // config.headers.common['token'] = token;
    config.headers.Authorization = 'Bearer ' + token
  }
  return config;
}, function (error) {
  return Promise.reject("request error");
});


// axios请求拦截器 => interceptors 在页面发送请求前进行一次预处理
// axios.interceptors.request.use(config => {
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   // 在发起axios请求前自动进行预处理，追加一个token，以便于访问需要权限的页面
//   // 为请求头对象(headers)中添加token验证的自定义字段(Authorization)
//   // 作用是为了让需要验证才能使用的API能够使用(请求头中携带了token值则可通过验证)
//   // 在最后必须return config
//   return config
// })
//响应拦截器
service.interceptors.response.use(function (response) {
  const res = response.data
  // console.log(response, "响应拦截器response")
  if (res.type === 'application/json') {//将blob数据在转为json数据
    const reader = new FileReader();
    reader.readAsText(res, 'utf-8');
    reader.onload = () => {
      const readerres = reader.result;
      const parse = JSON.parse(readerres);
      isAuthority(parse)
    }
    // let enc = new TextDecoder('utf-8')
    // res = JSON.parse(enc.decode(new Uint8Array(res)))
  }
  if (res.token) {
    sessionStorage.setItem("token", res.token);
  }
  // console.log(res)
  isAuthority(res)
  //Loding服务
  return response;
}, function (error) {
  return Promise.reject("response error");
});

var flag = true;//屏蔽连续权限认证提示弹框
/**
 * 权限信息认证
 * @param {*} res 
 */
const isAuthority = (res) => {
  if (res.error == 403) {
    if (flag) {
      flag = false
      let mes = res.message
      vue.$alert(mes, '提示', {
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        window.sessionStorage.clear() //清空会话存储的数据>>清除
        vue.$router.push('/login')
      }).catch(() => {
      })
      //屏蔽连续权限认证提示弹框
      setTimeout(function () {
        flag = true
      }, 10000);
    }

    return Promise.reject("请重新获取权限验证")
  }
}


/**
 * json文字列判断
 */
const isJsonString = function (str) {
  try {
    if (typeof JSON.parse(str) === 'object') {
      return true
    }
  } catch (e) {
  }
  return false
}

Vue.prototype.$axios = service;

/* eslint-disable no-new */
const vue = new Vue({
  el: '#app',
  router,
  store,
  // axios,
  components: { App },
  template: '<App/>'
})
