import { createRouter, createWebHistory } from 'vue-router'
import HomePageView from '../views/HomePageView.vue'
import RegisterPageView from '../views/RegisterPageView.vue'
import LoginPageView from '../views/LoginPageView.vue'
import BookmarkPageView from '../views/BookmarkPageView.vue'
import DetailPageView from '../views/DetailPageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePageView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPageView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPageView
    },
    {
      path: '/bookmark',
      name: 'bookmark',
      component: BookmarkPageView
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailPageView
    }
  ]
})

router.beforeEach((to, from, next) => {
  // kalo gak ada akses token gak bisa akses page bookmark
  if (!localStorage.getItem('access_token') && to.name === 'bookmark') {
    next('/login')
  } else if (
    localStorage.getItem('access_token') &&
    (to.name === 'login' || to.name === 'register')
  ) {
    next('/')
  } else {
    next()
  }
})

export default router
