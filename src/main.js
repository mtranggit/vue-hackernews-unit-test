import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { sync } from 'vuex-router-sync';

import { titleMixin } from './utils/mixins';
import ProgressBar from '@/components/ProgressBar';

// Vue.config.productionTip = false;

// new Vue({
//   router,
//   store,
//   render: h => h(App),
// }).$mount('#app');

sync(store, router);

Vue.mixin(titleMixin);

const bar = new Vue(ProgressBar).$mount();
Vue.prototype.$bar = bar;
document.body.appendChild(bar.$el);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
