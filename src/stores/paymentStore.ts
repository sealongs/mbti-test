import { defineStore } from 'pinia'

export interface PaymentState {
  isPaid: boolean
  orderId: string | null
  paymentTime: string | null
}

export const usePaymentStore = defineStore('payment', {
  state: (): PaymentState => ({
    isPaid: false,
    orderId: null,
    paymentTime: null
  }),

  actions: {
    setPaid(orderId: string) {
      this.isPaid = true
      this.orderId = orderId
      this.paymentTime = new Date().toISOString()
      // 将支付状态保存到本地存储
      localStorage.setItem('mbti_payment', JSON.stringify({
        isPaid: this.isPaid,
        orderId: this.orderId,
        paymentTime: this.paymentTime
      }))
    },

    // 初始化支付状态
    initPaymentState() {
      const savedPayment = localStorage.getItem('mbti_payment')
      if (savedPayment) {
        const { isPaid, orderId, paymentTime } = JSON.parse(savedPayment)
        this.isPaid = isPaid
        this.orderId = orderId
        this.paymentTime = paymentTime
      }
    },

    // 重置支付状态（用于测试）
    resetPayment() {
      this.isPaid = false
      this.orderId = null
      this.paymentTime = null
      localStorage.removeItem('mbti_payment')
    }
  }
})