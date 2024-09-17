import { createRouter, createWebHistory } from 'vue-router';
import login from '../views/login.vue';
import home from '../views/home.vue';

const routes = [
  { path: '/login', component: login },
  { path: '/', component: home, meta: { requiresAuth: true }  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      const token = localStorage.getItem('token');
      if (!token) {
        next('/login');
      } else {
        next();
      }
    } else {
      next();
    }
  });

export default router;