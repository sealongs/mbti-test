import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useTestStore } from '../stores/testStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestView.vue')
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('../views/ResultView.vue'),
      beforeEnter: (to, from, next) => {
        const testStore = useTestStore()
        // 如果没有测试结果，重定向到测试页面
        if (!testStore.isTestCompleted) {
          next('/test')
        } else {
          next()
        }
      }
    }
  ]
})

export default router