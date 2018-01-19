import Vue from 'vue'
import VueRouter from 'vue-router'
import Browser from './browser.vue'
import Config from './config.vue';

Vue.use(VueRouter);

const routes = [
  {path: '*', redirect: '/'},
  {path: '/', component: Browser},
  {path: '/config', component: Config}
];

export default new VueRouter({
  mode: 'history',
  routes
});

