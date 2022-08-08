# qiankun Error Demo

## 一、错误描述
- ```application 'xxx' died in status SKIP_BECAUSE_BROKEN: [: Target container with xxx not existed while xxx mounting!```
- 说明：容器写在了路由页面，**但是并未使用任何路由过渡效果**，https://qiankun.umijs.org/zh/faq#application-died-in-status-not_mounted-target-container-with-container-not-existed-while-xxx-mounting 提到的解决方案对此问题无效


## 二、可复现仓库
- 项目地址：[https://github.com/EasonMar/qiankun-issue-demo](https://github.com/EasonMar/qiankun-issue-demo) 
- 说明：项目使用 pnpm 构建 monorepo, 需要安装 pnpm, node >= v14.x.x


## 三、复现步骤
1. 进入项目根目录, pnpm i 安装依赖
2. pnpm dev 本地运行所有应用
3. 浏览器访问 http://localhost:3000/ 主应用（默认为login页）
4. 点击 `To APP1` 跳转到 容器页面, 并加载子应用
5. 点击浏览器 回退 按钮, 回退到 login 页
6. 点击浏览器 前进 按钮, 前进到 容器页面, **此时子应用加载失败**


## 四、对比实验 & 观察
1. 将主、子应的路由模式从 `hash` 换成 `history`, 则不存在以上问题
2. 移除 `Login.vue` 内的 `actions.setGlobalState`, 则不存在以上问题
3. 使用 `Router.push` 或 `<router-link>` 进行跳转, 则不存在以上问题
4. 据观察, 出现此异常在于：点击浏览器 前进 按钮时, 容器页面还未渲染出来, 就触发了 `qiankun` `loader.js` 中的 `render` 方法, 导致 `render` 方法内获取 `container` 失败
5. 手动刷新浏览器页面后, 微应用可以正常加载


## 无、相关环境信息
- qiankun 版本：v 2.7.0
- 主、子应用均采用Vue3：vue3(3.2.31)、vue-router(4.0.14)、路由使用 `hash` 模式
- 浏览器版本：Edge 103.0.1264.77 (正式版本) (x86_64)、Chrome 103.0.5060.114（正式版本） (x86_64)
- 操作系统：win10 64位、macOS10.14.6