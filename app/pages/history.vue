<script setup lang="ts">
//#region Imports
import { ref, computed, onMounted, nextTick } from "vue";
import { Icon } from "@iconify/vue";
import * as BottomFooter from "../components/bottomfooter.vue";
//#endregion

//#region Jalali Date Helper
function toJalali(gY: number, gM: number, gD: number) {
  const g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

  let gy = gY - 1600;
  let gm = gM - 1;
  let gd = gD - 1;
  let g_day_no =
    365 * gy +
    Math.floor((gy + 3) / 4) -
    Math.floor((gy + 99) / 100) +
    Math.floor((gy + 399) / 400);
  for (let i = 0; i < gm; i++) g_day_no += g_days_in_month[i];
  if (
    gm > 1 &&
    (gy + 1600) % 4 === 0 &&
    ((gy + 1600) % 100 !== 0 || (gy + 1600) % 400 === 0)
  )
    g_day_no++;
  g_day_no += gd;

  let j_day_no = g_day_no - 79;
  let j_np = Math.floor(j_day_no / 12053);
  j_day_no %= 12053;

  let jy = 979 + 33 * j_np + 4 * Math.floor(j_day_no / 1461);
  j_day_no %= 1461;

  if (j_day_no >= 366) {
    jy += Math.floor((j_day_no - 1) / 365);
    j_day_no = (j_day_no - 1) % 365;
  }

  let jm = 0;
  for (; jm < 11 && j_day_no >= j_days_in_month[jm]; jm++)
    j_day_no -= j_days_in_month[jm];
  let jd = j_day_no + 1;

  return { jy, jm, jd };
}
//#endregion

//#region Selected Day, Month, Year
const selectedDay = ref<number | null>(null);
const selectedMonth = ref(0);
const selectedYear = ref(0);
const daysContainer = ref<HTMLElement | null>(null);

const months = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];
const years = [2023, 2024, 2025, 2026];

onMounted(() => {
  const today = new Date();
  const jalaliToday = toJalali(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );
  selectedDay.value = jalaliToday.jd;
  selectedMonth.value = jalaliToday.jm;
  selectedYear.value = jalaliToday.jy;

  nextTick(() => {
    const dayEl = daysContainer.value?.querySelector<HTMLElement>(
      `[data-day="${selectedDay.value}"]`
    );
    dayEl?.scrollIntoView({ behavior: "smooth", inline: "center" });
  });
});
//#endregion

//#region Purchases
interface Purchase {
  name: string;
  time: string;
  items: string[];
  total: number;
  category: string;
  avatar?: string;
}
const dailyPurchases = ref<{ [key: number]: Purchase[] }>({
  10: [
    {
      name: "ساجده شوکاوی",
      time: "08:30 صبح",
      items: ["نان", "پنیر", "چای"],
      total: 500000,
      category: "سوپرمارکت",
      avatar: "/img/Oval-5.png",
    },
    {
      name: "ساهره شوکاوی",
      time: "08:30 صبح",
      items: ["نان", "پنیر", "چای"],
      total: 500000,
      category: "سوپرمارکت",
      avatar: "/img/Oval-5.png",
    },
  ],
  18: [
    {
      name: "فضیله آل سوف",
      time: "10:15 صبح",
      items: ["شیر", "ماست", "سیب"],
      total: 300000,
      category: "سوپرمارکت",
      avatar: "/img/Oval-1.png",
    },
    {
      name: "احمد قنواتی",
      time: "12:00 ظهر",
      items: ["پفک مینو", "نوشابه"],
      total: 250000,
      category: "سوپرمارکت",
      avatar: "/img/Oval.png",
    },
  ],
});

const selectedDayPurchases = computed(() =>
  selectedDay.value ? dailyPurchases.value[selectedDay.value] || [] : []
);
const daysInMonth = computed(() => {
  const jalaliMonthDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
  return Array.from({ length: jalaliMonthDays[selectedMonth.value] }, (_, i) => i + 1);
});
//#endregion

//#region Dropdowns
const monthOpen = ref(false);
const yearOpen = ref(false);
const selectMonth = (i: number) => {
  selectedMonth.value = i;
  monthOpen.value = false;
};
const selectYear = (y: number) => {
  selectedYear.value = y;
  yearOpen.value = false;
};
//#endregion

//#region Avatar
const getAvatar = (p: Purchase) => p.avatar;
//#endregion
</script>

