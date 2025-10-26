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
// نیازی به هدایت خودکار یا router نیست
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
