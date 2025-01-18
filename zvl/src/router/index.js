import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/exercise/create',
      name: 'addExercise',
      component: () => import('../views/AddExerciseView.vue'),
      meta: { requiresAuth: true }
     
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/trainings',
      name: 'trainings',
      component: () => import('../views/TrainingView.vue'),
    },
    {
      path: '/exercises',
      name: 'exercises',
      component: () => import('../views/ExerciseView.vue'),
    },
    {
      path: '/exercise/:id',
      name: 'exerciseDetail',
      component: () => import('../views/ExerciseDetailView.vue'),
      props: true,
    },
    {
      path: '/exercise/edit/:id',
      name: 'exerciseEdit',
      component: () => import('../views/EditExerciseView.vue'),
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/training/create',
      name: 'trainingCreation',
      component: () => import('../views/CreateTrainingView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/training/edit/:id',
      name: 'trainingEdit',
      component: () => import('../views/EditTrainingView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/training/:id',
      name: 'trainingDetail',
      component: () => import('../views/TrainingDetailView.vue'),
      props: true,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/users',
      name: 'UserList',
      component: () => import('../views/UserView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },

  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    
    next({ name: "login" });
  } 
  
  if (to.meta.requiresAdmin && authStore.role !== 'Admin') {
    
    return next({ name: 'home' });
  }

  next();
});

export default router
