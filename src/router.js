import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/visit',
      name: 'visit',
      component: () =>
        import(
          /* webpackChunkName: "login" */ '@/views/visit/VisitList.vue'
        ),
    },
    {
      path: '/formvisit',
      name: 'visitForm',
      component: () =>
        import(
          /* webpackChunkName: "login" */ '@/views/visit/VisitForm.vue'
        ),
    },
    {
      path: '/listvisita',
      name: 'visitList',
      component: () =>
        import(
          /* webpackChunkName: "login" */ '@/views/visit/VisitList.vue'
        ),
    },{
      path: '/formvisit',
      name: 'visitForm',
      component: () =>
        import(
          /* webpackChunkName: "login" */ '@/views/visit/VisitForm.vue'
        ),
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(
          /* webpackChunkName: "login" */ '@/views/authentication/Login.vue'
        ),
    },
    {
      path: '/',
      name: '',
      component: () =>
        import(
          /* webpackChunkName: "login" */ '@/views/authentication/Login.vue'
        ),
    }
  ],
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
