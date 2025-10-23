<template>
  <UApp>
    <div class="select-none" data-vaul-drawer-wrapper>
      <NuxtLayout>
        <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
      </NuxtLayout>
    </div>
  </UApp>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// بعد از 3 ثانیه، کاربر به starter.vue هدایت می‌شود
setTimeout(() => {
  router.push('/starter')
}, 100000) // 3000 میلی‌ثانیه = 3 ثانیه
</script>

<style>
html {
  overflow-x: hidden !important;
  overscroll-behavior: none;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.6s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
