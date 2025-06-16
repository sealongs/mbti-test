import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import router from './router'
import { setupGlobalErrorHandlers } from './utils/errorHandler'
import { handleError } from './utils/errorHandler'

// 设置全局错误处理器
setupGlobalErrorHandlers()

const app = createApp(App)

// 配置Vue应用的错误处理器
app.config.errorHandler = (error, vm, info) => {
  handleError(error, { context: `Vue Error Handler: ${info}` })
}

// 配置全局警告处理器（开发环境使用）
if (import.meta.env.DEV) {
  app.config.warnHandler = (msg, vm, trace) => {
    console.warn(`[Vue Warning]: ${msg}\n${trace}`)
  }
}

app.use(createPinia())
   .use(router)
   .use(ElementPlus)
   .mount('#app')