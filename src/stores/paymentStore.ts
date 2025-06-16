import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePaymentStore = defineStore('payment', () => {
  // 支付状态
  const isPaid = ref(false)
  
  // 从本地存储初始化支付状态
  const initPaymentState = () => {
    const storedPaymentState = localStorage.getItem('mbti_payment_status')
    isPaid.value = storedPaymentState === 'paid'
  }
  
  // 设置支付状态
  const setPaymentStatus = (status: boolean) => {
    isPaid.value = status
    localStorage.setItem('mbti_payment_status', status ? 'paid' : 'unpaid')
  }
  
  // 完成支付
  const completePayment = () => {
    setPaymentStatus(true)
  }
  
  // 重置支付状态（用于测试）
  const resetPayment = () => {
    setPaymentStatus(false)
  }
  
  return {
    isPaid,
    initPaymentState,
    setPaymentStatus,
    completePayment,
    resetPayment
  }
})