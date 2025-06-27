<template>
  <div class="demo-container">
    <h1>Vue Horizontal Scrollbar Demo</h1>

    <div class="scroll-container" ref="scrollContainer">
      <div class="wide-content">
        <div v-for="i in 50" :key="i" class="content-block">
          Block {{ i }}
        </div>
      </div>
    </div>

    <VueHorizontalScrollbar ref="scrollbar" target-selector=".scroll-container" contentSelector=".wide-content" />

    <div class="controls">
      <button @click="scrollTo(0)">Scroll to Start</button>
      <button @click="scrollToMiddle">Scroll to Middle</button>
      <button @click="scrollToEnd">Scroll to End</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VueHorizontalScrollbar } from './index'

const scrollbar = ref<InstanceType<typeof VueHorizontalScrollbar> | null>(null)

function scrollTo(position: number) {
  scrollbar.value?.scrollToPosition(position)
}

function scrollToMiddle() {
  if (scrollbar.value) {
    const middle = scrollbar.value.maxScroll / 2
    scrollTo(middle)
  }
}

function scrollToEnd() {
  scrollbar.value?.scrollToEnd()
}
</script>

<style scoped>
/* 基础滚动容器 */
.basic-scroll-container {
  width: 100%;
  height: 200px;
  overflow: auto;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
}

.basic-scroll-content {
  /* width: 1200px; */
  height: 180px;
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: bold;
}





/* 卡片列表 */
.card-container {
  width: 100%;
  overflow-x: auto;
  padding: 10px 0;
}

.card-list {
  display: flex;
  gap: 16px;
  width: max-content;
  padding: 0 10px;
}

.card-item {
  width: 200px;
  height: 120px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #333;
  flex-shrink: 0;
}

.card-item:nth-child(odd) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.card-item:nth-child(even) {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

/* 控制面板 */
.control-panel {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.control-group {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 12px;
}

.control-group:last-child {
  margin-bottom: 0;
}

.control-group label {
  font-weight: 500;
  min-width: 120px;
}

.control-group input,
.control-group select {
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.control-group button {
  padding: 6px 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.control-group button:hover {
  background: #0056b3;
}

/* 侧边栏布局演示 */
.layout-demo {
  height: 400px;
  display: flex;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.sidebar {
  width: 200px;
  background: #2c3e50;
  color: white;
  padding: 20px;
  transition: width 0.3s ease;
  flex-shrink: 0;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-toggle {
  background: #34495e;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}

.main-content {
  flex: 1;
  overflow: auto;
  background: white;
}

.wide-content {
  width: 4400px;
  height: 100%;
  background: linear-gradient(45deg, #3498db, #e74c3c, #f39c12, #27ae60);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
}

/* 状态显示 */
.status-panel {
  background: #e8f5e8;
  border: 1px solid #c3e6c3;
  border-radius: 4px;
  padding: 12px;
  margin-top: 16px;
  font-family: monospace;
  font-size: 14px;
}

.status-item {
  margin-bottom: 4px;
}

.status-item:last-child {
  margin-bottom: 0;
}

.scroll-container {
  width: 100%;
  height: 200px;
  overflow: auto;
  border: 1px solid #eee;
  margin: 20px 0;
}



.content-block {
  width: 150px;
  height: 150px;
  margin: 10px;
  color: #42b883;
  background: #e6f7f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.controls {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
