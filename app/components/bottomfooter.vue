<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();
const activeTab = ref("home");

function setActive(tab: string, path: string) {
  activeTab.value = tab;
  router.push(path);
}
</script>

<template>
  <div class="w-screen min-h-screen bg-white text-[#121212] flex flex-col pb-20">
    <!-- Header + Notifications + Orders همون کد شماست -->

    <!-- Bottom Navigation -->
    <div class="fixed bottom-0 left-0 w-full z-50">
      <div
        class="relative flex justify-between items-center bg-white border border-gray-300 rounded-t-3xl h-16 px-4 shadow-sm"
      >
        <div class="bottom-nav">
          <NuxtLink to="/home">
            <Icon icon="lucide:home" width="28" height="28" />
          </NuxtLink>

          <NuxtLink to="/addlist" class="middle-btn">
            <Icon icon="lucide:plus" width="28" height="28" />
          </NuxtLink>

          <NuxtLink to="/orders">
            <Icon icon="lucide:shopping-cart" width="28" height="28" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scrollbar + Custom Checkbox + Bounce Animation همون قبلی */

.absolute.w-12.h-12 {
  z-index: -1; /* پشت آیکون */
}

svg {
  transition: transform 0.2s ease;
}
svg:active {
  transform: scale(1.2);
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px; /* ارتفاع مناسب برای نوار */
  background: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.middle-btn {
  position: absolute;
  top: -25%; /* ارتفاع دایره نسبت به نوار */
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  z-index: 10;
  transition: all 0.3s ease;
}

.middle-btn:hover {
  transform: translateX(-50%) scale(1.1);
}
</style>
