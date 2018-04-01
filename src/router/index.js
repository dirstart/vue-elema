import Vue from 'vue';
import Router from 'vue-router';

import Test from '@/components/Test.vue';
import NotFound from '@/components/NotFound';

import Seller from '@/components/seller/seller';
import Goods from '@/components/goods/goods';
import Ratings from '@/components/ratings/ratings';

Vue.use(Router);

const routes = [
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/',
    redirect: '/goods'
  },
  {
    path: '/seller',
    name: 'seller',
    component: Seller
  },
  {
    path: '/goods',
    name: 'goods',
    component: Goods
  },
  {
    path: '/ratings',
    name: 'ratings',
    component: Ratings
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
];

let router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes
});

export default router;
