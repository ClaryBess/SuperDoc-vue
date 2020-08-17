// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/iconfont.css'
import SliderVerificationCode from 'slider-verification-code';
import 'slider-verification-code/lib/slider-verification-code.css';
import VueParticles from 'vue-particles';
import axios from "axios";

Vue.use(ElementUI);
Vue.use(SliderVerificationCode);
Vue.use(VueParticles)
Vue.config.productionTip = false;
Vue.prototype.axios = axios;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.timeout=10000;
// Vue.use(axios);

// axios.defaults.headers.post["Content-Type"]='application/json';n
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
