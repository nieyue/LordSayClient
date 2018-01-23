// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import Qs from 'qs'

Vue.config.productionTip = false
axios.defaults.baseURL="http://192.168.11.111:9000";
axios.defaults.headers["Content-Type"]="application/x-www-form-urlencoded";
Vue.prototype.Qs=Qs
Vue.use(VueAxios, axios)
Vue.use(iView)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  render: h => h(App),
  template: '<App/>'
})
