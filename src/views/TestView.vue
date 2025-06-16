<template>
  <div class="test-container">
    <el-card class="test-card" v-loading="loading" element-loading-text="加载测试问题中...">
      <template #header>
        <div class="card-header">
          <el-progress 
            :percentage="progress"
            :format="progressFormat"
            :stroke-width="20"
            class="progress-bar"
          />
        </div>
      </template>

      <div v-if="error || !testStore.isInitialized" class="error-container">
        <el-alert
          :title="errorType === 'network' ? '网络连接失败' : '加载测试问题失败'"
          type="error"
          :description="errorType === 'network' 
            ? '无法连接到服务器，请检查您的网络连接。' 
            : '无法加载测试问题，请尝试重新加载。'"
          show-icon
          :closable="false"
        />
        <div class="retry-info" v-if="retryCount > 0">
          <span>已重试 {{ retryCount }}/{{ maxRetries }} 次</span>
        </div>
        <el-button 
          class="retry-button" 
          type="primary" 
          @click="handleRetry"
          :loading="retryLoading"
          :disabled="retryCount >= maxRetries"
        >
          {{ retryCount >= maxRetries ? '请刷新页面重试' : '重试' }}
        </el-button>
      </div>

      <div v-else class="question-container">
        <div class="question-number">
          问题 {{ currentQuestionIndex + 1 }}/{{ totalQuestions }}
        </div>

        <div class="question-text">
          {{ currentQuestion?.text }}
        </div>

        <div class="options-container">
          <el-radio-group 
            v-model="selectedValue" 
            class="radio-group"
            @change="handleOptionSelect"
          >
            <el-radio-button :label="1">非常不同意</el-radio-button>
            <el-radio-button :label="2">不同意</el-radio-button>
            <el-radio-button :label="3">中立</el-radio-button>
            <el-radio-button :label="4">同意</el-radio-button>
            <el-radio-button :label="5">非常同意</el-radio-button>
          </el-radio-group>
        </div>

        <div class="navigation-buttons">
          <el-button 
            :disabled="!canGoPrevious"
            @click="handlePrevious"
            class="nav-button"
          >
            上一题
          </el-button>

          <el-button 
            v-if="!isLastQuestion"
            type="primary" 
            :disabled="!selectedValue"
            @click="handleNext"
            class="nav-button"
          >
            下一题
          </el-button>

          <el-button 
            v-else
            type="success" 
            :disabled="!selectedValue"
            @click="handleComplete"
            class="nav-button"
          >
            完成测试
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTestStore } from '../stores/testStore'
import { questions } from '../data/questions'
import { ElMessage } from 'element-plus'
import { handleError, ErrorType, withErrorHandling } from '../utils/errorHandler'

const router = useRouter()
const testStore = useTestStore()

// 加载状态和错误处理
const loading = ref(true)
const error = ref(false)
const retryCount = ref(0)
const maxRetries = 3
const retryLoading = ref(false)
const errorType = ref<'network' | 'init' | 'unknown'>('unknown')

const initializeTest = async () => {
  try {
    loading.value = true
    error.value = false
    errorType.value = 'unknown'
    
    // 调用 testStore 中的初始化方法
    await testStore.initializeTest()
    retryCount.value = 0 // 重置重试次数
  } catch (e) {
    error.value = true
    
    // 设置错误类型为初始化错误
    errorType.value = 'init'
    
    // 使用我们的错误处理工具，但不显示消息，因为我们在UI中已经显示了错误状态
    handleError(e, {
      context: 'Test Initialization',
      showMessage: false
    })
  } finally {
    loading.value = false
  }
}

const handleRetry = async () => {
  if (retryCount.value >= maxRetries) {
    ElMessage.error('已达到最大重试次数，请刷新页面重新开始')
    return
  }
  
  retryLoading.value = true
  retryCount.value++
  
  try {
    // 使用错误处理包装器，并等待其完成
    await withErrorHandling(async () => {
      await initializeTest()
    }, {
      context: 'Test Retry',
      showMessage: false
    })
  } finally {
    retryLoading.value = false
  }
}

