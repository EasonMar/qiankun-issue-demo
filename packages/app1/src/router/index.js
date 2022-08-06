import { createRouter, createWebHashHistory } from "vue-router"
import prefix from "./prefix.js"

import Home from "@/views/Home.vue"


// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: prefix + "/",
      redirect: prefix + "/index"
    },
    {
      name: "首页",
      path: prefix + "/index",
      component: Home
    }
  ],
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
