import { createRouter, createWebHashHistory } from "vue-router"
import microApps from "common/modules/microApps"
import Login from "@/views/Login.vue"
import Layout from "@/views/Layout.vue"

// 获取微服务路由 
const microRoutes = []
microApps.forEach(micro => {
  microRoutes.push({
    // Tip: 注册子应用路由...不能把 # 带进去
    path: `${micro.activeRule.replace("#", "")}/:morePath*`,
    component: Layout
  })
})

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: microRoutes.concat([
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      component: Login
    },
  ]),
  // 滚动行为 - https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html
  scrollBehavior(to, from, savedPosition) {
    return new Promise(resolve => {
      if (savedPosition) {
        return savedPosition
      }
      if (from.meta.saveSrollTop) {
        const top = document.documentElement.scrollTop || document.body.scrollTop
        resolve({ left: 0, top })
      }
    })
  }
})


export default router
