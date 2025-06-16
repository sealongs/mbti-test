<template>
  <div class="result-container">
    <el-card class="result-card" v-loading="loading" element-loading-text="加载测试结果中...">
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
          <p>{{ getShortDescription() }}</p>
        </section>

        <!-- 付费内容区域 -->
        <template v-if="paymentStore.isPaid">
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
          <el-button type="primary" @click="retakeTest">重新测试</el-button>
          <el-button @click="goHome">返回首页</el-button>
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

const router = useRouter()
const testStore = useTestStore()

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
        .career-tag {
          margin: 0.5rem 0.5rem 0.5rem 0;
        }
      }

      .action-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 3rem;
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
    }
  }
}
</style>