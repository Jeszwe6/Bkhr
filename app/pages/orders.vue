<script setup lang="ts">
/* ============================================================
   #region Imports
   ------------------------------------------------------------
   این بخش برای وارد کردن ماژول‌ها و توابع موردنیاز Vue است.
============================================================ */
import { ref, onMounted } from "vue";
//#endregion

/* ============================================================
   #region State & Data
   ------------------------------------------------------------
   داده‌ها و متغیرهای حالت (Reactive State) در اینجا تعریف می‌شوند.
============================================================ */
const showNotifications = ref(false); // نمایش/عدم نمایش اعلان‌ها
const notifications = ref(["1 پیام جدید ساهره شوکاوی", "1 پیام جدید ودود مقدم"]);
//#endregion

/* ============================================================
   #region Grocery LIST DATA
   ------------------------------------------------------------
   این بخش شامل داده‌های مربوط به سفارش‌ها (لیست خریدها) است.
   هر لیست شامل: شناسه، نام مشتری، خریدار، اقلام و درصد پیشرفت است.
============================================================ */
const orders = ref([
  //#region لیست اول
  {
    id: 1,
    customer: "چهارشنبه بازار",
    buyer: "زهرا مقدم ",
    items: [
      { title: "گوجه گیلاسی", quantity: "نیم کیلو", checked: true },
      { title: "موز", quantity: "نیم کیلو", checked: true },
      { title: "خیار بوته‌ای", quantity: "1 کیلو", checked: true },
      { title: "گیلاس", quantity: "نیم کیلو", checked: true },
      { title: "پیاز", quantity: "نیم کیلو", checked: true },
      { title: "هندونه", quantity: "1 عدد", checked: true },
      { title: "پرتقال", quantity: "نیم کیلو", checked: true },
      { title: "شیر پرچرب", quantity: "1 پاک", checked: true },
      { title: "کاهو", quantity: "1 عدد", checked: true },
      { title: "سیب زمینی", quantity: "1 کیلو", checked: true },
      { title: "فلفل دلمه‌ای", quantity: "نیم کیلو", checked: true },
      { title: "هویج", quantity: "نیم کیلو", checked: true },
      { title: "لیمو ترش", quantity: "نیم کیلو", checked: true },
    ],
    progress: 0,
  },
  //#endregion

  //#region لیست دوم
  {
    id: 2,
    customer: "افق کوروش",
    buyer: "فضیله آل سوف",
    items: [
      { title: "کیک شکلاتی", quantity: "۱ عدد", checked: true },
      { title: "بیسکوییت", quantity: "۲ بسته", checked: false },
      { title: "عسل", quantity: "۱ شیشه", checked: true },
      { title: "چای سیاه", quantity: "۱ بسته", checked: true },
      { title: "قهوه فوری", quantity: "۱ بسته", checked: false },
      { title: "شکلات تلخ", quantity: "۲ عدد", checked: true },
      { title: "مربا", quantity: "۱ شیشه", checked: false },
      { title: "شکر", quantity: "۱ کیلو", checked: true },
    ],
    progress: 0,
  },
  //#endregion

  //#region لیست سوم - لوازم بهداشتی و آرایشی
  {
    id: 3,
    customer: "فروشگاه لوازم بهداشتی",
    buyer: "ساجده شوکاوی ",
    items: [
      { title: "شامپو ضدشوره", quantity: "۱ عدد", checked: true },
      { title: "نرم‌کننده مو", quantity: "۱ عدد", checked: false },
      { title: "صابون آبرسان", quantity: "۲ عدد", checked: true },
      { title: "کرم مرطوب‌کننده", quantity: "۱ عدد", checked: true },
      { title: "دئودورانت اسپری", quantity: "۱ عدد", checked: true },
      { title: "مسواک نرم", quantity: "۱ عدد", checked: false },
      { title: "خمیردندان فلوراید", quantity: "۱ عدد", checked: false },
      { title: "دستمال مرطوب", quantity: "۱ بسته", checked: false },
      { title: "لاک ناخن", quantity: "۱ عدد", checked: false },
      { title: "ژل شستشوی صورت", quantity: "۱ عدد", checked: false },
      { title: "ادکلن زنانه", quantity: "۱ عدد", checked: true },
      { title: "ماسک مو", quantity: "۱ عدد", checked: false },
    ],
    progress: 0,
  },
  //#endregion
  //#region لیست چهارم - لوازم تحریر
  {
    id: 4,
    customer: "فروشگاه لوازم تحریر",
    buyer: "بتول مقدم",
    items: [
      { title: "دفتر ۵۰ برگ", quantity: "۲ عدد", checked: false },
      { title: "خودکار آبی", quantity: "۵ عدد", checked: false },
      { title: "مداد مشکی", quantity: "۵ عدد", checked: false },
      { title: "پاک‌کن", quantity: "۲ عدد", checked: false },
      { title: "خط‌کش ۳۰ سانتی", quantity: "۱ عدد", checked: false },
      { title: "مداد رنگی ۱۲ رنگ", quantity: "۱ بسته", checked: false },
      { title: "ماژیک هایلایت", quantity: "۳ عدد", checked: false },
      { title: "چسب ماتیکی", quantity: "۲ عدد", checked: false },
    ],
    progress: 0,
  },
  //#endregion
]);
//#endregion

/* ============================================================
   #region Methods
   ------------------------------------------------------------
   شامل توابع کمکی برای مدیریت اعلان‌ها، محاسبه‌ی پیشرفت و انیمیشن آیکون‌ها.
============================================================ */

