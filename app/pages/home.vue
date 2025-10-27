<script setup lang="ts">
//#region Imports
import { ref, onMounted } from "vue";
//#endregion

//#region State & Data
const showNotifications = ref(false);

const notifications = ref(["1 پیام جدید ساهره شوکاوی", "1 پیام جدید ودود مقدم"]);

const contacts = ref([
  {
    id: 1,
    name: "احمد قنواتی",
    avatar: "/img/Oval.png",
    online: true,
    lastSeen: "هم‌اکنون",
  },
  {
    id: 2,
    name: "محمد قنواتی",
    avatar: "/img/Oval-4.png",
    online: false,
    lastSeen: "۲ ساعت پیش",
  },
  {
    id: 3,
    name: "حامد مقدم",
    avatar: "/img/Oval-6.png",
    online: false,
    lastSeen: "دیروز",
  },
]);

const orders = ref([
  {
    id: 1,
    customer: "ساجده شوکاوی",
    items: [
      { title: "گوجه گیلاسی", quantity: "نیم کیلو", checked: true },
      { title: "موز", quantity: "نیم کیلو", checked: true },
      { title: "خیار بوته‌ای", quantity: "1 کیلو", checked: true },
    ],
    progress: 0,
  },
  {
    id: 2,
    customer: "ساهره شوکاوی ",
    items: [
      { title: "سیب زمینی", quantity: "1 سبد", checked: true },
      { title: "هویج", quantity: "1 کیلو", checked: false },
      { title: "خیار بوته‌ای", quantity: "1 سبد", checked: false },
    ],
    progress: 0,
  },
  // سفارش جدید ۱
  {
    id: 3,
    customer: "فضیله آل سوف ",
    items: [
      { title: "پیاز", quantity: "2 کیلو", checked: false },
      { title: "فلفل دلمه‌ای سبز", quantity: "5 عدد", checked: false },
    ],
    progress: 0,
  },
  // سفارش جدید ۲
  {
    id: 4,
    customer: "زهرا مقدم",
    items: [
      { title: "سیب درختی قرمز", quantity: "3 کیلو", checked: true },
      { title: "موز", quantity: "1 کیلو", checked: true },
      { title: "انار", quantity: "2 عدد", checked: false },
    ],
    progress: 0,
  },
]);

//#endregion

//#region Methods
const getMessage = (text: string) => {
  const match = text.match(/^\d+\sپیام\sجدید/);
  return match ? match[0] : "";
};

const getSender = (text: string) => text.replace(/^\d+\sپیام\sجدید\s*/, "");

function updateProgress(order: any) {
  const total = order.items.length;
  const done = order.items.filter((i: any) => i.checked).length;
  order.progress = Math.round((done / total) * 100);
  if (order.progress >= 100) order.progress = 100;
}

onMounted(() => {
  orders.value.forEach((o) => updateProgress(o));
});

// Bounce Function for icon click
const bounce = (event: Event) => {
  const el = (event.currentTarget as HTMLElement).querySelector("svg");
  if (!el) return;

  el.classList.add("bounce");
  setTimeout(() => el.classList.remove("bounce"), 300);
};
//#endregion

const toggleNotifications = (event: Event) => {
  showNotifications.value = !showNotifications.value;

  // اجرای انیمیشن bounce روی آیکون
  const el = (event.currentTarget as HTMLElement).querySelector("svg");
  if (!el) return;
  el.classList.add("animate-bounce");
  setTimeout(() => el.classList.remove("animate-bounce"), 500);
};
</script>

