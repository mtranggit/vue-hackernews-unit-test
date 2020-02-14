import Vue from 'vue';
import VueRouter from 'vue-router';
import routerConfig from './routerConfig';

Vue.use(VueRouter);

const router = new VueRouter(routerConfig);
// const router = new VueRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes
// });

export default router;
