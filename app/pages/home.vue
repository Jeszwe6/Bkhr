<script setup lang="ts">
//#region Imports
import { ref, onMounted } from "vue";
//#endregion

//#region State & Data
const showNotifications = ref(false);
const showDrawer = ref(false);
const selectedOrder = ref<any>(null);

const notifications = ref(["محمد قنواتی لیست خریدش را ارسال کرد"]);

const orders = ref([
  {
    id: 1,
    customer: "محمد قنواتی",
    listName: "چهارشنبه بازار",
    items: [
      { title: "گوجه گیلاسی", quantity: "نیم کیلو", checked: false },
      { title: "موز", quantity: "نیم کیلو", checked: false },
      { title: "خیار بوته‌ای", quantity: "1 کیلو", checked: false },
      { title: "گیلاس", quantity: "ربع کیلو", checked: false },
      { title: "پیاز", quantity: "نیم کیلو", checked: false },
      { title: "هندونه", quantity: "1 عدد", checked: false },
      { title: "پرتقال", quantity: "نیم کیلو", checked: false },
      { title: "کاهو", quantity: "1 عدد", checked: false },
      { title: "سیب زمینی", quantity: "1 کیلو", checked: false },
      { title: "فلفل دلمه‌ای", quantity: "نیم کیلو", checked: false },
      { title: "هویج", quantity: "نیم کیلو", checked: false },
      { title: "لیمو ترش", quantity: "نیم کیلو", checked: false },
    ],
    progress: 0,
  },
  {
    id: 2,
    customer: "محمد حسین مقدم",
    listName: "افق کوروش",
    items: [
      { title: "مایع ظرف شویی", quantity: "1 عدد", checked: true },
      { title: "مایع دستشویی", quantity: "1 عدد", checked: false },
      { title: "اسکاچ", quantity: "1 بسته", checked: false },
      { title: "صابون دست", quantity: "2 عدد", checked: false },
      { title: "شامپو", quantity: "1 عدد", checked: false },
      { title: "خمیردندان", quantity: "1 عدد", checked: false },
      { title: "دستمال کاغذی", quantity: "1 بسته", checked: false },
      { title: "کیسه زباله", quantity: "1 رول", checked: false },
      { title: "قاشق و چنگال یکبار مصرف", quantity: "1 بسته", checked: false },
      { title: "اسپری ضدعفونی", quantity: "1 عدد", checked: false },
      { title: "پاک‌کننده شیشه", quantity: "1 عدد", checked: false },
      { title: "دستکش یکبار مصرف", quantity: "1 بسته", checked: false },
      { title: "صابون لباسشویی", quantity: "1 عدد", checked: false },
      { title: "مایع سفیدکننده", quantity: "1 عدد", checked: false },
    ],
    progress: 0,
  },
]);
//#endregion

//#region Methods
//#region Update Progress
function updateProgress(order: any) {
  const total = order.items.length;
  const done = order.items.filter((i: any) => i.checked).length;
  order.progress = Math.round((done / total) * 100);
  if (order.progress >= 100) order.progress = 100;
}
//#endregion

//#region onMounted
onMounted(() => {
  orders.value.forEach((o) => updateProgress(o));
});
//#endregion

//#region Bounce Animation
const bounce = (event: Event) => {
  const el = (event.currentTarget as HTMLElement).querySelector("svg");
  if (!el) return;
  el.classList.add("bounce");
  setTimeout(() => el.classList.remove("bounce"), 300);
};
//#endregion

//#region Toggle Notifications
const toggleNotifications = (event: Event) => {
  showNotifications.value = !showNotifications.value;
  const el = (event.currentTarget as HTMLElement).querySelector("svg");
  if (!el) return;
  el.classList.add("animate-bounce");
  setTimeout(() => el.classList.remove("animate-bounce"), 500);
};
//#endregion

//#region Drawer Controls
function openDrawer(order: any) {
  selectedOrder.value = order;
  showDrawer.value = true;
}
function closeDrawer() {
  showDrawer.value = false;
  selectedOrder.value = null;
}
//#endregion

//#region Simulate Item Check
function simulateItemCheck(orderId: number, itemIndex: number) {
  const order = orders.value.find((o) => o.id === orderId);
  if (!order || !order.items[itemIndex]) return;
  order.items[itemIndex].checked = true;
  updateProgress(order);
  notifications.value.push(
    `${order.customer} آیتم "${order.items[itemIndex].title}" را انجام داد`
  );
}

orders.value[0]?.items.forEach((_, idx) => {
  if (orders.value[0]?.items[idx]) {
    setTimeout(() => simulateItemCheck(1, idx), (idx + 1) * 1500);
  }
});
//#endregion
//#endregion
</script>

