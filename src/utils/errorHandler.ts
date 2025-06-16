import { ElMessage, ElNotification } from 'element-plus'

/**
 * 错误类型枚举
 */
export enum ErrorType {
  NETWORK = 'network',
  TIMEOUT = 'timeout',
  AUTH = 'auth',
  VALIDATION = 'validation',
  SERVER = 'server',
  CLIENT = 'client',
  UNKNOWN = 'unknown'
}

/**
 * 错误处理配置选项
 */
export interface ErrorHandlerOptions {
  showMessage?: boolean
  showNotification?: boolean
  logToConsole?: boolean
  logToServer?: boolean
  context?: string
}

/**
 * 默认错误处理配置
 */
const defaultOptions: ErrorHandlerOptions = {
  showMessage: true,
  showNotification: false,
  logToConsole: true,
  logToServer: import.meta.env.PROD, // 仅在生产环境记录到服务器
  context: 'Application'
}

/**
 * 错误类型检测
 */
export const detectErrorType = (error: Error | unknown): ErrorType => {
  if (!error) return ErrorType.UNKNOWN

  const err = error as Error
  const message = err.message || String(error)
  
  if (message.includes('Network') || message.includes('net::ERR') || message.includes('fetch')) {
    return ErrorType.NETWORK
  }
  
  if (message.includes('timeout') || message.includes('timed out')) {
    return ErrorType.TIMEOUT
  }
  
  if (message.includes('401') || message.includes('unauthorized') || message.includes('auth')) {
    return ErrorType.AUTH
  }
  
  if (message.includes('validation') || message.includes('invalid')) {
    return ErrorType.VALIDATION
  }
  
  if (message.includes('500') || message.includes('server error')) {
    return ErrorType.SERVER
  }
  
  return ErrorType.CLIENT
}

/**
 * 获取用户友好的错误消息
 */
export const getFriendlyErrorMessage = (error: Error | unknown, errorType?: ErrorType): string => {
  const type = errorType || detectErrorType(error)
  
  switch (type) {
    case ErrorType.NETWORK:
      return '网络连接失败，请检查您的网络设置'
    case ErrorType.TIMEOUT:
      return '请求超时，请稍后重试'
    case ErrorType.AUTH:
      return '您的登录状态已过期，请重新登录'
    case ErrorType.VALIDATION:
      return '输入数据无效，请检查您的输入'
    case ErrorType.SERVER:
      return '服务器错误，请稍后重试'
    case ErrorType.CLIENT:
      return '应用程序错误，请刷新页面重试'
    default:
      return '操作失败，请重试'
  }
}

/**
 * 记录错误到服务器
 * 注意：这是一个模拟函数，实际项目中应替换为真实的错误上报逻辑
 */
const logErrorToServer = (error: Error | unknown, context: string, errorType: ErrorType): void => {
  // 实际项目中，这里应该是一个API调用，将错误信息发送到服务器
  console.info('[Error Report]', {
    timestamp: new Date().toISOString(),
    errorType,
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    context,
    userAgent: navigator.userAgent,
    url: window.location.href
  })
}

/**
 * 主要错误处理函数
 */
export const handleError = (
  error: Error | unknown, 
  customOptions?: Partial<ErrorHandlerOptions>
): void => {
  const options = { ...defaultOptions, ...customOptions }
  const errorType = detectErrorType(error)
  const friendlyMessage = getFriendlyErrorMessage(error, errorType)
  
  // 控制台日志
  if (options.logToConsole) {
    console.error(`[${options.context}]`, error)
  }
  
  // 显示消息提示
  if (options.showMessage) {
    ElMessage.error({
      message: friendlyMessage,
      duration: 5000,
      showClose: true
    })
  }
  
  // 显示通知
  if (options.showNotification) {
    ElNotification({
      title: '错误',
      message: friendlyMessage,
      type: 'error',
      duration: 8000
    })
  }
  
  // 记录到服务器
  if (options.logToServer) {
    logErrorToServer(error, options.context || 'Unknown', errorType)
  }
}

/**
 * 创建异步错误处理包装器
 * 用于包装异步函数，自动处理错误
 */
export const withErrorHandling = <T>(
  asyncFn: () => Promise<T>,
  options?: Partial<ErrorHandlerOptions>
): Promise<T | undefined> => {
  return asyncFn().catch(error => {
    handleError(error, options)
    return undefined
  })
}

/**
 * 全局未捕获错误处理器设置
 */
export const setupGlobalErrorHandlers = (): void => {
  // 捕获未处理的 Promise 错误
  window.addEventListener('unhandledrejection', (event) => {
    handleError(event.reason, { context: 'Unhandled Promise Rejection' })
  })

  // 捕获全局错误
  window.addEventListener('error', (event) => {
    handleError(event.error, { context: 'Global Error Event' })
  })
}

export default {
  handleError,
  withErrorHandling,
  setupGlobalErrorHandlers,
  detectErrorType,
  getFriendlyErrorMessage
}