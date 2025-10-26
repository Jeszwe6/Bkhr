<script setup>
//#region-Imports
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const current = ref(0);
//#endregion
//#region-Splashes
const slides = [
  //Starter-1
  {
    image: "/img/starter-1.jpg",
    width: "400px",
    height: "300px",
  },
  //Starter-2
  {
    image: "/img/starter-2.jpg",
    width: "400px",
    height: "300px",
  },
  //Starter-3
  {
    image: "/img/starter-3.jpg",
    width: "400px",
    height: "300px",
  },
  //Starter-4
  {
    image: "/img/starter-4.jpg",
    width: "400px",
    height: "300px",
  },
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
    class="relative w-screen h-screen bg-white flex flex-col items-center justify-center"
  >
    <!--#region-Image-And-Text-Transition-->
    <transition name="fade" mode="out-in">
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
            <div class="mb-3 flex">
              بیاید
              <span
                class="transform bg-yellow-300 text-black px-2 mx-2 font-bold rotate-5"
              >
                مشکلات
              </span>
              را کم کنیم
            </div>
            <div class="mb-3 flex">
              <span
                class="transform bg-yellow-300 text-black px-2 mx-2 font-bold -rotate-5"
              >
                به راحتی
              </span>
              سفارش دهید
            </div>
            <div class="mb-3 flex">
              دیگر
              <span
                class="transform bg-yellow-300 text-black px-2 mx-2 font-bold rotate-5"
              >
                فراموش
              </span>
              نمیکنید!
            </div>
          </div>

          <!-- Slide 2 -->
          <div v-else-if="current === 1">
            <div class="mb-3 flex">
              فقط با یک
              <span
                class="transform bg-yellow-300 text-black px-2 mx-2 font-bold rotate-5"
              >
                تیک
              </span>
            </div>
          </div>

          <!-- Slide 3 -->
          <div
            v-else-if="current === 2"
            class="flex flex-col items-center space-y-3 text-center"
          >
            <div>سفارش دهید</div>

            <div class="flex items-center justify-center">
              <span class="transform bg-yellow-300 text-black px-2 font-bold -rotate-5">
                خرید
              </span>
              <span class="mx-2">کنید</span>
            </div>

            <div>چت کنید</div>

            <div>و</div>

            <div class="flex items-center justify-center">
              <span>سفارش خود را آنلاین</span>
              <span
                class="transform bg-yellow-300 text-black px-2 font-bold rotate-5 mx-2"
              >
                پیگیری
              </span>
              <span>کنید</span>
            </div>
          </div>

          <!-- Slide 4 -->
          <div v-else-if="current === 3">
            آماده‌اید؟<br />
            همین حالا ثبت‌نام کنید و شروع کنید!
          </div>
        </div>
        <!--#endregion-->
      </div>
    </transition>
    <!--#endregion-->
    <!--#region-Buttons-Transition-->
    <transition name="fade" mode="out-in">
      <div
        :key="'buttons-' + current"
        class="absolute w-full flex justify-between px-6 bottom-20"
      >
        <!--#region-Register-Button-Last-Slide-->
        <template v-if="current === slides.length - 1">
          <NuxtLink
            to="/registar"
            class="w-80 h-12 absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black text-white px-8 py-3 rounded-full flex items-center justify-center"
          >
            ثبت نام
          </NuxtLink>
        </template>
        <!--#endregion-->
        <!--#region-Next-PrevButtons-->
        <template v-else>
          <!-- دکمه بعدی -->
          <button
            v-if="current < slides.length - 1"
            @click="nextSlide"
            class="w-12 h-12 aspect-square p-2 rounded-full shadow-lg bg-black flex items-center justify-center mr-5 mb-1"
          >
            <Icon class="text-gray-100 w-8 h-8" icon="lucide:arrow-right" />
          </button>

          <!-- دکمه قبلی -->
          <button
            v-if="current > 0"
            @click="prevSlide"
            class="w-12 h-12 aspect-square p-2 rounded-full shadow-lg bg-black flex items-center justify-center ml-5 mb-1"
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
/*#region Fade Animation*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease, transform 0.6s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
/*#endregion*/
</style>