<template>
  <div dir="rtl" class="flex flex-col bg-white overflow-hidden">
    <!-- ========================= Header ========================= -->
    <header
      class="flex justify-between items-center px-4 py-3 shadow-sm bg-white z-20 shrink-0"
    >
      <!-- انتخاب ماه و سال -->
      <div class="flex items-center gap-2 font-semibold relative">
        <!-- ---------- انتخاب ماه ---------- -->
        <div class="relative w-32" @click.stop="monthOpen = !monthOpen">
          <button
            class="w-full bg-white rounded-full px-4 py-2 text-sm font-medium flex justify-between items-center shadow-sm text-black"
          >
            {{ months[selectedMonth] }}
            <Icon
              icon="lucide:arrow-down"
              :class="{ 'rotate-180': monthOpen }"
              class="w-4 h-4 transition-transform duration-200"
            />
          </button>
          <!-- منوی بازشو ماه -->
          <transition name="fade-slide">
            <ul
              v-show="monthOpen"
              class="absolute right-0 mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden z-50"
            >
              <li
                v-for="(m, i) in months"
                :key="i"
                @click="selectMonth(i)"
                class="px-4 py-2 cursor-pointer hover:bg-gray-100 text-[#222]"
              >
                {{ m }}
              </li>
            </ul>
          </transition>
        </div>

        <!-- ---------- انتخاب سال ---------- -->
        <div class="relative w-30" @click.stop="yearOpen = !yearOpen">
          <button
            class="w-full bg-white rounded-full px-4 py-2 text-sm font-medium flex justify-between items-center shadow-sm text-black"
          >
            {{ selectedYear }}
            <Icon
              icon="lucide:arrow-down"
              :class="{ 'rotate-180': yearOpen }"
              class="w-4 h-4 transition-transform duration-200"
            />
          </button>
          <!-- منوی بازشو سال -->
          <transition name="fade-slide">
            <ul
              v-show="yearOpen"
              class="absolute right-0 mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden z-50"
            >
              <li
                v-for="y in years"
                :key="y"
                @click="selectYear(y)"
                class="px-4 py-2 cursor-pointer hover:bg-gray-100 text-[#222]"
              >
                {{ y - 621 }}
              </li>
            </ul>
          </transition>
        </div>
      </div>

      <!-- دکمه برگشت به صفحه اصلی -->
      <button
        @click="$router.push('/home')"
        class="bg-[#222] text-white p-2 rounded-full flex items-center justify-center hover:scale-105 transition"
      >
        <Icon icon="lucide:arrow-left" class="w-5 h-5" />
      </button>
    </header>

    <!-- ========================= Days Scroll ========================= -->
    <section
      ref="daysContainer"
      class="flex gap-3 px-4 py-2 mt-2 my-5 shrink-0 overflow-x-auto"
    >
      <!-- هر روز ماه -->
      <div
        v-for="day in daysInMonth"
        :key="day"
        :data-day="day"
        @click="selectedDay = day"
        :class="[
          'flex flex-col justify-center items-center min-w-[60px] px-3 py-5 rounded-3xl shadow-sm text-center text-md cursor-pointer transition-all duration-200',
          selectedDay === day
            ? 'bg-yellow-400 text-[#222] font-bold shadow-md scale-105'
            : 'bg-gray-100 text-gray-700 hover:scale-105',
        ]"
      >
        <div class="text-xs truncate">{{ months[selectedMonth] }}</div>
        <div class="text-lg font-bold">{{ day }}</div>
      </div>
    </section>

    <!-- ========================= Purchases ========================= -->
    <main class="flex-1 px-4 overflow-hidden">
      <!-- پیام وقتی خریدی ثبت نشده -->
      <div
        v-if="selectedDayPurchases.length === 0"
        class="text-center text-gray-800 mt-2"
      >
        خریدی برای این روز ثبت نشده است.
      </div>

      <!-- کارت خریدهای روز -->
      <div
        v-for="(p, i) in selectedDayPurchases"
        :key="i"
        class="bg-gray-100 text-[#222] rounded-3xl p-4 mb-4 shadow-sm transition-transform transform hover:-translate-y-1 hover:scale-[1.02]"
      >
        <!-- هدر کارت شامل نام و زمان -->
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <img
              :src="getAvatar(p)"
              alt="avatar"
              class="w-12 h-12 rounded-full border border-[#222] object-cover"
            />
            <div class="font-semibold text-base">{{ p.name }}</div>
          </div>
          <div class="text-sm text-gray-700" dir="ltr">{{ p.time }}</div>
        </div>

        <!-- لیست اقلام -->
        <div class="mt-2 text-sm">اقلام: {{ p.items.join("، ") }}</div>
        <!-- جمع کل -->
        <div class="mt-1 text-sm font-semibold">
          جمع کل: {{ p.total.toLocaleString() }} تومان
        </div>
      </div>
    </main>

    <!-- ========================= Footer ========================= -->
    <BottomFooter.default />
  </div>
</template>

<style scoped>
/* ========================= Fade Slide Transition ========================= */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ========================= حذف کامل اسکرول ========================= */
html,
body {
  height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>
