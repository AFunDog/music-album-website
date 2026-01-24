<script setup lang="ts">
import { ref } from 'vue'
import VinylRecord from '@/components/VinylRecord.vue'

// const years = Array.from({ length: 31 }, (_, i) => 1980 + i) // 1980 - 2010
const currentYear = ref(1995) // 默认选中一个中间年份，后面可以改成中间值

const albumList = ref([
  {
    title: 'Album Title',
    artist: 'Artist Name',
    year: 1990,
    cover: 'http://p2.music.126.net/0Si70UqzJYtXMogD4U7Vug==/109951169577745503.jpg?param=130y130',
  },
  {
    title: 'Album Title2',
    artist: 'Artist Name2',
    year: 1995,
    cover: 'http://p2.music.126.net/_0rz5AVl1HMq0_FBnRHSbA==/109951170225711695.jpg?param=130y130',
  },
  {
    title: 'Album Title2',
    artist: 'Artist Name2',
    year: 1995,
    cover: 'http://p2.music.126.net/_0rz5AVl1HMq0_FBnRHSbA==/109951170225711695.jpg?param=130y130',
  },
  {
    title: 'Album Title2',
    artist: 'Artist Name2',
    year: 1995,
    cover: 'http://p2.music.126.net/_0rz5AVl1HMq0_FBnRHSbA==/109951170225711695.jpg?param=130y130',
  },
  {
    title: 'Album Title2',
    artist: 'Artist Name2',
    year: 1995,
    cover: 'http://p2.music.126.net/_0rz5AVl1HMq0_FBnRHSbA==/109951170225711695.jpg?param=130y130',
  },
  {
    title: 'Album Title2',
    artist: 'Artist Name2',
    year: 1995,
    cover: 'http://p2.music.126.net/_0rz5AVl1HMq0_FBnRHSbA==/109951170225711695.jpg?param=130y130',
  },
  {
    title: 'Album Title2',
    artist: 'Artist Name2',
    year: 1995,
    cover: 'http://p2.music.126.net/_0rz5AVl1HMq0_FBnRHSbA==/109951170225711695.jpg?param=130y130',
  },
])
</script>

<template>
  <div class="dark:bg-neutral-950 dark:text-neutral-100 flex flex-col w-full h-full">


    <!-- 上部：专辑展示区域 -->
    <section class="px-5 md:px-10 py-6 md:py-12">
      <header class="mb-8 flex items-baseline justify-between">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">黑胶年代 · 黑主题</h1>
          <p class="text-neutral-400 text-sm mt-2">
            当前年份：<span class="dark:text-neutral-100 text-neutral-800 font-semibold">{{ currentYear }}</span>
          </p>
        </div>
        <div class="text-xs text-neutral-500 uppercase tracking-[0.2em]">
          1980 — 2010
        </div>
      </header>

    </section>

    <!-- 下部：黑胶 + 年份选择 + 专辑 -->
    <section class="flex flex-row flex-1 w-full h-full min-w-0 min-h-0">
      <!-- 半张黑胶唱片占位 -->
      <div class="min-w-40 w-full h-full flex-1">
        <div class="w-2/1 h-full max-w-180 overflow-hidden flex items-center justify-end">
          <VinylRecord class="relative left-[-50%]" />
        </div>
      </div>
      <!-- 专辑列表 -->
      <section class="w-full h-full min-h-0 min-w-0 p-4 flex-2">
        <div class="flex flex-col h-full min-w-0 min-h-0 rounded-2xl border border-white/10 backdrop-blur-xl
         shadow-lg shadow-black/20 bg-linear-to-br from-neutral-400/10 to-neutral-900/10 dark:from-neutral-600/40 dark:to-neutral-900/40">
          <h1 class="text-2xl font-semibold p-2 md:p-4">
            专辑列表
          </h1>
          <div class="flex-auto flex flex-col items-stretch w-full h-full gap-y-2 overflow-auto ">

            <!-- 单个专辑卡片 -->
            <div v-for="album in albumList" :key="album.title"
              class="group rounded-xl border dark:border-neutral-700/80 border-neutral-200/80 dark:bg-neutral-900/20 bg-neutral-50/20 dark:hover:bg-neutral-900/70 hover:bg-neutral-50/70 transition overflow-hidden flex flex-row gap-x-4 shadow-md hover:shadow-amber-500/50 duration-300 min-h-20 mx-2 md:mx-4">
              <div class="relative aspect-square overflow-hidden">
                <img :src="album.cover" alt="Album Cover"
                  class="size-24 md:size-28 lg:size-32 object-cover aspect-square" />
                <!-- 播放按钮 -->
                <button class="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-amber-500/90 text-white flex items-center justify-center
                 opacity-0 group-hover:opacity-100 translate-y-2 [group-hover]:translate-y-0
                 transition">
                  ▶
                </button>
              </div>
              <div class="flex-1">
                <h2 class="text-md font-semibold">{{ album.title }}</h2>
                <p class="text-neutral-400">{{ album.artist }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </section>
  </div>
</template>
