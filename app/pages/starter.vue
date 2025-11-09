<script setup>
//#region-Imports
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const current = ref(0);
//#endregion

//#region-Splashes
const slides = [
  { image: "/img/starter-1.jpg", width: "400px", height: "300px" },
  { image: "/img/starter-2.jpg", width: "400px", height: "300px" },
  { image: "/img/starter-3.jpg", width: "400px", height: "300px" },
  { image: "/img/starter-4.jpg", width: "400px", height: "300px" },
];
//#endregion

//#region-SlideControls
const nextSlide = () => {
  if (current.value < slides.length - 1) current.value++;
};
const prevSlide = () => {
  if (current.value > 0) current.value--;
};
//#endregion
</script>

<template>
  <!--#region-Main-Container-->
  <div
    class="relative w-screen h-screen bg-white flex flex-col items-center justify-center overflow-hidden"
  >
    <!--#region-Image-And-Text-Transition-->
    <transition name="slide-scale" mode="out-in">
      <div
        :key="'slide-' + current"
        class="flex flex-col items-center justify-center h-full"
      >
        <!--#region-Image-->
        <img
          :src="slides[current].image"
          alt=""
          class="object-contain mb-5 transition-all duration-500"
          :style="{ width: slides[current].width, height: slides[current].height }"
        />
        <!--#endregion-->

        <!--#region-TextSlides-->
        <div class="text-xl text-center px-4 leading-relaxed transition-all duration-500">
          <!-- Slide 1 -->
          <div v-if="current === 0">
            <div class="mb-3 flex dark:text-[#222]">
              بیاید
              <span
                class="transform bg-yellow-400 text-[#222] px-2 mx-2 font-bold rotate-5"
              >
                مشکلات
              </span>
              را کم کنیم
            </div>
            <div class="mb-3 flex dark:text-[#222]">
              <span
                class="transform bg-yellow-400 text-[#222] px-2 mx-2 font-bold -rotate-5"
              >
                به راحتی
              </span>
              سفارش دهید
            </div>
            <div class="mb-3 flex dark:text-[#222]">
              دیگر
              <span
                class="transform bg-yellow-400 text-[#222] px-2 mx-2 font-bold rotate-5"
              >
                فراموش
              </span>
              نمیکنید!
            </div>
          </div>

          <!-- Slide 2 -->
          <div v-else-if="current === 1">
            <div class="mb-3 flex dark:text-[#121212]">
              فقط با یک
              <span
                class="transform bg-yellow-400 text-[#121212] px-2 mx-2 font-bold rotate-5"
              >
                تیک
              </span>
            </div>
          </div>

          <!-- Slide 3 -->
          <div
            v-else-if="current === 2"
            class="flex flex-col items-center space-y-3 text-center dark:text-[#121212]"
          >
            <div>سفارش دهید</div>
            <div class="flex items-center justify-center">
              <span class="transform bg-yellow-400 text-[#222] px-2 font-bold -rotate-5">
                خرید
              </span>
              <span class="mx-2">کنید</span>
            </div>
            <div>چت کنید</div>
            <div>و</div>
            <div class="flex items-center justify-center">
              <span>سفارش خود را آنلاین</span>
              <span
                class="transform bg-yellow-400 text-[#222] px-2 font-bold rotate-5 mx-2"
              >
                پیگیری
              </span>
              <span>کنید</span>
            </div>
          </div>

          <!-- Slide 4 -->
          <div v-else-if="current === 3" class="dark:text-[#222]">
            آماده‌اید؟<br />
            همین حالا ثبت‌نام کنید و شروع کنید!
          </div>
        </div>
        <!--#endregion-->
      </div>
    </transition>
    <!--#endregion-->

    <!--#region-Buttons-Transition-->
    <transition name="slide-scale" mode="out-in">
      <div
        :key="'buttons-' + current"
        class="absolute w-full flex justify-between px-6 bottom-20"
      >
        <!--#region-Register-Button-Last-Slide-->
        <template v-if="current === slides.length - 1">
          <NuxtLink
            to="/registar"
            class="w-80 h-12 absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#222] text-white text-lg px-8 py-3 rounded-full flex items-center justify-center"
          >
            ثبت نام
          </NuxtLink>
        </template>
        <!--#endregion-->

        <!--#region-Next-PrevButtons-->
        <template v-else>
          <button
            v-if="current < slides.length - 1"
            @click="nextSlide"
            class="w-12 h-12 aspect-square p-2 rounded-full shadow-lg bg-[#222] flex items-center justify-center mr-5 mb-1"
          >
            <Icon class="text-gray-100 w-8 h-8" icon="lucide:arrow-right" />
          </button>

          <button
            v-if="current > 0"
            @click="prevSlide"
            class="w-12 h-12 aspect-square p-2 rounded-full shadow-lg bg-[#222] flex items-center justify-center ml-5 mb-1"
          >
            <Icon class="text-gray-100 w-8 h-8" icon="lucide:arrow-left" />
          </button>
        </template>
        <!--#endregion-->
      </div>
    </transition>
    <!--#endregion-->
  </div>
  <!--#endregion-->
</template>

<style>
/*#region Slide-Scale-Animation*/
.slide-scale-enter-active,
.slide-scale-leave-active {
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease;
}

.slide-scale-enter-from {
  transform: translateX(100%) scale(0.95);
  opacity: 0;
}

.slide-scale-leave-to {
  transform: translateX(-30px) scale(1.05); /* bounce جزئی و کمی scale */
  opacity: 0;
}
/*#endregion*/
</style>
