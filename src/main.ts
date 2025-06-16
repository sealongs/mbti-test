import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
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
app.config.errorHandler = (error, _, info) => {
  handleError(error, { context: `Vue Error Handler: ${info}` })
}

// 配置全局警告处理器（开发环境使用）
if (import.meta.env.DEV) {
  app.config.warnHandler = (msg, _, trace) => {
    console.warn(`[Vue Warning]: ${msg}\n${trace}`)
  }
}

// 注册所有 Element Plus 图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
   .use(router)
   .use(ElementPlus)
   .mount('#app')