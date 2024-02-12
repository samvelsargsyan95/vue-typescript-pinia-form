import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import FormView from '../views/FormView.vue'
import UserView from '../views/UserView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => FormView,
    children: [{
      path: 'form',
      name: 'Form',
      component: () => FormView
    }]
  },
  {
    path: '/user',
    name: 'User',
    component: () => UserView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
