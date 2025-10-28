<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import BottomFooter from "../components/bottomfooter.vue";
import { Icon } from "@iconify/vue"; // اصلاح شده

// ماه‌های فارسی
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

const monthEditing = ref(false);
const yearEditing = ref(false);

const selectedDay = ref<number | null>(null);
const selectedMonth = ref(0);
const selectedYear = ref(0);

const daysContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  const today = new Date();
  selectedDay.value = today.getDate();
  selectedMonth.value = today.getMonth();
  selectedYear.value = today.getFullYear();

  // Scroll به روز امروز بعد از render
  nextTick(() => {
    const dayEl = daysContainer.value?.querySelector<HTMLElement>(
      `[data-day="${selectedDay.value}"]`
    );
    dayEl?.scrollIntoView({ behavior: "smooth", inline: "center" });
  });
});

interface Purchase {
  name: string;
  time: string;
  items: string[];
  total: number;
  category: string;
  avatar?: string;
}

const dailyPurchases = ref<{ [key: number]: Purchase[] }>({
  28: [
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
      {
      name: "زهرا مقدم",
      time: "08:30 صبح",
      items: ["نان", "پنیر", "چای"],
      total: 500000,
      category: "سوپرمارکت",
      avatar: "/img/Oval-5.png",
    },
  ],
  1: [
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
      items: ["پفک مینو", "زغال"],
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
  const days = new Date(selectedYear.value, selectedMonth.value + 1, 0).getDate();
  return Array.from({ length: days }, (_, i) => i + 1);
});

const getAvatar = (p: Purchase) => p.avatar;

// Dropdown حرفه‌ای ماه و سال
const monthOpen = ref(false);
const yearOpen = ref(false);
const years = [2023, 2024, 2025];

const selectMonth = (i: number) => {
  selectedMonth.value = i;
  monthOpen.value = false;
};
const selectYear = (y: number) => {
  selectedYear.value = y;
  yearOpen.value = false;
};
</script>

<template>
  <div dir="rtl" class="min-h-screen flex flex-col bg-white pb-28">
    <!-- Header -->
    <header
      class="flex justify-between items-center mb-4 px-4 py-5 shadow-sm bg-white sticky top-0 z-20"
    >
      <!-- سمت راست: ماه و سال -->
      <div class="flex items-center gap-2 font-semibold relative">
        <!-- ماه -->
        <div class="relative w-32" @click.stop="monthOpen = !monthOpen">
          <button
            class="w-full bg-white rounded-full px-4 py-2 text-sm font-medium flex justify-between items-center shadow-sm"
          >
            {{ months[selectedMonth] }}
            <Icon
              icon="lucide:arrow-down"
              :class="{ 'rotate-180': monthOpen }"
              class="w-4 h-4 transition-transform duration-200"
            />
          </button>
          <transition name="fade-slide">
            <ul
              v-show="monthOpen"
              class="absolute right-0 mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden z-50"
            >
              <li
                v-for="(m, i) in months"
                :key="i"
                @click="selectMonth(i)"
                class="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {{ m }}
              </li>
            </ul>
          </transition>
        </div>

        <span class="text-gray-400">|</span>

        <!-- سال -->
        <div class="relative w-30" @click.stop="yearOpen = !yearOpen">
          <button
            class="w-full bg-white rounded-full px-4 py-2 text-sm font-medium flex justify-between items-center shadow-sm"
          >
            {{ selectedYear }}
            <Icon
              icon="lucide:arrow-down"
              :class="{ 'rotate-180': yearOpen }"
              class="w-4 h-4 transition-transform duration-200"
            />
          </button>
          <transition name="fade-slide">
            <ul
              v-show="yearOpen"
              class="absolute right-0 mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden z-50"
            >
              <li
                v-for="y in years"
                :key="y"
                @click="selectYear(y)"
                class="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {{ y }}
              </li>
            </ul>
          </transition>
        </div>
      </div>

      <!-- سمت چپ: برگشت به Home -->
      <button
        @click="$router.push('/home')"
        class="bg-black text-white p-2 rounded-full flex items-center justify-center hover:scale-105 transition"
      >
        <Icon icon="lucide:arrow-left" class="w-5 h-5" />
      </button>
    </header>

    <!-- روزهای ماه RTL -->
    <section
      ref="daysContainer"
      class="overflow-x-auto flex gap-3 px-4 py-2 mt-3 mb-5 no-scrollbar"
    >
      <div
        v-for="day in daysInMonth"
        :key="day"
        :data-day="day"
        @click="selectedDay = day"
        :class="[
          'flex flex-col justify-center items-center min-w-[60px] px-3 py-3 rounded-3xl shadow-sm text-center cursor-pointer transition-all duration-200',
          selectedDay === day
            ? 'bg-yellow-300 text-black font-bold shadow-md scale-105'
            : 'bg-gray-100 text-gray-500 hover:scale-105',
        ]"
      >
        <div class="text-xs truncate">{{ months[selectedMonth] }}</div>
        <div class="text-lg font-bold">{{ day }}</div>
      </div>
    </section>

    <!-- لیست خریدها -->
    <main class="flex-1 px-4">
      <div
        v-if="selectedDayPurchases.length === 0"
        class="text-center text-gray-400 mt-5"
      >
        خریدی برای این روز ثبت نشده است.
      </div>

      <div
        v-for="(p, i) in selectedDayPurchases"
        :key="i"
        class="bg-gray-100 text-black rounded-3xl p-4 mb-4 shadow-sm transition-transform transform hover:-translate-y-1 hover:scale-[1.02]"
      >
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <img
              :src="getAvatar(p)"
              alt="avatar"
              class="w-12 h-12 rounded-full border border-black object-cover"
            />
            <div class="font-semibold text-base">{{ p.name }}</div>
          </div>
          <div class="text-sm text-gray-400" dir="ltr">{{ p.time }}</div>
        </div>
        <div class="mt-2 text-sm">اقلام: {{ p.items.join("، ") }}</div>
        <div class="mt-1 text-sm font-semibold">
          جمع کل: {{ p.total.toLocaleString() }} تومان
        </div>
      </div>
    </main>

    <BottomFooter />
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* fade + slide برای dropdown ماه و سال */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
