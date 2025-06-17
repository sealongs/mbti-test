<template>
  <div class="result-container">
    <el-card class="result-card" v-loading="loading" element-loading-text="加载测试结果中...">
      <!-- 支付弹窗组件 (已注释) -->
      <!-- <PaymentModal 
        v-model="showPaymentModal" 
        @payment-success="handlePaymentSuccess"
      /> -->
      <template #header>
        <div class="card-header">
          <h1>你的MBTI类型是：{{ result?.type }}</h1>
          <h2 v-if="personalityType">{{ personalityType.name }} ({{ personalityType.nickname }})</h2>
        </div>
      </template>

      <div v-if="personalityType" class="content">
        <!-- 免费内容区域 -->
        <section class="description-section free-content">
          <h3>类型简介</h3>
          <p>{{ shortDescription }}</p>
        </section>

        <!-- 付费内容区域 -->
        <template v-if="isPaid">
        <section class="description-section">
            <h3>详细类型描述</h3>
            <p>{{ personalityType.description }}</p>
          </section>

          <section class="dimensions-section">
            <h3>维度得分</h3>
            <div class="dimension">
              <div class="dimension-labels">
                <span>内向 (I)</span>
                <span>外向 (E)</span>
              </div>
              <el-progress 
                :percentage="result?.ei || 0" 
                :format="() => `${result?.ei || 0}%`"
                :color="getProgressColor(result?.ei || 0)"
              />
              <div class="dimension-explanation">
                {{ result?.ei && result.ei > 50 ? '你更倾向于外向 (E)' : '你更倾向于内向 (I)' }}
              </div>
            </div>

            <div class="dimension">
              <div class="dimension-labels">
                <span>感觉 (S)</span>
                <span>直觉 (N)</span>
              </div>
              <el-progress 
                :percentage="result?.sn || 0" 
                :format="() => `${result?.sn || 0}%`"
                :color="getProgressColor(result?.sn || 0)"
              />
              <div class="dimension-explanation">
                {{ result?.sn && result.sn > 50 ? '你更倾向于感觉 (S)' : '你更倾向于直觉 (N)' }}
              </div>
            </div>

            <div class="dimension">
              <div class="dimension-labels">
                <span>情感 (F)</span>
                <span>思考 (T)</span>
              </div>
              <el-progress 
                :percentage="result?.tf || 0" 
                :format="() => `${result?.tf || 0}%`"
                :color="getProgressColor(result?.tf || 0)"
              />
              <div class="dimension-explanation">
                {{ result?.tf && result.tf > 50 ? '你更倾向于思考 (T)' : '你更倾向于情感 (F)' }}
              </div>
            </div>

            <div class="dimension">
              <div class="dimension-labels">
                <span>感知 (P)</span>
                <span>判断 (J)</span>
              </div>
              <el-progress 
                :percentage="result?.jp || 0" 
                :format="() => `${result?.jp || 0}%`"
                :color="getProgressColor(result?.jp || 0)"
              />
              <div class="dimension-explanation">
                {{ result?.jp && result.jp > 50 ? '你更倾向于判断 (J)' : '你更倾向于感知 (P)' }}
              </div>
            </div>
          </section>

          <el-row :gutter="20" class="strengths-weaknesses">
            <el-col :xs="24" :sm="12">
              <section class="strengths-section">
                <h3>优势</h3>
                <ul>
                  <li v-for="(strength, index) in personalityType.strengths" :key="index">
                    {{ strength }}
                  </li>
                </ul>
              </section>
            </el-col>
            
            <el-col :xs="24" :sm="12">
              <section class="weaknesses-section">
                <h3>劣势</h3>
                <ul>
                  <li v-for="(weakness, index) in personalityType.weaknesses" :key="index">
                    {{ weakness }}
                  </li>
                </ul>
              </section>
            </el-col>
          </el-row>

          <section class="careers-section">
            <h3>适合的职业</h3>
            <el-tag 
              v-for="(career, index) in personalityType.careerPaths" 
              :key="index"
              class="career-tag"
            >
              {{ career }}
            </el-tag>
          </section>

          <div class="action-buttons">
            <el-button type="success" @click="saveImage">保存结果图片</el-button>
            <el-button type="primary" @click="shareResult">分享结果</el-button>
            <el-button @click="retakeTest">重新测试</el-button>
            <el-button @click="goHome">返回首页</el-button>
          </div>
        </template>

        <!-- 未付费时的锁定内容提示 -->
        <div v-else class="locked-content">
          <div class="lock-icon">
            <el-icon :size="64"><Lock /></el-icon>
          </div>
          <h3>解锁完整测试报告</h3>
          <p>完整报告包含详细的性格描述、维度得分分析、优势劣势分析以及适合您的职业推荐。</p>
          <el-button type="primary" @click="isPaid = true">立即解锁</el-button>
          
          <div class="action-buttons">
            <el-button @click="retakeTest">重新测试</el-button>
            <el-button @click="goHome">返回首页</el-button>
          </div>
        </div>
      </div>

      <div v-else class="no-result">
        <el-alert
          title="未找到测试结果"
          type="warning"
          description="您可能尚未完成测试或测试数据已丢失"
          show-icon
          :closable="false"
          style="margin-bottom: 2rem;"
        />
        <div class="action-buttons">
          <el-button type="primary" @click="router.push('/test')">开始测试</el-button>
          <el-button @click="goHome">返回首页</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTestStore } from '../stores/testStore'
