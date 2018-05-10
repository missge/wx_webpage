// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import NProgress from 'nprogress'
import store from './vuex/store'
//vuex store
import 'nprogress/nprogress.css'
import 'element-ui/lib/theme-default/index.css'
import Vuex from 'vuex'
import 'font-awesome/css/font-awesome.min.css'

import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';

import {VueMasonryPlugin} from 'vue-masonry';
import Sortable from 'sortablejs'
var Resource = require('./util/Resource');
import VueAwesomeSwiper from 'vue-awesome-swiper'
import GlobalConfig from './GlobalConfig'
import api from './api'

// Vue.use(VueAwesomeSwiper)
// var validator = require('vue-validator');
// var resource = require('vue-resource');

Vue.config.debug = true;
window.Vue = Vue;
// import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)
Vue.use(Mint)
Vue.use(Vuex)
Vue.use(VueMasonryPlugin)
Vue.directive('sortable', {
  inserted: function (el, binding) {
    new Sortable(el, binding.value || {})
  }
})
Vue.prototype.Resource = Resource;
// Vue.use(validator);
// Vue.use(resource);
NProgress.configure({ showSpinner: false });


Vue.config.productionTip = false

Vue.prototype.global_config = GlobalConfig;
Vue.prototype.API_UTIL = api
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
