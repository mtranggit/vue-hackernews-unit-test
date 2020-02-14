import Vue from 'vue';
import { titleMixin } from './src/utils/mixins';

Vue.config.productionTip = false;

Vue.mixin(titleMixin);
