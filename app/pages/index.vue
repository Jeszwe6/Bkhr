<script setup lang="ts">
//#region-Imports
import { onMounted } from "vue";
import { navigateTo } from "nuxt/app";
//#endregion
//#region-Navigation-Logic
onMounted(() => {
  setTimeout(() => {
    navigateTo("/starter");
  }, 2000);
});
//#endregion
</script>

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
      <p class="text-md mt-2">ساخته شده با 💜 توسط تیم کداینچی</p>
      <p class="text-md mt-2">v 0.2</p>
    </div>
    <!--#endregion-->
  </div>
  <!--#endregion-->
</template>

<style></style>
