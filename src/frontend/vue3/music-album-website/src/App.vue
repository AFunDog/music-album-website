<script setup lang="ts">
import { ref } from 'vue';
import SideBar from './components/SideBar.vue';

const viewTransition = ref('main');

</script>

<template>
  <div class="flex flex-row w-screen h-screen">
    <!-- 侧边栏 -->
    <SideBar/>

    <!-- 内容区 -->
    <main class="w-full h-full">
      <RouterView v-slot="{ Component }">
        <Transition :name="viewTransition">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<style scoped>
/* 淡入淡出动画 */
.main-enter-active,
.main-leave-active {
  position: absolute;
  width: 100%;
  transition: all .3s cubic-bezier(.215, .61, .355, 1);
}

.main-enter-from {
  opacity: 0;
  transform: translateY(32px);
}

.main-leave-to {
  opacity: 0;
  transform: translateY(-32px);
}
</style>
