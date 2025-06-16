# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## 本地运行

### 启动命令
```bash
npm run deploy
```

## 使用 gh-pages 自动部署

### 安装 gh-pages
```bash
npm install gh-pages --save-dev
```

### ​在 package.json 添加部署脚本
```json
"scripts": {
  "deploy": "gh-pages -d dist"
}
```

### ​运行部署
```bash
npm run deploy
```
