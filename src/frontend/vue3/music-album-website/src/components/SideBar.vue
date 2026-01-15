<script setup lang="ts">
import { ref, type Component, computed } from 'vue'
import { useColorMode } from '@vueuse/core'
import {
  Home,
  Music,
  Heart,
  ListMusic,
  Mic2,
  Disc3,
  Search,
  User,
  Sun,
  Moon,
} from 'lucide-vue-next'

interface MenuItem {
  id: string
  label: string
  icon: Component
  active?: boolean
}

const colorMode = useColorMode()


const isDark = computed(() => colorMode.value === 'dark')

const menuItems = ref<MenuItem[]>([
  { id: 'home', label: '首页', icon: Home, active: true },
  { id: 'library', label: '音乐库', icon: Music },
  { id: 'favorites', label: '收藏', icon: Heart },
  { id: 'playlists', label: '播放列表', icon: ListMusic },
  { id: 'artists', label: '艺术家', icon: Mic2 },
  { id: 'albums', label: '专辑', icon: Disc3 },
])

const toggleMenu = (id: string) => {
  menuItems.value.forEach(item => {
    item.active = item.id === id
  })
}

const toggleTheme = () => {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <!-- 毛玻璃背景侧边栏 -->
  <aside class="h-screen w-64 sticky top-0 left-0 z-40">
    <!-- 毛玻璃背景容器 - 亮色/深色主题 -->
    <div
      class="h-full bg-white/20 dark:bg-slate-900/40 backdrop-blur-md border-r border-white/30 dark:border-slate-700/50 shadow-lg overflow-y-auto transition-colors duration-300">
      <!-- Logo 区域 -->
      <div class="p-6 border-b border-white/20 dark:border-slate-700/50">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <div
              class="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Music class="text-white" :size="24" />
            </div>
            <h1 class="text-xl font-bold text-gray-900 dark:text-white">音乐库</h1>
          </div>
          <!-- 主题切换按钮 -->
          <button @click="toggleTheme"
            class="p-2 rounded-lg bg-white/30 dark:bg-slate-800/50 hover:bg-white/40 dark:hover:bg-slate-700/50 transition-colors"
            :title="isDark ? '切换为亮色模式' : '切换为深色模式'">
            <Sun v-if="isDark" class="text-yellow-400" :size="18" />
            <Moon v-else class="text-slate-700" :size="18" />
          </button>
        </div>
      </div>

      <!-- 搜索框 -->
      <div class="p-4 border-b border-white/20 dark:border-slate-700/50">
        <div class="relative">
          <input type="text" placeholder="搜索歌曲..."
            class="w-full px-4 py-2 bg-white/30 dark:bg-slate-800/40 backdrop-blur-md border border-white/40 dark:border-slate-700/50 rounded-lg text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:border-transparent transition-all" />
          <Search class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400"
            :size="18" />
        </div>
      </div>

      <!-- 菜单项 -->
      <nav class="p-4 space-y-2">
        <button v-for="item in menuItems" :key="item.id" @click="toggleMenu(item.id)" :class="[
          'w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
          item.active
            ? 'bg-white/40 dark:bg-slate-700/60 text-gray-900 dark:text-white shadow-md'
            : 'text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-slate-800/40'
        ]">
          <component :is="item.icon" :size="20" />
          <span class="font-medium">{{ item.label }}</span>
        </button>
      </nav>

      <!-- 分隔线 -->
      <div class="mx-4 border-t border-white/20 dark:border-slate-700/50"></div>

      <!-- 下方内容区域 -->
      <div class="p-4 mt-4">
        <!-- 当前播放 -->
        <div
          class="bg-gradient-to-br from-purple-400/30 to-pink-400/30 dark:from-purple-900/40 dark:to-pink-900/40 backdrop-blur-md border border-white/30 dark:border-slate-700/50 rounded-lg p-4 mb-4 transition-colors duration-300">
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">正在播放</h3>
          <p class="text-xs text-gray-700 dark:text-gray-400 truncate">暂无播放内容</p>
        </div>

        <!-- 用户信息 -->
        <div
          class="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/20 dark:bg-slate-800/40 border border-white/30 dark:border-slate-700/50 transition-colors duration-300">
          <div
            class="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <User class="text-white" :size="16" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 dark:text-white">用户</p>
            <p class="text-xs text-gray-600 dark:text-gray-400 truncate">premium</p>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
/* 自定义滚动条样式 - 亮色模式 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* 深色模式下的滚动条样式 */
:deep(.dark) ::-webkit-scrollbar-thumb {
  background: rgba(100, 116, 139, 0.4);
}

:deep(.dark) ::-webkit-scrollbar-thumb:hover {
  background: rgba(100, 116, 139, 0.6);
}
</style>
