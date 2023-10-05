import { createRouter, createWebHistory } from "vue-router";
import TodosView from "../views/TodosView.vue";
import Registration from '../components/registration.vue';
import Login from '../components/login.vue';
import store from '../store/store'; 
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/todo",
      name: "todos",
      component: TodosView,
      meta: {
        requiresAuth: true // Add this meta field to specify that authentication is required for this route
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: '/',
      name: 'signup',
      component: Registration
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../components/ForgotPassword.vue')
    }
  ],
});

// Navigation guard to check if the user is authenticated before accessing the todos route
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if the user is authenticated (implement your authentication logic here)
    const isAuthenticated = store.state.loggedIn;

    if (!isAuthenticated) {
      // User is not authenticated, redirect to the login page
      next({ name: 'login' });
    } else {
      // User is authenticated, proceed to the requested route
      next();
    }
  } else {
    // Route doesn't require authentication, proceed as usual
    next();
  }
});

export default router;
