import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test.vue';
import NotFound from '@/components/NotFound';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Test',
      component: Test
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
});
