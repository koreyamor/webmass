import Vue from 'vue'
import Router from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/use/Users.vue'
import '../assets/css/global.css'
// import { component } from 'vue/types/umd'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',//重定向
      children: [
        {
          path: '/welcome',
          component: Welcome
        },
        {
          path: '/users',
          component: Users
        }
      ]
    }
  ]
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //  to 将要访问的路径
  // from 代表从哪个路径跳转来
  // next 是一个函数 表示放行
  // next() 放行 next('/login')强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router