import { personalityTypes } from '../data/personalityTypes'
import { ElMessage } from 'element-plus'
import { handleError, withErrorHandling } from '../utils/errorHandler'
import html2canvas from 'html2canvas'

const router = useRouter()
const testStore = useTestStore()

// 支付相关状态 (已注释)
// const showPaymentModal = ref(false)
const isPaid = computed(() => true) // 直接设置为true，跳过支付

// 加载状态和错误处理
const loading = ref(true)
const error = ref(false)

// 初始化加载结果
const initializeResult = async () => {
  try {
    loading.value = true
    error.value = false
    // 模拟加载延迟
    await new Promise(resolve => setTimeout(resolve, 800))
    
    if (!testStore.result) {
      error.value = true
      ElMessage.warning('未找到测试结果，请重新开始测试')
      setTimeout(() => {
        router.push('/')
      }, 2000)
    }
  } catch (e) {
    error.value = true
    
    // 使用我们的错误处理工具
    handleError(e, {
      context: 'Result Initialization',
      showMessage: true,
      showNotification: false
    })
  } finally {
    loading.value = false
  }
}

// 使用错误处理包装器包装初始化函数
const safeInitializeResult = () => {
  withErrorHandling(initializeResult, {
    context: 'Result View',
    showMessage: true
  })
}

onMounted(() => {
  safeInitializeResult()
})

// 获取测试结果
const result = computed(() => testStore.result)

// 获取人格类型详情
const personalityType = computed(() => {
  if (!result.value?.type) return null
  return personalityTypes[result.value.type]
})

// 获取简短描述（作为计算属性）
const shortDescription = computed(() => {
  if (!personalityType.value?.description) return ''
  const fullDesc = personalityType.value.description
  // 返回第一句话或前100个字符
  const firstSentence = fullDesc.split('。')[0] + '。'
  return firstSentence.length > 100 ? firstSentence.slice(0, 100) + '...' : firstSentence
})

// 根据百分比获取进度条颜色
const getProgressColor = (percentage: number) => {
  if (percentage < 40) return '#409EFF' // 蓝色
  if (percentage < 60) return '#E6A23C' // 黄色
  return '#67C23A' // 绿色
}

// 重新测试
const retakeTest = () => {
  testStore.resetTest()
  router.push('/test')
}

// 返回首页
const goHome = () => {
  router.push('/')
}

