<script setup lang="ts">
import { computed, ref } from 'vue'

// 🎛️ 可调节参数
const whiteKeyCount = 33
const whiteKeyHeight = 56
const whiteKeyWidth = 364
const whiteKeyGap = 1

const blackKeyHeight = Math.round(whiteKeyHeight * 0.6)
const blackKeyWidth = Math.round(whiteKeyWidth * 0.6)

// 年份数组（1980–2010）
const years = computed<number[]>(() =>
  Array.from({ length: 31 }, (_, i: number) => 1980 + i)
)

// 白键数组
const whiteKeys = computed<number[]>(() =>
  Array.from({ length: whiteKeyCount }, (_, i: number) => i)
)

// 黑键数组
const blackKeys = computed<number[]>(() =>
  Array.from({ length: whiteKeyCount - 1 }, (_, i: number) => i)
)

// 黑键 top 偏移量（插在两个白键之间）
const blackKeyTop = (index: number): number => {
  const spacing = whiteKeyHeight + whiteKeyGap
  return (index + 1) * spacing - whiteKeyGap / 2 - blackKeyHeight / 2
}

// 当前选中的年份索引（0–30），null 表示未选中
const selectedIndex = ref<number | null>(null)

const selectYear = (index: number) => {
  selectedIndex.value = index === selectedIndex.value ? null : index
}
</script>

<template>
  <div class="w-full h-full flex items-center justify-center bg-white/10 backdrop-blur-md rounded-xl">
    <!-- 滚动容器 -->
    <div
      class="relative overflow-y-auto scrollbar-hide"
      :style="{
        height: '100%',
        maxHeight: '100%',
        padding: '8px'
      }"
    >
      <!-- 白键排列 -->
      <div class="flex flex-col relative" :style="{ gap: `${whiteKeyGap}px` }">
        <!-- 白键 -->
        <div
          v-for="index in whiteKeys"
          :key="'white-' + index"
          :class="[
            'group relative bg-white border border-gray-300 transition-all ease-in-out rounded-xs',
            selectedIndex === index - 1 ? 'outline-2 outline-blue-600 -outline-offset-2' : '',
            'hover:bg-white/95 hover:translate-x-0.5 hover:scale-x-[0.992]'
          ]"
          :style="{
            height: `${whiteKeyHeight}px`,
            width: `${whiteKeyWidth}px`,
            transitionDuration: '400ms',
            boxShadow: `
              inset 2px 0 10px rgba(255,255,255,0.95),
              inset -1px 0 3px rgba(0,0,0,0.03),
              1px 0 2px rgba(0,0,0,0.12)
            `
          }"
        >
          <!-- 白键高光 -->
          <div
            class="absolute left-0 bg-white/60 opacity-80"
            :style="{ top: '3px', height: '4px', width: '100%' }"
          ></div>

          <!-- 选中高亮边框 -->
          <div
            v-if="selectedIndex === index - 1"
            class="absolute inset-0.5 rounded-0.5 pointer-events-none z-10
                   bg-linear-to-r from-blue-400 via-sky-400 to-indigo-400 opacity-80
                   animate-pulse transition-all duration-500"
          ></div>


          <!-- 年份数字（跳过第 0 和第 32 个） -->
          <div
            v-if="index > 0 && index < whiteKeyCount - 1"
            class="absolute top-1/2 right-3 -translate-y-1/2 text-4xl text-gray-400 opacity-60
                   hover:text-blue-500 hover:opacity-100 hover:scale-125
                   transition-all ease-in-out select-none cursor-pointer text-right"
            :style="{ transitionDuration: '400ms' }"
            @click="selectYear(index - 1)"
          >
            {{ years[index - 1] }}
          </div>
        </div>

        <!-- 黑键容器 -->
        <div class="absolute top-0 left-0 z-20">
          <div
            v-for="index in blackKeys"
            :key="'black-' + index"
            class="absolute"
            :style="{ top: `${blackKeyTop(index)}px` }"
          >
            <div
              class="relative bg-zinc-950 border border-zinc-700 overflow-hidden"
              :style="{
                height: `${blackKeyHeight}px`,
                width: `${blackKeyWidth}px`,
                borderRadius: '2px',
                boxShadow: `
                  3px 0 8px rgba(0,0,0,0.5),
                  inset 1px 0 1px rgba(255,255,255,0.08),
                  inset -1px 0 2px rgba(0,0,0,0.2)
                `
              }"
            >
              <!-- 左侧内阴影 -->
              <div
                class="absolute bg-zinc-800/50"
                :style="{ left: 0, height: '100%', width: '4px', borderTopLeftRadius: '1px' }"
              ></div>
          
              <!-- 右侧梯形阴影 -->
              <div
                class="absolute right-0 top-0 h-full w-4 bg-linear-to-l from-zinc-900/60 to-transparent transform skew-x-12"
              ></div>
          
              <!-- 顶部高光 -->
              <div
                class="absolute top-0 left-0 w-full h-0.75 bg-white/10"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 平滑动画 */
* {
  transition-property: transform, box-shadow, background-color, border-color, opacity, color;
  transition-timing-function: ease-in-out;
}

/* 隐藏滚动条（webkit） */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none; /* Firefox */
}

/* 禁止选中 */
*::selection {
  background: transparent;
}
</style>
