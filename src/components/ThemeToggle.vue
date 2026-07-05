<script setup lang="ts">
import { onMounted, ref } from 'vue';

// 'light' | 'dark'。未保存時は OS 設定（prefers-color-scheme）に従う
const theme = ref<'light' | 'dark'>('light');

onMounted(() => {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') {
    theme.value = saved;
  } else {
    theme.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
});

function toggle() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme.value;
  localStorage.setItem('theme', theme.value);
}
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-label="theme === 'dark' ? 'ライトモードに切り替え' : 'ダークモードに切り替え'"
    @click="toggle"
  >
    <span aria-hidden="true">{{ theme === 'dark' ? '☀️' : '🌙' }}</span>
  </button>
</template>

<style scoped>
.theme-toggle {
  background: none;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
}
</style>
