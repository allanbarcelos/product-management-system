import { createRouter, createWebHistory } from 'vue-router';
import PrivateLayout from '@/layouts/PrivateLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

// Define a type for the user object to ensure type safety
interface User {
  token: string;
  role: 'admin' | 'user';
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Authentication Routes
    {
      path: '/auth',
      name: 'Auth',
      component: AuthLayout,
      redirect: { name: 'Login' },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('./../views/auth/Login.vue'),
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import('./../views/auth/Register.vue'),
        }
      ]
    },

    // Home route for regular users
    {
      path: '/',
      component: PrivateLayout,
      meta: { requireAuth: true, role: 'user' }, // Regular user role for this route
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('./../views/home/Home.vue'),
        }
      ]
    },

    // Admin dashboard route (only for admin users)
    {
      path: '/admin',
      component: PrivateLayout,
      meta: { requireAuth: true, role: 'admin' }, // Admin role required for this route
      children: [
        {
          path: '',
          name: 'AdminDashboard',
          component: () => import('./../views/admin/Dashboard.vue'),
        }
      ]
    }
  ]
});

// Navigation guard to protect routes based on role
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  // Get user data from localStorage or fallback to null
  const userData = localStorage.getItem('user');
  const user: User | null = userData ? JSON.parse(userData) : null;

  // If the route requires authentication but the user is not authenticated, redirect to login page
  if (to.matched.some(record => record.meta.requireAuth) && !isAuthenticated) {
    next({ name: 'Auth' });
  } else if (to.matched.some(record => record.meta.role)) {
    // Check for role-based route protection
    const requiredRole = to.meta.role;
    const userRole = user ? user.role : null;

    if (requiredRole && userRole !== requiredRole) {
      // If the role does not match, redirect to home (or other route)
      if (requiredRole === 'admin') {
        next({ name: 'Home' }); // Regular users are redirected to Home if they try to access admin route
      } else {
        next({ name: 'Home' }); // Admins redirected to Home if they try to access user route
      }
    } else {
      next(); // Proceed to the requested route if roles match
    }
  } else {
    next(); // Proceed to the requested route if no role or authentication check is needed
  }
});

export default router;
