import { createApp } from 'vue'
import router from "./router"
import startQianKun, { actions } from "common/modules"
import './style.css'
import App from './App.vue'

const app = createApp(App)
app.use(router).mount("#app")


// 注册 qiankun
startQianKun({ sandbox: { strictStyleIsolation: true } }) // 开启严格的样式隔离模式 - https://qiankun.umijs.org/zh/api#startopts

// qiankun 通信
actions.onGlobalStateChange((state, prevState) => {
  // state: 变更后的状态; prevState: 变更前的状态
  // console.log(state, prevState)
})
