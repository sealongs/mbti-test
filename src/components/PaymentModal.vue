<template>
  <el-dialog
    v-model="dialogVisible"
    title="解锁完整测试报告"
    width="90%"
    :max-width="500"
    center
    @close="handleClose"
  >
    <div class="payment-content">
      <div class="price-info">
        <div class="price">
          <span class="currency">¥</span>
          <span class="amount">29</span>
        </div>
        <div class="price-description">
          <el-tag type="success">一次性付费，永久解锁</el-tag>
        </div>
      </div>

      <div class="features">
        <h4>完整报告包含：</h4>
        <ul>
          <li><el-icon><Check /></el-icon> 详细的性格类型描述</li>
          <li><el-icon><Check /></el-icon> 四个维度的详细得分分析</li>
          <li><el-icon><Check /></el-icon> 性格优势和潜在劣势分析</li>
          <li><el-icon><Check /></el-icon> 最适合您的职业发展方向</li>
          <li><el-icon><Check /></el-icon> 可下载的完整测试报告</li>
        </ul>
      </div>

      <div class="payment-methods">
        <h4>选择支付方式：</h4>
        <div class="method-buttons">
          <el-button
            :class="{ active: paymentMethod === 'wechat' }"
            @click="paymentMethod = 'wechat'"
          >
            <img :src="paymentIcons.wechat" alt="微信支付" class="payment-icon" />
            微信支付
          </el-button>
          <el-button
            :class="{ active: paymentMethod === 'alipay' }"
            @click="paymentMethod = 'alipay'"
          >
            <img :src="paymentIcons.alipay" alt="支付宝" class="payment-icon" />
            支付宝
          </el-button>
        </div>
      </div>

      <div class="qrcode-section" v-if="paymentMethod">
        <div class="qrcode-wrapper">
          <img 
            :src="currentQRCode"
            :alt="paymentMethod === 'wechat' ? '微信支付二维码' : '支付宝二维码'"
            class="qrcode"
          />
        </div>
        <p class="qrcode-tip">请使用{{ paymentMethod === 'wechat' ? '微信' : '支付宝' }}扫码支付</p>
        <p class="payment-status" v-if="isCheckingPayment">正在检查支付状态...</p>
      </div>

      <!-- 模拟支付按钮（仅用于演示） -->
      <div class="demo-payment">
        <el-button type="primary" @click="simulatePayment">
          模拟支付完成（仅用于演示）
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, watch } from 'vue'
import { Check } from '@element-plus/icons-vue'
import { usePaymentStore } from '../stores/paymentStore'
import { ElMessage } from 'element-plus'
import { paymentIcons } from '../assets/payment-icons'
import { paymentImages } from '../assets/payment-images'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'payment-success'): void
}>()

const paymentStore = usePaymentStore()
const paymentMethod = ref<'wechat' | 'alipay' | ''>('')
const isCheckingPayment = ref(false)
const checkPaymentTimer = ref<number | null>(null)

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// 获取当前支付方式对应的二维码图片
const currentQRCode = computed(() => {
  if (paymentMethod.value === 'wechat') {
    return paymentImages.wechat
  } else if (paymentMethod.value === 'alipay') {
    return paymentImages.alipay
  }
  return paymentImages.qrcode
})

const handleClose = () => {
  paymentMethod.value = ''
}

// 检查支付状态
const checkPaymentStatus = async () => {
  if (isCheckingPayment.value && paymentMethod.value) {
    try {
      // 模拟支付状态检查，实际项目中应替换为真实的支付状态检查API
      const random = Math.random()
      if (random > 0.7) { // 30%的概率支付成功
        paymentStore.completePayment()
        ElMessage.success('支付成功！')
        emit('payment-success')
        dialogVisible.value = false
        stopCheckingPayment()
      }
    } catch (error) {
      console.error('支付状态检查失败:', error)
    }
  }
}

// 开始检查支付状态
const startCheckingPayment = () => {
  isCheckingPayment.value = true
  checkPaymentTimer.value = window.setInterval(checkPaymentStatus, 3000) // 每3秒检查一次
}

// 停止检查支付状态
const stopCheckingPayment = () => {
  if (checkPaymentTimer.value) {
    clearInterval(checkPaymentTimer.value)
    checkPaymentTimer.value = null
  }
  isCheckingPayment.value = false
}

// 模拟支付完成
const simulatePayment = () => {
  if (!paymentMethod.value) {
    ElMessage.warning('请先选择支付方式')
    return
  }

  paymentStore.completePayment()
  ElMessage.success('支付成功！')
  emit('payment-success')
  dialogVisible.value = false
  stopCheckingPayment()
}

// 监听支付方式变化
watch(paymentMethod, (newValue) => {
  if (newValue) {
    startCheckingPayment()
  } else {
    stopCheckingPayment()
  }
})

// 组件卸载时清理定时器
onUnmounted(() => {
  stopCheckingPayment()
})
</script>

<style scoped lang="scss">
.payment-content {
  padding: 1rem;
}

.price-info {
  text-align: center;
  margin-bottom: 2rem;

  .price {
    font-size: 2.5rem;
    color: #67c23a;
    font-weight: bold;
    margin-bottom: 0.5rem;

    .currency {
      font-size: 1.5rem;
      margin-right: 0.25rem;
    }
  }

  .price-description {
    margin-top: 0.5rem;
  }
}

.features {
  margin-bottom: 2rem;

  h4 {
    margin-bottom: 1rem;
    color: #303133;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;
      margin-bottom: 0.75rem;
      color: #606266;

      .el-icon {
        color: #67c23a;
        margin-right: 0.5rem;
      }
    }
  }
}

.payment-methods {
  margin-bottom: 2rem;

  h4 {
    margin-bottom: 1rem;
    color: #303133;
  }

  .method-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;

    .el-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;

      &.active {
        background-color: #ecf5ff;
        border-color: #409eff;
        color: #409eff;
      }

      .payment-icon {
        width: 24px;
        height: 24px;
        object-fit: contain;
      }
    }
  }
}

.qrcode-section {
  text-align: center;
  margin-bottom: 2rem;

  .qrcode-wrapper {
    width: 200px;
    height: 200px;
    margin: 0 auto 1rem;
    padding: 0.5rem;
    border: 1px solid #dcdfe6;
    border-radius: 4px;

    .qrcode {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .qrcode-tip {
    color: #606266;
    margin: 0;
  }
}

.demo-payment {
  text-align: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed #dcdfe6;
}

// 响应式设计
@media (max-width: 768px) {
  .payment-methods {
    .method-buttons {
      flex-direction: column;
    }
  }
}
</style>