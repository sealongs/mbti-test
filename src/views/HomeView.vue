<template>
  <div class="home-container">
    <el-row class="hero-section" justify="center" align="middle">
      <el-col :span="24" :md="12" class="hero-content">
        <h1>探索你的性格类型</h1>
        <p class="subtitle">通过MBTI性格测试，了解你的独特个性</p>
        <el-button type="primary" size="large" @click="startTest">开始测试</el-button>
      </el-col>
    </el-row>

    <el-row class="info-section">
      <el-col :span="24">
        <h2>什么是MBTI？</h2>
        <p>MBTI（迈尔斯-布里格斯类型指标）是一个帮助人们更好地理解自己和他人的工具。它基于荣格的人格类型理论，通过评估人们在四个维度上的倾向来识别16种不同的性格类型。</p>
      </el-col>
    </el-row>

    <el-row class="dimensions-section" :gutter="20">
      <el-col :span="24">
        <h2>四个维度</h2>
      </el-col>
      <el-col :span="24" :md="12" :lg="6">
        <el-card class="dimension-card">
          <h3>外向 (E) vs 内向 (I)</h3>
          <p>你倾向于从外部世界还是内部世界获取能量？</p>
        </el-card>
      </el-col>
      <el-col :span="24" :md="12" :lg="6">
        <el-card class="dimension-card">
          <h3>感觉 (S) vs 直觉 (N)</h3>
          <p>你更倾向于关注具体事实还是可能性和意义？</p>
        </el-card>
      </el-col>
      <el-col :span="24" :md="12" :lg="6">
        <el-card class="dimension-card">
          <h3>思考 (T) vs 情感 (F)</h3>
          <p>你做决定时更依赖逻辑还是个人价值观？</p>
        </el-card>
      </el-col>
      <el-col :span="24" :md="12" :lg="6">
        <el-card class="dimension-card">
          <h3>判断 (J) vs 感知 (P)</h3>
          <p>你更喜欢有计划和秩序还是灵活和适应？</p>
        </el-card>
      </el-col>
    </el-row>

    <el-row class="features-section">
      <el-col :span="24">
        <h2>测试特点</h2>
        <ul class="features-list">
          <li>
            <el-icon><Clock /></el-icon>
            <span>约45分钟完成</span>
          </li>
          <li>
            <el-icon><DataAnalysis /></el-icon>
            <span>科学的评估方法</span>
          </li>
          <li>
            <el-icon><Document /></el-icon>
            <span>详细的结果分析</span>
          </li>
          <li>
            <el-icon><Lock /></el-icon>
            <span>完全免费</span>
          </li>
        </ul>
      </el-col>
    </el-row>

    <el-row class="cta-section" justify="center">
      <el-col :span="24" class="text-center">
        <h2>准备好开始了吗？</h2>
        <p>发现真实的自己，了解你的性格特质</p>
        <el-button type="primary" size="large" @click="startTest">立即开始测试</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { Clock, DataAnalysis, Document, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useTestStore } from '../stores/testStore'

const router = useRouter()
const testStore = useTestStore()

const startTest = async () => {
  try {
    await testStore.initializeTest() // 先初始化测试
    testStore.resetTest() // 然后重置测试状态
    router.push('/test')
  } catch (error) {
    console.error('Failed to start test:', error)
    // 可以在这里添加用户通知逻辑
  }
}
</script>

<style scoped lang="scss">
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  .hero-section {
    min-height: 400px;
    text-align: center;
    padding: 4rem 0;
    background: linear-gradient(135deg, #e0f2ff 0%, #f5f7fa 100%);
    border-radius: 8px;
    margin-bottom: 3rem;

    .hero-content {
      h1 {
        font-size: 2.5rem;
        color: #303133;
        margin-bottom: 1rem;
      }

      .subtitle {
        font-size: 1.2rem;
        color: #606266;
        margin-bottom: 2rem;
      }
    }
  }

  .info-section {
    text-align: center;
    margin-bottom: 3rem;

    h2 {
      color: #303133;
      margin-bottom: 1rem;
    }

    p {
      color: #606266;
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.6;
    }
  }

  .dimensions-section {
    margin-bottom: 3rem;

    h2 {
      text-align: center;
      margin-bottom: 2rem;
    }

    .dimension-card {
      height: 100%;
      margin-bottom: 1rem;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      h3 {
        color: #409EFF;
        margin-bottom: 1rem;
        font-size: 1.1rem;
      }

      p {
        color: #606266;
        line-height: 1.5;
      }
    }
  }

  .features-section {
    margin-bottom: 3rem;

    h2 {
      text-align: center;
      margin-bottom: 2rem;
    }

    .features-list {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      padding: 0;

      li {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        color: #606266;
        font-size: 1.1rem;

        .el-icon {
          color: #409EFF;
          font-size: 1.5rem;
        }
      }
    }
  }

  .cta-section {
    text-align: center;
    padding: 3rem 0;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    h2 {
      color: #303133;
      margin-bottom: 1rem;
    }

    p {
      color: #606266;
      margin-bottom: 2rem;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .home-container {
    padding: 0 10px;

    .hero-section {
      min-height: 300px;
      padding: 2rem 0;

      .hero-content {
        h1 {
          font-size: 2rem;
        }

        .subtitle {
          font-size: 1rem;
        }
      }
    }

    .features-section {
      .features-list {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;

        li {
          font-size: 1rem;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .home-container {
    .features-section {
      .features-list {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>