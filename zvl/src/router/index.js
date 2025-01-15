import { createRouter, createWebHistory } from 'vue-router'
import AddDataView from '../views/AddExerciseView.vue'

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
      path: '/training/create',
      name: 'trainingCreation',
      component: () => import('../views/CreateTrainingView.vue'),
    }
  ],
})

export default router
