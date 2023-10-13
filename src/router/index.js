import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        title: 'Sportypredict - Football predictions and daily free betting tips',
        description: 'sportypredict offers accurate and free football predictions daily. Discover sure home win tips, bet of the day bets, tennis & basketball BTTS/GG predictions, and more. Start making informed bets with sportypredict.',
      },
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
      path: '/a-login',
      name: 'AdminLogin',
      component: () => import('../views/AdminLoginView.vue'),
      meta: {
        title: "Login - Login to sportypredict",
        description: "Login to enjoy more services ",
      },
    },
    {
      path: '/a-signin',
      name: 'AdminSignin',
      component: () => import('../views/AdminSigninView.vue'),
      meta: {
        title: "Signin - Signin to sportypredict",
        description: "Signin to get more offers and services",
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        title: "Login - Login to sportypredict",
        description: "Login to enjoy more services ",
      },
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
      meta: {
        title: "Tips - Free Sport Tips and daily free betting tips",
        description: "sportypredict offers accurate and free football predictions daily. Discover sure home win tips, bet of the day bets, tennis & basketball BTTS/GG predictions, and more. Start making informed bets with sportypredict.",
      },
      props: true
    },
    {
      path: '/predictions/:id',
      name: 'Predictions',
      component: () => import('../views/predictionView.vue'),
      meta: {
        title: "Free Predictions and daily free betting tips",
        description: "sportypredict offers accurate and free football predictions daily.",
      },
    },
    {
      path: '/vip',
      name: 'Vip',
      component: () => import('../views/VipView.vue'),
      meta: {
        title: "Vip - Get Vip Predictions",
        description: "sportypredict offers vip sure predictions.",
      },
      // meta: { auth: true }
    },
    {
      path: '/bonus',
      name: 'Bonus',
      component: () => import('../views/BonusView.vue'),
      meta: {
        title: "Bonus - Get Bonus",
        description: "sportypredict offers bonuses for others betting site",
      },
    },
    {
      path: '/news/:title',
      name: 'News',
      component: () => import('../views/NewsView.vue'),
      meta: {
        title: "News - Free sport news",
        description: "sportypredict offers spors news ",
      },
      props: true,
    },
    {
      path: '/bet-of-day',
      name: 'Banker',
      component: () => import('../views/BankerView.vue'),
      meta: {
        title: "Bet of the day - Free Football Predictions",
        description: "Get accurate and free football predictions daily. Discover sure home win tips, banker bets, BTTS/GG predictions, and more. Start making informed bets.",
      },
    },
    {
      path: '/bet/:betName',
      name: 'Bet',
      component: () => import('../views/BetView.vue'),
      meta: (route) => ({
        title: route.params.betName,
        description: getDescription(route.params.betName),
      }),
      props: true,
    },
    {
      path: '/basketball',
      name: 'Basketball',
      component: () => import('../views/BasketballView.vue'),
      meta: {
        title: "Basketball predictions and daily free betting tips",
        description: "Get the latest free Basketball betting tips to boost your winnings.",
      },
    },
    {
      path: '/football',
      name: 'Football',
      component: () => import('../views/FootballView.vue'),
      meta: {
        title: "Football predictions and daily free betting tips",
        description: "Get the latest free Football betting tips to boost your winnings.",
      },
    },
    {
      path: '/tennis',
      name: 'Tennis',
      component: () => import('../views/TennisView.vue'),
      meta: {
        title: "Tennis predictions and daily free betting tips",
        description: "Ace your tennis bets with free and reliable betting tips.",
      },
    },
    {
      path: '/terms&condition',
      name: 'Terms',
      component: () => import('../components/Terms&Condition.vue'),
      meta: {
        title: "Terms - Our Terms and conditions",
        description: "Know our terms and conditions to better work with us or partner with us",
      },
    },
    {
      path: '/refund-policy',
      name: 'Refund',
      component: () => import('../components/Refundpolicy.vue'),
      meta: {
        title: "Refund - Our refund policy",
        description: "Read to know when refund policy applies in terms of payment issues",
      },
    },
    {
      path: '/policy',
      name: 'Policy',
      component: () => import('../components/Policyinfo.vue'),
      meta: {
        title: "Policy - our policy",
        description: " our policy outline's the code of conduct neccesary to ensure good working condition with us",
      },
    },
    {
      path: '/disclaimer',
      name: 'Disclaimer',
      component: () => import('../components/Disclaimerinfo.vue'),
      meta: {
        title: "Disclaimer",
        description: " our disclaimer information to note",
      },
    },
    {
      path: '/how-to-pay',
      name: 'Pay',
      component: () => import('../views/PayView.vue'),
      meta: {
        title: "Pay - Pay for vip",
        description: "how to pay for our vip services",
      },
    },
    {
      path: '/sitemap.xml',
      name: 'Sitemap',
      component: () => import('../views/SitemapView.vue'),
      meta: {
        title: 'Sitemap',
        description: 'Download the sitemap for search engines.'
      }
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue'),
      meta: {
        title: "404 - Page not found",
        description: "Sorry page doesn't exist on sportypredict",
      },
    },
  ],
})


function getDescription(betName) {
  const descriptions = {
    "Over 2.5 Goals": 'over 2.5 goals predictions and tips.',
    "Double Chance": 'Double chance predictions and tips',
    "Over 1.5 Goals": 'Over 1.5 goals predictions and tips.',
    "Under 2.5 Goals": 'Under 2.5 goals predictions and tips.',
    "Both Team To Score": 'both teams to score/BTTS predictions and tips.',
  };

  return descriptions[betName] || ''; 
}

const currentUser = () => {
  const token = localStorage.getItem('token');
  return !!token; // Return true if token exists, false otherwise
}

const isAdmin = () => {
  const admin = localStorage.getItem('admin');
  return admin === 'true'; // Return true if admin is 'true', false otherwise
}


const dynamicTitleGuard = (to, from, next) => {
  document.title = to.meta.title || 'Sportypredict - Free Football Predictions';
  next();
};

const adminGuard = (to, from, next) => {
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
};

router.beforeEach(dynamicTitleGuard);
router.beforeEach(adminGuard);

export default router;