onMounted(async () => {
  try {
    // 确保问题数据已加载并初始化测试
    await initializeTest()
  } catch (error) {
    handleError(error, {
      context: 'Test Initialization',
      showMessage: true,
      message: '无法加载测试问题，请刷新页面重试'
    })
  }
})

// 计算属性
const currentQuestion = computed(() => testStore.currentQuestion)
const currentQuestionIndex = computed(() => testStore.currentQuestionIndex)
const progress = computed(() => testStore.progress)
const canGoPrevious = computed(() => testStore.canGoPrevious)
const totalQuestions = questions.length
const isLastQuestion = computed(() => currentQuestionIndex.value === totalQuestions - 1)

// 响应式数据
const selectedValue = ref(testStore.getCurrentAnswer)

// 监听当前问题变化，更新选中值
watch(currentQuestion, () => {
  selectedValue.value = testStore.getCurrentAnswer
})

// 方法
const progressFormat = (percentage: number) => `${percentage}%`

const handleOptionSelect = (value: number) => {
  testStore.setAnswer(value)
}

const handlePrevious = () => {
  testStore.previousQuestion()
}

const handleNext = () => {
  if (!selectedValue.value) {
    ElMessage.warning('请选择一个选项')
    return
  }
  testStore.nextQuestion()
}

const handleComplete = () => {
  if (!selectedValue.value) {
    ElMessage.warning('请选择一个选项')
    return
  }
  
  // 确保最后一个答案被保存
  testStore.setAnswer(selectedValue.value)
  
  const result = testStore.calculateResult()
  if (result) {
    router.push('/result')
  } else {
    ElMessage.error('计算结果时出错，请重试')
  }
}
</script>

<style scoped lang="scss">
.test-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;

  .test-card {
    .error-container {
      padding: 2rem;
      text-align: center;
      max-width: 600px;
      margin: 0 auto;

      .el-alert {
        margin-bottom: 1.5rem;
      }

      .retry-info {
        margin: 1rem 0;
        color: var(--el-text-color-secondary);
        font-size: 0.9rem;
        
        span {
          background-color: var(--el-fill-color-light);
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          display: inline-block;
        }
      }

      .retry-button {
        min-width: 120px;
        transition: all 0.3s ease;

        &:disabled {
          opacity: 0.7;
        }
      }
    }

    .card-header {
      padding: 0 1rem;
      
      .progress-bar {
        margin: 1rem 0;
      }
    }

    .question-container {
      padding: 1rem;

      .question-number {
        font-size: 1.2rem;
        color: #909399;
        margin-bottom: 1rem;
      }

      .question-text {
        font-size: 1.5rem;
        color: #303133;
        margin-bottom: 2rem;
        line-height: 1.6;
        text-align: center;
      }

      .options-container {
        margin: 2rem 0;
        
        .radio-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;

          :deep(.el-radio-button) {
            width: 100%;
            
            .el-radio-button__inner {
              width: 100%;
              text-align: center;
              border-radius: 4px;
              border: 1px solid #DCDFE6;
              margin-bottom: 0.5rem;
            }

            &:not(:first-child) .el-radio-button__inner {
              border-left: 1px solid #DCDFE6;
            }
          }
        }
      }

      .navigation-buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 2rem;

        .nav-button {
          min-width: 120px;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .test-container {
    margin: 1rem auto;

    .test-card {
      .question-container {
        .question-text {
          font-size: 1.2rem;
        }

        .options-container {
          .radio-group {
            :deep(.el-radio-button__inner) {
              padding: 0.5rem;
            }
          }
        }

        .navigation-buttons {
          .nav-button {
            min-width: 100px;
          }
        }
      }
    }
  }
}
</style>