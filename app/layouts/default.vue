<template>
  <div class="min-h-screen bg-white flex flex-col pb-20">
    <!-- ✨ انیمیشن بین صفحات با slide افقی و bounce -->
    <Transition :name="transitionName" mode="out-in" appear>
      <NuxtPage :key="$route.fullPath" />
    </Transition>

    <!-- BottomNav فقط در صفحات مجاز -->
    <BottomNav v-if="showNav" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, ref, watch } from "vue";

// مسیر فعلی
const route = useRoute();

// صفحاتی که BottomNav نباید نمایش داده شود
const hideOnPages = ["/", "/login", "/starter", "/registar"];

// ✅ حذف اسلش انتهایی برای جلوگیری از خطا
const showNav = computed(() => {
  const cleanPath = route.path.replace(/\/$/, "");
  return !hideOnPages.includes(cleanPath);
});

// تشخیص جهت انیمیشن (جلو / عقب)
const transitionName = ref("slide-left");
let previousPath = route.fullPath;

// تعیین جهت اسلاید با تشخیص تغییر مسیر
watch(
  () => route.fullPath,
  (newPath) => {
    transitionName.value =
      newPath.length >= previousPath.length ? "slide-left" : "slide-right";
    previousPath = newPath;
  }
);
</script>

<style>
/* 🔹 اسلاید به چپ (جلو) */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease;
}
.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(-30px); /* bounce جزئی */
  opacity: 0;
}

/* 🔹 اسلاید به راست (برگشت) */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease;
}
.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(30px); /* bounce جزئی */
  opacity: 0;
}
</style>
