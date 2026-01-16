<script setup lang="ts">
import { ref } from 'vue'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Music
} from 'lucide-vue-next'

const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(240) // 4分钟
const volume = ref(70)

const trackInfo = {
  title: 'Midnight Dreams',
  artist: 'Digital Aurora',
  album: 'Lunar Echo'
}

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
    <!-- 播放器容器 -->
    <div class="w-full max-w-md">
      <!-- 背景装饰 -->
      <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-3xl -z-10"></div>

      <!-- 播放器卡片 -->
      <div class="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl hover:shadow-cyan-500/20 transition-shadow duration-300">
        
        <!-- 专辑封面区域 -->
        <div class="mb-8">
          <div class="relative bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl aspect-square flex items-center justify-center mb-6 shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300">
            <Music class="w-24 h-24 text-white opacity-80" />
          </div>
        </div>

        <!-- 歌曲信息 -->
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-white mb-2">{{ trackInfo.title }}</h2>
          <p class="text-slate-400 text-sm mb-1">{{ trackInfo.artist }}</p>
          <p class="text-slate-500 text-xs">{{ trackInfo.album }}</p>
        </div>

        <!-- 进度条 -->
        <div class="mb-8 space-y-2">
          <div class="bg-slate-700/50 rounded-full h-1.5 overflow-hidden cursor-pointer hover:h-2 transition-all duration-200">
            <div
              class="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-300"
              :style="{ width: (currentTime / duration) * 100 + '%' }"
            ></div>
          </div>
          <div class="flex justify-between text-xs text-slate-400 font-medium">
            <span>{{ formatTime(currentTime) }}</span>
            <span>{{ formatTime(duration) }}</span>
          </div>
        </div>

        <!-- 控制按钮 -->
        <div class="flex items-center justify-center gap-4 mb-8">
          <!-- 上一曲 -->
          <button
            class="p-2 rounded-full hover:bg-slate-700/50 text-slate-400 hover:text-cyan-400 transition-all duration-200 hover:scale-110"
          >
            <SkipBack class="w-6 h-6" />
          </button>

          <!-- 播放/暂停 -->
          <button
            @click="togglePlay"
            class="p-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg hover:shadow-cyan-500/50 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <Play v-if="!isPlaying" class="w-8 h-8" />
            <Pause v-else class="w-8 h-8" />
          </button>

          <!-- 下一曲 -->
          <button
            class="p-2 rounded-full hover:bg-slate-700/50 text-slate-400 hover:text-cyan-400 transition-all duration-200 hover:scale-110"
          >
            <SkipForward class="w-6 h-6" />
          </button>
        </div>

        <!-- 音量控制 -->
        <div class="flex items-center gap-3">
          <Volume2 class="w-5 h-5 text-slate-400" />
          <div class="flex-1 bg-slate-700/50 rounded-full h-1 overflow-hidden">
            <div
              class="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-300"
              :style="{ width: volume + '%' }"
            ></div>
          </div>
          <span class="text-xs text-slate-400 w-8 text-right">{{ volume }}%</span>
        </div>
      </div>

      <!-- 底部指示 -->
      <div class="text-center mt-8 text-slate-500 text-sm">
        <div v-if="isPlaying" class="flex items-center justify-center gap-1">
          <span>▌</span>
          <span>▌</span>
          <span class="opacity-60">▌</span>
          <span class="text-slate-600">正在播放</span>
        </div>
        <div v-else class="text-slate-600">暂停中</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 平滑过渡 */
:deep(*) {
  @apply transition-colors duration-200;
}
</style>