<!-- #region Template -->
<template>
  <!-- #region Root -->
  <div class="w-screen min-h-screen bg-white text-[#222] flex flex-col">
    <!-- #region Header -->
    <div class="top-bar flex justify-between items-center p-4 my-5">
      <div class="flex items-center gap-3">
        <NuxtLink
          to="/profile"
          class="p-2 rounded-full hover:bg-gray-100"
          @click="bounce($event)"
        >
          <img
            src="/img/Oval-1.png"
            alt="پروفایل"
            class="w-15 h-15 rounded-full border-2 border-[#222]"
          />
        </NuxtLink>
        <span class="font-bold"> سلام نرجس ! </span>
      </div>

      <div class="flex items-center gap-4">
        <button @click="toggleNotifications($event)" class="relative p-2">
          <Icon name="lucide:bell" size="24" class="text-[#222]" />
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
          <Icon name="lucide:clock" size="25" class="text-[#222]" />
        </NuxtLink>

        <NuxtLink to="/setting" @click="bounce($event)">
          <Icon name="lucide:settings-2" size="25" class="text-[#222]" />
        </NuxtLink>
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region Notifications -->
    <div
      v-if="showNotifications"
      class="absolute top-20 right-4 w-72 bg-white shadow-xl rounded-2xl p-4 z-50 border border-gray-100"
    >
      <h3 class="font-bold text-lg mb-3">اعلان‌ها</h3>
      <ul class="space-y-2 max-h-52 overflow-y-auto">
        <li
          v-for="(n, i) in notifications"
          :key="i"
          class="text-sm text-[#222] p-2 rounded transition cursor-pointer"
          :class="[
            n.includes('احمد قنواتی')
              ? 'bg-red-700/60 font-bold rounded-2xl'
              : 'hover:bg-gray-100',
          ]"
          @click="openDrawer(orders[0])"
        >
          {{ n }}
        </li>
      </ul>
    </div>
    <!-- #endregion -->

    <!-- #region Orders Section -->
    <div class="orders-section px-4 mb-5">
      <h2 class="font-bold mb-5 text-xl">لیست سفارش های من</h2>
      <div class="orders-scroller flex gap-6 overflow-x-auto pb-6 pr-2">
        <div
          v-for="order in orders"
          :key="order.id"
          class="order-card flex-none p-5 rounded-2xl shadow-md w-80 flex flex-col relative transition-colors duration-300 overflow-hidden"
          :class="{
            'bg-[#222] text-white': order.progress >= 100,
            'bg-gray-100': order.progress < 100,
          }"
          style="height: 500px"
        >
          <h3 class="font-semibold text-lg mb-3">{{ order.listName }}</h3>

          <ul class="flex flex-col gap-2 mb-3 flex-1 overflow-y-auto">
            <li
              v-for="(it, idx) in order.items"
              :key="idx"
              class="flex justify-between items-center"
            >
              <label class="flex items-center gap-3 cursor-default">
                <span
                  class="custom-checkbox"
                  :class="{ checked: it.checked, inverted: order.progress >= 100 }"
                ></span>
                <span :class="{ 'text-white': order.progress >= 100 }">
                  {{ it.title }}
                </span>
              </label>
              <span :class="{ 'text-white': order.progress >= 100 }">
                {{ it.quantity }}
              </span>
            </li>
          </ul>

          <div>
            <div class="w-full h-2 bg-white rounded-full overflow-hidden shadow-sm">
              <div
                class="h-full bg-yellow-400 transition-all duration-300"
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
    <!-- #endregion -->

    <!-- #region Drawer -->
    <transition name="fade">
      <div
        v-if="showDrawer"
        class="fixed inset-0 bg-[#22222274] flex items-center justify-center z-50"
      >
        <div
          class="bg-white rounded-2xl p-6 w-80 max-h-[80vh] overflow-y-auto text-right shadow-lg"
        >
          <h2 class="text-lg font-bold mb-4 text-center">
            لیست خرید {{ selectedOrder?.customer }}
          </h2>
          <ul class="text-sm text-[#222] leading-relaxed space-y-3">
            <li
              v-for="(item, idx) in selectedOrder?.items"
              :key="idx"
              class="flex justify-between"
            >
              <span>{{ item.title }}</span>
              <span>{{ item.quantity }}</span>
            </li>
          </ul>

          <div class="flex gap-3 mt-6">
            <button
              @click="closeDrawer"
              class="flex-1 bg-[#222] text-white font-bold px-6 py-2 rounded-full"
            >
              می‌توانم
            </button>
            <button
              @click="closeDrawer"
              class="flex-1 bg-gray-100 text-gray-700 font-bold px-6 py-2 rounded-full"
            >
              نمی‌توانم
            </button>
          </div>
        </div>
      </div>
    </transition>
    <!-- #endregion -->

    <bottomfooter />
  </div>
  <!-- #endregion -->
</template>
<!-- #endregion Template -->

<!-- #region Styles -->
<style scoped>
/* #region Scrollbar */
.orders-scroller::-webkit-scrollbar {
  display: none;
}
/* #endregion */

/* #region Checkbox */
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
  border-right: 2px solid #222;
  border-bottom: 2px solid #222;
  transform: rotate(45deg);
  right: 5px;
  top: 1px;
}
.custom-checkbox.inverted.checked::after {
  border-right: 2px solid #222;
  border-bottom: 2px solid #222;
}
/* #endregion */

/* #region Animations */
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/* #endregion */
</style>
<!-- #endregion Styles -->
