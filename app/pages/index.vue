<script setup>
// #region Import-onMounted
import { onMounted } from "vue";
// #endregion

// #region Import-useRouter
import { useRouter } from "vue-router";
// #endregion

// #region Declare-router
const router = useRouter();
// #endregion

// #region onMounted-Function
onMounted(() => {
  // #region Check-Current-Path
  // فقط اگر صفحه فعلی index باشد
  if (window.location.pathname === "/" || window.location.pathname === "/index") {
    // #region SetTimeout-Redirect
    setTimeout(() => {
      // #region Router-Replace-Starter
      router.replace("/starter"); // replace بهتر است تا Back باعث بازگشت به index نشود
      // #endregion
    }, 3000); // 3 ثانیه بعد هدایت
    // #endregion
  }
  // #endregion
});
// #endregion
</script>

<template>
  <!--#region-Main-Container-->
  <div
    class="w-screen h-screen bg-white text-[#222] relative flex flex-col justify-center items-center text-center"
  >
    <!--#region-Logo-Welcome-Text-Container-->
    <div class="flex flex-col items-center justify-center space-y-3">
      <!--#region-Logo-Image-->
      <img src="/img/favicon.png" alt="logo image" class="w-30 h-30 object-cover mb-5" />
      <!--#endregion-->

      <!--#region-Welcome-Text-->
      <p class="Estedad_FD_Medium text-lg mt-5 flex">
        <!--#region-Welcome-Text-Part1-->
        به اپلیکیشن
        <!--#endregion-->

        <!--#region-Highlight-Span-->
        <span class="bg-yellow-400 mx-2 px-2 rotate-5">بخر</span>
        <!--#endregion-->

        <!--#region-Welcome-Text-Part2-->
        خوش آمدید
        <!--#endregion-->
      </p>
      <!--#endregion-->

      <!--#region-Subtitle-Text-->
      <p class="text-md">اینجا شروع سفر شماست</p>
      <!--#endregion-->
    </div>
    <!--#endregion-->

    <!--#region-Footer-->
    <div class="w-full text-center absolute bottom-5">
      <!--#region-Footer-Text1-->
      <p class="text-md mt-2">ساخته شده با 💜 توسط تیم کُدینچی</p>
      <!--#endregion-->

      <!--#region-Footer-Text2-->
      <p class="text-md mt-2">v.1.2</p>
      <!--#endregion-->
    </div>
    <!--#endregion-->
  </div>
  <!--#endregion-->
</template>

<style scoped></style>
