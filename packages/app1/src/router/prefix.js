import { qiankunWindow } from "vite-plugin-qiankun/dist/helper"
import packageConfig from "../../package.json"

const prefix = qiankunWindow.__POWERED_BY_QIANKUN__ ? `/${packageConfig.name}` : ""

export default prefix
