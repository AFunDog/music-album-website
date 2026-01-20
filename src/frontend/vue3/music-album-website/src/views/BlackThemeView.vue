<script setup lang="ts">
import { ref } from 'vue'
import VinylRecord from '@/components/VinylRecord.vue'

// const years = Array.from({ length: 31 }, (_, i) => 1980 + i) // 1980 - 2010
const currentYear = ref(1995) // 默认选中一个中间年份，后面可以改成中间值
</script>

<template>
  <div class="dark:bg-slate-950 dark:text-slate-100 flex flex-col-reverse md:flex-row w-full h-full">
    <!-- 左侧：黑胶 + 年份选择 -->
    <section class="flex flex-col w-full items-center justify-center px-8 py-12">
      <!-- 半张黑胶唱片占位 -->
      <div class="flex justify-center items-center w-full h-full">
        <VinylRecord />
      </div>
    </section>

    <!-- 右侧：专辑展示区域 -->
    <section class="px-10 py-12">
      <header class="mb-8 flex items-baseline justify-between">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">黑胶年代 · 黑主题</h1>
          <p class="text-slate-400 text-sm mt-2">
            当前年份：<span class="text-slate-100 font-semibold">{{ currentYear }}</span>
          </p>
        </div>
        <div class="text-xs text-slate-500 uppercase tracking-[0.2em]">
          1980 — 2010
        </div>
      </header>

      <!-- 专辑列表占位 -->
      <div class="grid grid-cols-2 gap-6">
        <div
          class="col-span-2 h-40 rounded-xl border border-dashed border-slate-700/80 flex items-center justify-center text-slate-500 text-sm"
        >
          这里将展示 {{ currentYear }} 年代的专辑列表（下一步来做）
        </div>
      </div>
    </section>
  </div>
</template>
