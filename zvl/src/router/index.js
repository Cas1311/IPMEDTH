import { createRouter, createWebHistory } from 'vue-router'
import AddDataView from '../views/AddDataView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AddDataView,
    },
    {
      path: '/trainings',
      name: 'trainings',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
