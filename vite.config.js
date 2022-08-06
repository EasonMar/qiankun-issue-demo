import { defineConfig } from "vite"
import { resolve } from "path"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"

const pathResolve = (dir) => {
  return resolve(__dirname, ".", dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      common: pathResolve("./common"),
      pkgs: pathResolve("./packages")
    }
  },
  plugins: [
    AutoImport({
      // vue函数的自动导入
      imports: ["vue", "vue-router", "@vueuse/core"],
    }),
    vue(),
  ]
})
