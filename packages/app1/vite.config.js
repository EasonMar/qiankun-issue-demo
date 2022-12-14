import { defineConfig, loadConfigFromFile, mergeConfig } from "vite"
import AutoImport from "unplugin-auto-import/vite"
import packageConfig from "./package.json"
import qiankun from "vite-plugin-qiankun"
import { resolve } from "path"

const pathResolve = (dir) => {
  return resolve(__dirname, ".", dir)
}

const useDevMode = true // 如果是在主应用中加载子应用 vite, 必须打开这个, 否则vite加载不成功, 单独运行没影响
// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  const base = (await loadConfigFromFile({ command, mode }, pathResolve("../../vite.config.js"))).config
  base.plugins.shift()
  const config = {
    resolve: {
      alias: {
        "@": pathResolve("src")
      }
    },
    server: { port: 3001 },
    plugins: [
      qiankun(`${packageConfig.name}`, { useDevMode }),
      AutoImport({
        // vue函数的自动导入
        imports: ["vue", "vue-router", "@vueuse/core"],
        dts: false
      })
    ]
  }
  return mergeConfig(base, config)
})
