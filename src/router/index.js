import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/home',
      component: home
    }
  ]
})


//挂载路由守卫
router.beforeEach((to, from, next) =>{
    if(to.path === '/login') return next()
    const tokenStr = window.sessionStorage.getItem('tokeid')
    if(!tokenStr) return next('/login')
    next()
})

export default router