// 保存结果图片
const saveImage = async () => {
  try {
    const element = document.querySelector('.result-card') as HTMLElement
    if (!element) return
    
    // 临时移除按钮区域，避免出现在截图中
    const actionButtons = document.querySelector('.action-buttons') as HTMLElement
    const actionButtonsDisplay = actionButtons?.style.display
    if (actionButtons) actionButtons.style.display = 'none'
    
    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: 2, // 提高图片质量
      backgroundColor: '#ffffff'
    })
    
    // 恢复按钮区域
    if (actionButtons) actionButtons.style.display = actionButtonsDisplay || ''
    
    const link = document.createElement('a')
    link.download = `MBTI-${result.value?.type}-测试结果.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
    
    ElMessage.success('结果图片已保存')
  } catch (error) {
    console.error('保存图片失败:', error)
    ElMessage.error('保存图片失败，请重试')
  }
}

// 分享结果
const shareResult = () => {
  if (!personalityType.value || !result.value) return
  
  const shareText = `我的MBTI性格类型是${result.value.type}(${personalityType.value.name})，快来测测你的吧！https://sealongs.github.io/mbti-test/`
  
  navigator.clipboard.writeText(shareText)
    .then(() => ElMessage.success('分享文本已复制到剪贴板'))
    .catch(() => ElMessage.error('复制失败，请手动分享'))
}

// 处理支付成功
// const handlePaymentSuccess = () => {
//   ElMessage.success('支付成功，已解锁完整报告！')
//   showPaymentModal.value = false
// }
</script>

<style scoped lang="scss">
.result-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;

  .result-card {
    .card-header {
      text-align: center;
      
      h1 {
        margin: 0;
        font-size: 2rem;
        color: #303133;
      }

      h2 {
        margin: 0.5rem 0 0;
        font-size: 1.5rem;
        color: #409EFF;
      }
    }

    .content {
      padding: 1rem 0;

      section {
        margin-bottom: 2rem;

        h3 {
          color: #409EFF;
          margin-bottom: 1rem;
          border-bottom: 1px solid #EBEEF5;
          padding-bottom: 0.5rem;
        }

        p {
          line-height: 1.6;
          color: #606266;
        }
      }

      // 免费内容区域样式
      .free-content {
        padding: 1rem;
        border-radius: 8px;
        background-color: #ecf5ff;
        border-left: 4px solid #409eff;
      }

      // 锁定内容区域样式
      .locked-content {
        background-color: #f5f7fa;
        border-radius: 8px;
        padding: 2rem 1rem;
        text-align: center;
        margin: 2rem 0;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        
        .lock-icon {
          margin-bottom: 1rem;
          color: #909399;
        }
        
        h3 {
          font-size: 1.5rem;
          color: #303133;
          margin-bottom: 1rem;
          border-bottom: none;
        }
        
        p {
          color: #606266;
          margin-bottom: 1.5rem;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }

        .action-buttons {
          margin-top: 1.5rem;
        }
      }

      .dimensions-section {
        .dimension {
          margin-bottom: 1.5rem;

          .dimension-labels {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
            color: #606266;
            font-size: 0.9rem;
          }
          
          .dimension-explanation {
            margin-top: 0.5rem;
            text-align: center;
            color: #409EFF;
            font-size: 0.9rem;
            font-weight: 500;
          }
        }
      }

      .strengths-weaknesses {
        ul {
          padding-left: 1.5rem;
          
          li {
            margin: 0.5rem 0;
            color: #606266;
          }
        }
      }

      .careers-section {
        overflow: visible !important;
        
        .career-tag {
          margin: 0.5rem 0.5rem 0.5rem 0;
          display: inline-block !important;
          opacity: 1 !important;
          visibility: visible !important;
          position: relative !important;
          z-index: 9999 !important;
        }
      }

      .action-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 3rem;
        flex-wrap: wrap;
        
        .el-button {
          min-width: 160px;
          margin: 0.5rem;
        }
        
        .el-button--success,
        .el-button--primary {
          flex: 1;
          max-width: 200px;
        }
      }
    }

    .no-result {
      padding: 3rem 1rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;

      .el-alert {
        width: 100%;
        max-width: 500px;
      }

      .action-buttons {
        margin-top: 1rem;
        display: flex;
        gap: 1rem;
        justify-content: center;
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .result-container {
    margin: 1rem auto;
    
    .result-card {
      .card-header {
        h1 {
          font-size: 1.5rem;
        }
        
        h2 {
          font-size: 1.2rem;
        }
      }

      .content {
        .action-buttons {
          flex-direction: column;
          gap: 0.5rem;
          
          .el-button {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>