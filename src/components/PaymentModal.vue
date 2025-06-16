<template>
  <el-dialog
    v-model="visible"
    title="解锁完整测试报告"
    width="90%"
    :max-width="500"
    center
    :close-on-click-modal="false"
    class="payment-dialog"
  >
    <div class="payment-content">
      <div class="price-section">
        <div class="original-price">原价: ¥39.9</div>
        <div class="current-price">
          <span class="label">优惠价</span>
          <span class="price">¥29.9</span>
        </div>
      </div>

      <div class="benefits-section">
        <h4>解锁后您将获得：</h4>
        <ul>
          <li>
            <el-icon><Document /></el-icon>
            详细的性格类型描述
          </li>
          <li>
            <el-icon><DataLine /></el-icon>
            四个维度的详细得分分析
          </li>
          <li>
            <el-icon><Star /></el-icon>
            个性化的优势分析
          </li>
          <li>
            <el-icon><Warning /></el-icon>
            需要注意的潜在劣势
          </li>
          <li>
            <el-icon><Position /></el-icon>
            最适合您的职业发展方向
          </li>
        </ul>
      </div>

      <div class="payment-method">
        <div class="method-header">
          <img src="../assets/wechat-pay.png" alt="微信支付" class="payment-icon">
          <span>微信支付</span>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="handlePayment" :loading="loading">
          立即支付
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Document, DataLine, Star, Warning, Position } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { usePaymentStore } from '../stores/paymentStore'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'payment-success'): void
}>()

const paymentStore = usePaymentStore()
const loading = ref(false)

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const closeDialog = () => {
  visible.value = false
}

const handlePayment = async () => {
  try {
    loading.value = true
    // TODO: 这里需要集成实际的微信支付
    // 模拟支付过程
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 模拟支付成功
    const mockOrderId = 'ORDER_' + Date.now()
    paymentStore.setPaid(mockOrderId)
    
    ElMessage.success('支付成功！')
    emit('payment-success')
    closeDialog()
  } catch (error) {
    ElMessage.error('支付失败，请重试')
    console.error('Payment error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.payment-dialog {
  :deep(.el-dialog__body) {
    padding: 20px;
  }
}

.payment-content {
  .price-section {
    text-align: center;
    margin-bottom: 20px;

    .original-price {
      color: #999;
      text-decoration: line-through;
      font-size: 14px;
    }

    .current-price {
      margin-top: 8px;
      
      .label {
        font-size: 16px;
        color: #666;
        margin-right: 8px;
      }

      .price {
        font-size: 24px;
        color: #ff4d4f;
        font-weight: bold;
      }
    }
  }

  .benefits-section {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #f5f7fa;
    border-radius: 8px;

    h4 {
      margin: 0 0 12px 0;
      color: #303133;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        color: #606266;

        .el-icon {
          margin-right: 8px;
          color: #409EFF;
        }
      }
    }
  }

  .payment-method {
    padding: 12px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;

    .method-header {
      display: flex;
      align-items: center;
      
      .payment-icon {
        width: 24px;
        height: 24px;
        margin-right: 8px;
      }
    }
  }
}

.dialog-footer {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-top: 20px;
}
</style>