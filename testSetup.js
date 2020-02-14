import Vue from 'vue';
import { titleMixin } from './src/utils/mixins';
import { host, timeAgo } from './src/utils/filters';

Vue.config.productionTip = false;

Vue.mixin(titleMixin);
Vue.filter('timeAgo', timeAgo);
Vue.filter('host', host);
