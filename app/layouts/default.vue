<template>
  <div>
    <NuxtPage />
    <!--   <BottomNav v-if="showNav" /> <-- این خط رو حذف یا کامنت کن -->
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import BottomNav from "~/components/bottomfooter.vue";

const route = useRoute();

// صفحات خاص که نباید نوار پایین نمایش داده بشه
const hideOnPages = ["/", "/login", "/starter", "/registar"];

// reactive بررسی مسیر فعلی
const showNav = computed(() => !hideOnPages.includes(route.path));
</script>
