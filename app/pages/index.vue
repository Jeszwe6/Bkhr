<template>
  <!--#region-Main-Container-->
  <div
    class="w-screen h-screen bg-white text-black relative flex flex-col justify-center items-center text-center"
  >
    <!--#region-Logo-Welcome-Text-->
    <div class="flex flex-col items-center justify-center space-y-3">
      <img src="/img/favicon.png" alt="logo image" class="w-30 h-30 object-cover mb-5" />
      <p class="Estedad_FD_Medium text-lg mt-5 flex">
        به اپلیکیشن
        <span class="bg-yellow-300 mx-2 px-2 rotate-5">بخر</span>
        خوش آمدید
      </p>
      <p class="text-md">اینجا شروع سفر شماست</p>
    </div>
    <!--#endregion-->
    <!--#region-Footer-->
    <div class="w-full text-center absolute bottom-5">
      <p class="text-md mt-2">ساخته شده با 💜 توسط تیم کدینچی</p>
      <p class="text-md mt-2">v.1.2</p>
    </div>
    <!--#endregion-->
  </div>
  <!--#endregion-->
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  // فقط اگر صفحه فعلی index باشد
  if (window.location.pathname === "/" || window.location.pathname === "/index") {
    setTimeout(() => {
      router.replace("/starter"); // replace بهتر است تا Back باعث بازگشت به index نشود
    }, 3000); // 3 ثانیه بعد هدایت
  }
});
</script>

<style scoped>
/* استایل‌ها می‌توانند همین‌جا باشند یا جدا شوند */
</style>
