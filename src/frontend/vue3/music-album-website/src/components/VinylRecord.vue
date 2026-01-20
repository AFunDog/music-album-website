<script setup lang="ts">
import { cn } from '@/lib/utils';
import { ref, computed } from 'vue'

const props = withDefaults(defineProps<{
  // 年份列表
  years?: string[],
  // 可见年份数
  visibleYearCount?: number,
}>(), {
  years: () => ["1970", "1980", "1990", "2000", "2010"],
  visibleYearCount: 3
})


// 当前年份索引（指向中间那个）
const currentIndex = ref(0)

// 当前显示的年份（滑动窗口）
const visibleYears = computed(() => {
  const start = currentIndex.value - Math.floor(props.visibleYearCount / 2)
  const res = []
  for (let i = 0; i < props.visibleYearCount; i++) {
    res.push(props.years[(i + (start % props.years.length) + props.years.length) % props.years.length])
  }
  return res
})



// 滚轮控制
function handleScroll(event: WheelEvent) {
  if (event.deltaY > 0) {
    // 向下滚动
    currentIndex.value--
  } else {
    // 向上滚动
    currentIndex.value++
  }
}
</script>


<template>
  <div class="aspect-square w-full max-h-128 max-w-lg flex justify-center items-center text-slate-100"
    @wheel.prevent="handleScroll">
    <!-- 黑胶唱片 -->
    <div class="w-full h-full relative rounded-full vinyl">
      <div class="aspect-square absolute w-full h-full rounded-full grooves"></div>
      <div class="aspect-square absolute inset-0 rounded-full gold-wave"></div>
      <div class="aspect-square absolute inset-[35%] rounded-full z-10 flex justify-center items-center vinyl-center">
        <div class="aspect-square w-[22%] h-[22%] rounded-full  vinyl-center-inner"></div>
      </div>

      <!-- 年份标签容器 -->
      <div :class="cn('absolute top-[50%] left-[50%] -translate-1/2 select-none z-20 w-full h-full year-container')">
        <!-- 过渡效果 -->
        <TransitionGroup name="year-slide">
          <!-- 标签定位容器 -->
          <div v-for="(year, i) in visibleYears" :key="year"
            :class="cn('transition-all opacity-60 absolute top-[50%] left-[50%] -translate-1/2 w-2/3 h-4 year-text-container text-md', i === Math.floor(visibleYears.length / 2) ? 'opacity-100 text-[#FFD700] font-bold active text-xl' : '')"
            :style="{ '--i': years.indexOf(year!) }">
            <!-- 标签 -->
            <div
              :class="cn('absolute left-full top-1/2 -translate-1/2', i === Math.floor(visibleYears.length / 2) ? '' : '')">
              {{ year }}
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>


<style scoped>
.vinyl {
  background: radial-gradient(circle at 50% 50%, #0a0a0a 0%, #000 70%, #000 100%);
  border: 2px solid #b08d57;
  box-shadow: 0 0 20px rgba(176, 141, 87, 0.25), inset 0 0 25px rgba(255, 255, 255, 0.08);
  overflow: hidden;
  transform-origin: center center;



  transition: all 0.5s ease;
}

.grooves {
  background: repeating-radial-gradient(circle,
      rgba(255, 255, 255, 0.04) 0px,
      rgba(255, 255, 255, 0.04) 2px,
      rgba(0, 0, 0, 0.9) 4px,
      rgba(0, 0, 0, 0.9) 6px);
  opacity: 0.55;
  mix-blend-mode: screen;
}

.gold-wave {
  background: conic-gradient(from 120deg,
      transparent 0deg,
      rgba(255, 215, 130, 0.15) 20deg,
      transparent 40deg,
      transparent 140deg,
      rgba(255, 215, 130, 0.1) 160deg,
      transparent 200deg);
  mix-blend-mode: screen;
  opacity: 0.8;

}

.vinyl-center {
  background: radial-gradient(circle at 30% 20%, #f7e7b7, #b08d57 60%, #8c6b3f 100%);
  box-shadow: 0 0 12px rgba(176, 141, 87, 0.7);

}

.vinyl-center-inner {

  background: #111;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.8);
}

.year-container {
  rotate: v-bind('currentIndex * (360 / years.length) + "deg"');
  transition: all 0.5s ease;
}

.year-text-container {
  rotate: calc(var(--i) * v-bind('-360 / years.length + "deg"'));

  &.active {
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  }
}

.list-move,
.year-slide-enter-active,
.year-slide-leave-active {
  transition: all 0.5s ease;
}

.year-slide-enter-from {
  /* transform: translateY(-32px); */
  /* rotate: calc(var(--i) * -30deg); */
  opacity: 0;
}

.year-slide-leave-to {
  /* rotate: 0deg; */
  opacity: 0;
}
</style>
