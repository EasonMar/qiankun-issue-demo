import { registerMicroApps, addGlobalUncaughtErrorHandler, start, initGlobalState } from "qiankun"

// 微应用的信息
import microApps from "./microApps"

/**
 * 注册微应用
 * 第一个参数 - 微应用的注册信息
 * 第二个参数 - 全局生命周期钩子
 */
registerMicroApps(microApps, {
  // qiankun 生命周期钩子 - 微应用加载前
  beforeLoad: (app) => {
    // 加载微应用前，加载进度条
    // eslint-disable-next-line no-console
    console.log("before load app.name====>>>>>", app.name)
    return Promise.resolve(app)
  },
  beforeMount: (app) => {
    // eslint-disable-next-line no-console
    console.log("[LifeCycle] before mount %c%s", "color: green;", app.name)
    return Promise.resolve(app)
  },
  // qiankun 生命周期钩子 - 微应用挂载后
  afterMount: (app) => {
    // 加载微应用前，进度条加载完成
    // eslint-disable-next-line no-console
    console.log("[LifeCycle] after mount %c%s", "color: green;", app.name)
    return Promise.resolve(app)
  }
})

/**
 * 添加全局的未捕获异常处理器
 */
addGlobalUncaughtErrorHandler((event) => {
  throw event
})

/**
 * qiankun 通信实例
 */
const initialState = {}
export const actions = initGlobalState(initialState)

// 导出 qiankun 的启动函数
export default start
