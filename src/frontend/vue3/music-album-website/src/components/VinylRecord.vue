<template>
  <div class="vinyl-wrapper" @wheel.prevent="handleScroll">
    <!-- 黑胶唱片 -->
    <div class="vinyl" :style="{ transform: `rotate(${rotation}deg)` }">
      <div class="grooves"></div>
      <div class="gold-wave"></div>
      <div class="vinyl-center">
        <div class="vinyl-center-inner"></div>
      </div>

      <!-- 年份标签容器 -->
      <div class="year-display">
        <div
          v-for="(year, i) in visibleYears"
          :key="year"
          class="year-text"
          :style="getYearStyle(angleSlots[i])"
        >
          {{ year }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 所有年份
const years = Array.from({ length: 31 }, (_, i) => 1980 + i)

// 每次旋转的角度（60° = 1 年）
const anglePerYear = 60

// 当前旋转角度
const rotation = ref(0)

// 当前年份索引（指向中间那个）
const currentIndex = ref(0)

// 三个角度槽位：上、中、下（固定角度）
const angleSlots = [-60, 0, 60]

// 当前显示的三个年份（滑动窗口）
const visibleYears = ref([
  years[(currentIndex.value - 1 + years.length) % years.length],
  years[currentIndex.value],
  years[(currentIndex.value + 1) % years.length]
])

// 滚动参数
const scrollSensitivity = 6.5
const inertiaFactor = 0.95
let currentVelocity = 0
let snapTimeout = null
let animationFrameId = null

// 获取标签样式（固定角度 + 实时高亮判断）
function getYearStyle(angle) {
  const currentAngle = (rotation.value % 360 + 360) % 360
  const labelAngle = (angle + currentAngle + 360) % 360
  const diff = Math.min(Math.abs(labelAngle), 360 - Math.abs(labelAngle))
  const isActive = diff < anglePerYear / 2

  return {
    transform: `rotate(${angle}deg) translateX(40vh) rotate(${-angle}deg)`,
    color: isActive ? '#FFD700' : 'rgba(255, 255, 255, 0.6)',
    zIndex: isActive ? 3 : 2,
    fontSize: isActive ? '2.4rem' : '2rem',
    fontWeight: 'bold',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transformOrigin: 'left center',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    textShadow: '0 0 5px rgba(0, 0, 0, 0.8)',
    transition: 'color 0.3s ease, font-size 0.3s ease'
  }
}

// 滚轮控制
function handleScroll(event) {
  const delta = event.deltaY > 0 ? 1 : -1
  currentVelocity += delta * scrollSensitivity * 0.5
  rotation.value += currentVelocity

  if (snapTimeout) clearTimeout(snapTimeout)
  if (animationFrameId) cancelAnimationFrame(animationFrameId)

  runInertiaAnimation()

  snapTimeout = setTimeout(() => {
    currentVelocity = 0
    snapToNearestYear()
  }, 300)
}

// 惯性动画
function runInertiaAnimation() {
  if (Math.abs(currentVelocity) < 0.01) return
  rotation.value += currentVelocity
  currentVelocity *= inertiaFactor
  animationFrameId = requestAnimationFrame(runInertiaAnimation)
}

// 吸附到最近年份，并更新 visibleYears
function snapToNearestYear() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }

  const snappedSteps = Math.round(rotation.value / anglePerYear)
  const targetRotation = snappedSteps * anglePerYear

  const animateSnap = () => {
    const diff = targetRotation - rotation.value
    if (Math.abs(diff) < 0.1) {
      rotation.value = targetRotation
      updateVisibleYears(snappedSteps)
      return
    }
    rotation.value += diff * 0.2
    animationFrameId = requestAnimationFrame(animateSnap)
  }

  animateSnap()
}

// 更新当前年份索引和可见年份窗口
function updateVisibleYears(snappedSteps) {
  const index = (snappedSteps % years.length + years.length) % years.length
  currentIndex.value = index
  visibleYears.value = [
    years[(index - 1 + years.length) % years.length],
    years[index],
    years[(index + 1) % years.length]
  ]
}
</script>

<style scoped>
.vinyl-wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-color: #000;
}

.vinyl {
  width: 90vh;
  height: 90vh;
  border-radius: 50%;
  position: relative;
  background: radial-gradient(circle at 50% 50%, #0a0a0a 0%, #000 70%, #000 100%);
  border: 2px solid #b08d57;
  box-shadow: 0 0 20px rgba(176, 141, 87, 0.25), inset 0 0 25px rgba(255, 255, 255, 0.08);
  overflow: hidden;
  transform-origin: center center;
}

.grooves {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: repeating-radial-gradient(
    circle,
    rgba(255, 255, 255, 0.04) 0px,
    rgba(255, 255, 255, 0.04) 2px,
    rgba(0, 0, 0, 0.9) 4px,
    rgba(0, 0, 0, 0.9) 6px
  );
  opacity: 0.55;
  mix-blend-mode: screen;
}

.gold-wave {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(
    from 120deg,
    transparent 0deg,
    rgba(255, 215, 130, 0.15) 20deg,
    transparent 40deg,
    transparent 140deg,
    rgba(255, 215, 130, 0.1) 160deg,
    transparent 200deg
  );
  mix-blend-mode: screen;
  opacity: 0.8;
}

.vinyl-center {
  position: absolute;
  inset: 35%;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 20%, #f7e7b7, #b08d57 60%, #8c6b3f 100%);
  box-shadow: 0 0 12px rgba(176, 141, 87, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
}

.vinyl-center-inner {
  width: 22%;
  height: 22%;
  border-radius: 50%;
  background: #111;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.8);
}

.year-display {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
</style>