// استخراج پیام از متن اعلان (مثلاً "1 پیام جدید")
const getMessage = (text: string) => {
  const match = text.match(/^\d+\sپیام\sجدید/);
  return match ? match[0] : "";
};

// استخراج نام فرستنده از اعلان (مثل "ساهره شوکاوی")
const getSender = (text: string) => text.replace(/^\d+\sپیام\sجدید\s*/, "");

// محاسبه درصد انجام سفارش بر اساس تعداد تیک خورده‌ها
function updateProgress(order: any) {
  const total = order.items.length;
  const done = order.items.filter((i: any) => i.checked).length;
  order.progress = Math.round((done / total) * 100);
  if (order.progress >= 100) order.progress = 100;
}

// اجرای تابع محاسبه‌ی پیشرفت برای همه سفارش‌ها بعد از لود صفحه
onMounted(() => {
  orders.value.forEach((o) => updateProgress(o));
});

// انیمیشن جهش (bounce) برای کلیک روی آیکون‌ها
const bounce = (event: Event) => {
  const el = (event.currentTarget as HTMLElement).querySelector("svg");
  if (!el) return;

  el.classList.add("bounce");
  setTimeout(() => el.classList.remove("bounce"), 300);
};

// تغییر وضعیت نمایش اعلان‌ها
const toggleNotifications = (event: Event) => {
  showNotifications.value = !showNotifications.value;

  // اجرای انیمیشن bounce روی آیکون زنگ
  const el = (event.currentTarget as HTMLElement).querySelector("svg");
  if (!el) return;
  el.classList.add("animate-bounce");
  setTimeout(() => el.classList.remove("animate-bounce"), 500);
};
//#endregion
</script>
<template>
  <!-- ============================================================
       #region Layout اصلی صفحه
       ------------------------------------------------------------
       این بخش شامل ساختار کلی صفحه و تقسیم‌بندی بخش‌ها است.
  ============================================================ -->
  <div class="w-screen min-h-screen bg-white text-[#101010] flex flex-col">
    <!-- ============================================================
         #region HEADER (ناحیه بالای صفحه با پروفایل و آیکون‌ها)
    ============================================================ -->
    <div class="top-bar flex justify-between items-center p-4 my-5">
      <!-- #region عنوان وسط -->
      <h2 class="font-bold text-2xl">سفارش‌ها</h2>
      <!-- #endregion عنوان -->
      <!-- #region دکمه برگشت سمت چپ -->
      <NuxtLink
        to="/home"
        class="bg-[#101010] text-white rounded-full w-10 h-10 p-2 flex items-center justify-center"
        @click="bounce($event)"
      >
        <Icon name="lucide:arrow-left" size="25" />
      </NuxtLink>
      <!-- #endregion دکمه برگشت -->
    </div>
    <!-- #endregion HEADER -->
    <!-- ============================================================
     #region ORDERS (بخش سفارش‌ها)
============================================================ -->
    <div class="orders-section px-4 mb-5">
      <!-- #region HORIZONTAL SCROLL -->
      <div class="orders-scroller flex gap-6 overflow-x-auto pb-6 pr-2">
        <div
          v-for="order in orders"
          :key="order.id"
          class="order-card flex-none p-5 rounded-3xl shadow-md w-80 flex flex-col relative transition-colors duration-300 overflow-hidden"
          :class="{
            'bg-[#101010]': order.progress >= 100,
            'bg-gray-100': order.progress < 100,
          }"
          style="height: 500px"
        >
          <!-- عنوان سفارش -->
          <h3
            class="font-semibold text-lg mb-1"
            :class="order.progress >= 100 ? 'text-white' : 'text-[#101010]'"
          >
            {{ order.customer }}
          </h3>

          <!-- نام خریدار -->
          <p
            class="text-sm mb-3"
            :class="order.progress >= 100 ? 'text-white' : 'text-[#101010]'"
          >
            لیست خرید: {{ order.buyer }}
          </p>

          <!-- لیست اقلام سفارش -->
          <ul class="flex flex-col gap-2 mb-3 flex-1 overflow-y-auto">
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
                <span :class="order.progress >= 100 ? 'text-white' : 'text-[#101010]'">
                  {{ it.title }}
                </span>
              </label>
              <span :class="order.progress >= 100 ? 'text-[#101010]' : 'text-[#101010]'">
                {{ it.quantity }}
              </span>
            </li>
          </ul>

          <!-- نوار پیشرفت -->
          <div>
            <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden shadow-sm">
              <div
                class="h-full bg-yellow-300 transition-all duration-300"
                :style="{ width: order.progress + '%' }"
              ></div>
            </div>
            <p
              class="text-xs mt-2"
              :class="order.progress >= 100 ? 'text-white' : 'text-[#101010]'"
            >
              {{ order.progress }}% انجام شد
            </p>
          </div>
        </div>
      </div>
      <!-- #endregion HORIZONTAL SCROLL -->
    </div>
    <!-- #endregion ORDERS -->

    <!-- ============================================================
         #region FOOTER
    ============================================================ -->
    <bottomfooter />
    <!-- #endregion FOOTER -->
  </div>
</template>

<style scoped>
/* ============================================================
   #region Scrollbar & Layout
============================================================ */
.orders-scroller::-webkit-scrollbar {
  display: none;
}
.contacts-section {
  direction: rtl;
}

/* ============================================================
   #region Custom Checkbox
============================================================ */
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

/* ============================================================
   #region Bounce Animation
============================================================ */
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
