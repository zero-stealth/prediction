import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/pixel',
      name: 'Panel',
      component: () => import('../views/PanelView.vue'),
      meta: {
        isAdmin: true
      }
    },
    {
      path: '/admin-login',
      name: 'AdminLogin',
      component: () => import('../views/AdminLoginView.vue')
    },
    {
      path: '/admin-signin',
      name: 'AdminSignin',
      component: () => import('../views/AdminSigninView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signin',
      name: 'Signin',
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/tips-of-the-day/:id',
      name: 'Tips',
      component: () => import('../views/TipsView.vue'),
      props: true
    },
    {
      path: '/predictions/:id',
      name: 'Predictions',
      component: () => import('../views/predictionView.vue')
    },
    {
      path: '/vip',
      name: 'Vip',
      component: () => import('../views/VipView.vue'),
      // meta: { auth: true }
    },
    {
      path: '/news/:id',
      name: 'News',
      component: () => import('../views/NewsView.vue')
    },
    {
      path: '/bet-of-day',
      name: 'Banker',
      component: () => import('../views/BankerView.vue')
    },
    {
      path: '/bet/:betName',
      name: 'Bet',
      component: () => import('../views/BetView.vue'),
      props: true
    },
    {
      path: '/basketball',
      name: 'Basketball',
      component: () => import('../views/BasketballView.vue')
    },
    {
      path: '/tennis',
      name: 'Tennis',
      component: () => import('../views/TennisView.vue')
    },
    {
      path: '/terms&condition',
      name: 'Terms',
      component: () => import('../components/Terms&Condition.vue')
    },
    {
      path: '/refund-policy',
      name: 'Refund',
      component: () => import('../components/Refundpolicy.vue')
    },
    {
      path: '/policy',
      name: 'Policy',
      component: () => import('../components/Policyinfo.vue')
    },
    {
      path: '/disclaimer',
      name: 'Disclaimer',
      component: () => import('../components/Disclaimerinfo.vue')
    },  
    {
      path: '/how-to-pay',
      name: 'Pay',
      component: () => import('../views/PayView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})
const currentUser = () => {
  const token = localStorage.getItem('token');
  return !!token; // Return true if token exists, false otherwise
}

const isAdmin = () => {
  const admin = localStorage.getItem('admin');
  return admin === 'true'; // Return true if admin is 'true', false otherwise
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.isAdmin)) {
    if (isAdmin()) {
      next();
    } else {
      next('/');
    }
  } else if (to.matched.some((record) => record.meta.auth)) {
    if (currentUser()) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
})

export default router