// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import utils from '@/components/service/utils'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import Qs from 'qs'
import wangeditor from 'wangeditor'
import Qiniu from 'qiniu-js/dist/qiniu.min.js'
import axiosbusiness from "@/components/service/axiosbusiness"

Vue.config.productionTip = false
//axios.defaults.baseURL="http://192.168.11.111:9000";
//axios.defaults.baseURL="http://118.190.133.146:9000";
axios.defaults.baseURL="http://app.jiehao9.com";
axios.defaults.headers["Content-Type"]="application/x-www-form-urlencoded";
Vue.prototype.Qs=Qs
Vue.prototype.utils=utils
Vue.prototype.wangeditor=wangeditor
Vue.prototype.axiosbusiness=axiosbusiness
Vue.use(VueAxios, axios)
Vue.use(iView)
//全局监听事件
Vue.prototype.Hub = new Vue();
new Vue({
  el: '#app',
  router,
  components: { App },
  render: h => h(App),
  template: '<App/>'
})
