<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";

// نگهداری تب فعال برای تغییر رنگ و اندازه آیکون‌ها
const activeTab = ref("home");

// تغییر تب هنگام کلیک روی آیکون
function setActive(tab: string) {
  activeTab.value = tab;
}
</script>

<template>
  <div class="fixed bottom-0 left-0 w-full z-50">
    <div
      class="relative flex justify-between items-center bg-white border border-gray-300 rounded-t-3xl h-16 px-4 shadow-sm"
    >
      <div class="bottom-nav">
        <!-- خانه -->
        <NuxtLink to="/home" @click="setActive('home')">
          <Icon icon="lucide:home" width="25" height="25" class="text-[#222]" />
        </NuxtLink>

        <!-- دکمه وسطی برای افزودن -->
        <NuxtLink to="/addlist" class="middle-btn" @click="setActive('addlist')">
          <Icon icon="lucide:plus" width="28" height="28" class="text-white" />
        </NuxtLink>

        <!-- سبد خرید -->
        <NuxtLink to="/orders" @click="setActive('orders')">
          <Icon icon="lucide:shopping-cart" width="25" height="25" class="text-[#222]" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* نوار پایین */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0;
  box-shadow: 0 -2px 10px #2222221a;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

/* دکمه وسطی */
.middle-btn {
  position: absolute;
  top: -50%; /* ارتفاع دایره نسبت به نوار */
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #222;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px #2222224d;
  z-index: 10;
  transition: transform 0.3s ease;
}
</style>
