<template>
  <el-container class="app-container">
    <el-header class="app-header">
      <nav class="nav-container">
        <router-link to="/" class="logo">
          <h1>MBTI 性格测试</h1>
        </router-link>
        <div class="nav-links">
          <router-link to="/" class="nav-link">首页</router-link>
          <router-link to="/test" class="nav-link">开始测试</router-link>
        </div>
      </nav>
    </el-header>

    <el-main class="app-main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-main>

    <el-footer class="app-footer">
      <p>© {{ currentYear }} MBTI 性格测试 | 基于科学的人格类型评估工具</p>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style lang="scss">
// 重置默认样式
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

// 全局样式
html, body {
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #2c3e50;
  background-color: #f5f7fa;
}

#app {
  height: 100%;
}

// 应用容器
.app-container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

// 头部样式
.app-header {
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 0;

  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;

    .logo {
      text-decoration: none;
      
      h1 {
        color: #409EFF;
        font-size: 1.5rem;
        margin: 0;
      }
    }

    .nav-links {
      display: flex;
      gap: 20px;

      .nav-link {
        text-decoration: none;
        color: #606266;
        font-size: 1rem;
        padding: 5px 10px;
        border-radius: 4px;
        transition: all 0.3s ease;

        &:hover {
          color: #409EFF;
          background-color: #ecf5ff;
        }

        &.router-link-active {
          color: #409EFF;
          font-weight: 500;
        }
      }
    }
  }
}

// 主要内容区域
.app-main {
  flex: 1;
  padding: 20px;
  background-color: #f5f7fa;
}

// 页脚样式
.app-footer {
  background-color: #fff;
  text-align: center;
  padding: 20px;
  color: #909399;
  font-size: 0.9rem;
}

// 路由过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// 响应式设计
@media (max-width: 768px) {
  .app-header {
    .nav-container {
      padding: 0 10px;

      .logo h1 {
        font-size: 1.2rem;
      }

      .nav-links {
        gap: 10px;

        .nav-link {
          font-size: 0.9rem;
          padding: 4px 8px;
        }
      }
    }
  }

  .app-main {
    padding: 10px;
  }

  .app-footer {
    padding: 15px;
    font-size: 0.8rem;
  }
}
</style>