<template>
  <div class="w-screen min-h-screen bg-white text-black flex flex-col">
    <!-- Header -->
    <div class="top-bar flex justify-between items-center p-4 my-5">
      <div class="flex items-center gap-3">
        <img src="/img/Oval-10.png" alt="پروفایل" class="w-15 h-15 rounded-full border border-black" />
        <span class="font-semibold text-lg">سلام نرجس</span>
      </div>

      <div class="flex items-center gap-4">
        <button
          @click="toggleNotifications($event)"
          class="relative p-2 rounded-full hover:bg-gray-100"
        >
          <Icon name="lucide:bell" size="24" class="text-black" />
          <span
            v-if="notifications.length"
            class="absolute top-0 -right-1 bg-red-700 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md"
          >
            {{ notifications.length }}
          </span>
        </button>

        <NuxtLink
          to="/history"
          class="p-2 rounded-full hover:bg-gray-100"
          @click="bounce($event)"
        >
          <Icon name="lucide:clock" size="25" class="text-black" />
        </NuxtLink>

        <NuxtLink
          to="/setting"
          class="p-2 rounded-full hover:bg-gray-100"
          @click="bounce($event)"
        >
          <Icon name="lucide:settings" size="25" class="text-black" />
        </NuxtLink>
      </div>
    </div>

    <!-- Notifications -->
    <div
      v-if="showNotifications"
      class="absolute top-20 right-4 w-72 bg-white shadow-xl rounded-2xl p-4 z-50 border border-gray-100"
    >
      <div class="flex justify-between items-center mb-3">
        <h3 class="font-bold text-lg">اعلان‌ها</h3>
        <span class="bg-red-700 text-white text-xs px-2 py-0.5 rounded-full">
          {{ notifications.length }}
        </span>
      </div>
      <ul class="space-y-3 max-h-52 overflow-y-auto">
        <li
          v-for="(n, i) in notifications"
          :key="i"
          class="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition"
        >
          <img
            :src="
              getSender(n).includes('ساهره')
                ? '/img/Oval-1.png'
                : getSender(n).includes('ودود')
                ? '/img/Oval-7.png'
                : '/img/Oval.png'
            "
            alt="avatar"
            class="w-10 h-10 rounded-full object-cover border border-black"
          />
          <div class="flex flex-col text-sm">
            <span class="font-semibold text-black">{{ getSender(n) }}</span>
            <span class="text-gray-500 text-xs">{{ getMessage(n) }}</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- Orders -->
    <div class="orders-section px-4 mb-5">
      <h2 class="font-bold mb-5 text-2xl">سفارش‌ها</h2>
      <div class="orders-scroller flex gap-6 overflow-x-auto pb-6 pr-2 overflow-hidden">
        <div
          v-for="order in orders"
          :key="order.id"
          class="order-card flex-none p-5 rounded-2xl shadow-md w-80 flex flex-col relative transition-colors duration-300"
          :class="{
            'bg-black text-white': order.progress >= 100,
            'bg-gray-100': order.progress < 100,
          }"
        >
          <h3 class="font-semibold text-lg mb-3">{{ order.customer }}</h3>
          <ul class="flex flex-col gap-2 mb-3">
            <li
              v-for="(it, idx) in order.items"
              :key="idx"
              class="flex justify-between items-center"
            >
              <label class="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  class="sr-only"
                  v-model="it.checked"
                  @change="updateProgress(order)"
                />
                <span
                  class="custom-checkbox"
                  :class="{ checked: it.checked, inverted: order.progress >= 100 }"
                ></span>
                <span :class="{ 'text-white': order.progress >= 100 }">{{
                  it.title
                }}</span>
              </label>
              <span :class="{ 'text-white': order.progress >= 100 }">{{
                it.quantity
              }}</span>
            </li>
          </ul>
          <div class="mt-auto">
            <div class="w-full h-2 bg-gray-300 rounded-full overflow-hidden shadow-sm">
              <div
                class="h-full bg-yellow-500 transition-all duration-300"
                :style="{ width: order.progress + '%' }"
              ></div>
            </div>
            <p class="text-xs mt-2" :class="{ 'text-white': order.progress >= 100 }">
              {{ order.progress }}% انجام شد
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Contacts -->
    <div class="contacts-section p-4 flex flex-col items-start">
      <h2 class="font-bold mb-5 text-2xl">مخاطبین</h2>
      <div class="flex flex-col gap-4 w-full">
        <div
          v-for="c in contacts"
          :key="c.id"
          class="flex justify-between items-center bg-gray-100 rounded-full px-5 py-2 transition shadow-sm"
        >
          <div class="flex items-center gap-3 flex-row-reverse">
            <span class="font-semibold text-lg">{{ c.name }}</span>
            <img
              :src="c.avatar"
              alt="avatar"
              class="w-12 h-12 rounded-full object-cover border border-black"
            />
          </div>
          <div class="text-sm text-gray-500">
            <span v-if="c.online" class="text-yellow-500 font-semibold">آنلاین</span>
            <span v-else>{{ c.lastSeen }}</span>
          </div>
        </div>
      </div>
    </div>
    <bottomfooter />
  </div>
</template>

<style scoped>
/* Scrollbar & Layout */
.orders-scroller::-webkit-scrollbar {
  display: none;
}
.contacts-section {
  direction: rtl;
}

/* Custom Checkbox */
.custom-checkbox {
  width: 18px;
  height: 18px;
  border-radius: 9999px;
  border: 2px solid white;
  position: relative;
  background: white;
  transition: all 0.2s ease;
}
.custom-checkbox.checked {
  background: white;
  border-color: white;
}
.custom-checkbox.checked::after {
  content: "";
  position: absolute;
  width: 6px;
  height: 10px;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  transform: rotate(45deg);
  right: 5px;
  top: 1px;
}
.custom-checkbox.inverted.checked::after {
  border-right: 2px solid black;
  border-bottom: 2px solid black;
}

/* Bounce Animation */
@keyframes bounceAnim {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}
.bounce {
  animation: bounceAnim 0.3s ease;
}
</style>
