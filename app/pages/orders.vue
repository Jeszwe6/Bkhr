<script setup lang="ts">
/* ============================================================
   📦 ایمپورت‌ها
============================================================ */
import { ref } from "vue";

/* ============================================================
   🧮 داده‌ها (Orders + وضعیت آکاردئون)
============================================================ */
// آرایه‌ای از سفارش‌ها با جزئیات خریدار و آیتم‌ها
const orders = ref([
  {
    id: 1,
    customer: "چهارشنبه بازار",
    buyer: "زهرا مقدم",
    items: [
      { title: "گوجه گیلاسی", quantity: "نیم کیلو", checked: false },
      { title: "موز", quantity: "نیم کیلو", checked: false },
      { title: "خیار بوته‌ای", quantity: "۱ کیلو", checked: false },
    ],
  },
  {
    id: 2,
    customer: "افق کوروش",
    buyer: "فضیله آل سوف",
    items: [
      { title: "کیک شکلاتی", quantity: "۱ عدد", checked: false },
      { title: "بیسکوییت", quantity: "۲ بسته", checked: false },
    ],
  },
  {
    id: 3,
    customer: "فروشگاه لوازم بهداشتی",
    buyer: "ساجده شوکاوی",
    items: [
      { title: "شامپو ضدشوره", quantity: "۱ عدد", checked: false },
      { title: "نرم‌کننده مو", quantity: "۱ عدد", checked: false },
    ],
  },
  {
    id: 4,
    customer: "فروشگاه لوازم تحریر",
    buyer: "بتول مقدم",
    items: [
      { title: "دفتر ۵۰ برگ", quantity: "۲ عدد", checked: false },
      { title: "خودکار آبی", quantity: "۵ عدد", checked: false },
    ],
  },
]);

// آرایه‌ای برای ذخیره‌ی شناسه‌ی سفارش‌هایی که باز شده‌اند
const expandedOrders = ref<number[]>([]);

/* ============================================================
   ⚙️ توابع
============================================================ */
// باز یا بسته کردن هر سفارش با توجه به id
const toggleOrder = (id: number) => {
  if (expandedOrders.value.includes(id)) {
    // اگر باز است، ببند
    expandedOrders.value = expandedOrders.value.filter((x) => x !== id);
  } else {
    // اگر بسته است، باز کن
    expandedOrders.value.push(id);
  }
};
</script>

<template>
  <!-- کانتینر اصلی کل صفحه -->
  <div class="w-screen min-h-screen bg-white text-[#222] flex flex-col px-4">
    <!-- ================= HEADER ================= -->
    <div class="top-bar flex justify-between items-center py-5 mt-8">
      <!-- 🔹 عنوان صفحه -->
      <h2 class="font-bold text-2xl">سفارش‌ها</h2>

      <!-- 🔹 دکمه برگشت -->
      <NuxtLink
        to="/home"
        class="bg-[#222] text-white rounded-full w-10 h-10 p-2 flex items-center justify-center"
      >
        <Icon name="lucide:arrow-left" size="25" />
      </NuxtLink>
    </div>

    <!-- ================= ORDERS LIST ================= -->
    <div class="flex flex-col gap-3 my-5">
      <!-- حلقه‌ی تکرار برای هر سفارش -->
      <div
        v-for="order in orders"
        :key="order.id"
        class="rounded-3xl overflow-hidden shadow-sm transition-all"
      >
        <!-- ✅ بخش کلیک‌پذیر هدر سفارش -->
        <button
          class="w-full flex justify-between items-center px-4 py-3 bg-gray-100 text-[#222] font-semibold rounded-3xl"
          @click="toggleOrder(order.id)"
        >
          <!-- 🔸 خریدار و تعداد آیتم‌ها -->
          <div>
            {{ order.buyer }}
            <span class="text-sm text-gray-500 ml-2">
              ({{ order.items.length }} آیتم)
            </span>
          </div>

          <!-- 🔸 آیکون فلش پایین -->
          <Icon
            name="lucide:chevron-down"
            :class="{
              'rotate-180 transition-transform duration-300': expandedOrders.includes(
                order.id
              ),
            }"
            class="w-5 h-5"
          />
        </button>

        <!-- ✅ محتوای آکاردئون (آیتم‌های سفارش) -->
        <transition name="accordion" appear>
          <div v-show="expandedOrders.includes(order.id)" class="px-4 py-2 bg-white">
            <!-- لیست آیتم‌های داخل هر سفارش -->
            <ul class="flex flex-col gap-2">
              <li
                v-for="(item, idx) in order.items"
                :key="idx"
                class="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-3xl"
              >
                <!-- 🔹 چک‌باکس و عنوان محصول -->
                <label class="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" v-model="item.checked" class="custom-checkbox" />
                  <span>{{ item.title }}</span>
                </label>
                <!-- 🔹 مقدار محصول -->
                <span class="text-gray-600">{{ item.quantity }}</span>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>

    <!-- ================= FOOTER ================= -->
    <bottomfooter />
  </div>
</template>

<style scoped>
/* ============================================================
   🟢 استایل چک‌باکس سفارشی
============================================================ */
.custom-checkbox {
  width: 20px;
  height: 20px;
  border-radius: 9999px; /* گرد کامل */
  border: 2px solid #222;
  appearance: none;
  -webkit-appearance: none;
  background-color: white;
  display: inline-block;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* حالت انتخاب شده */
.custom-checkbox:checked {
  background-color: #222;
}

/* علامت تیک در حالت انتخاب */
.custom-checkbox:checked::after {
  content: "";
  position: absolute;
  width: 6px;
  height: 10px;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  top: 2px;
  left: 6px;
  transform: rotate(45deg);
}

/* ============================================================
   🟡 انیمیشن باز و بسته شدن آکاردئون
============================================================ */
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}

.accordion-enter-to,
.accordion-leave-from {
  max-height: 500px; /* ارتفاع کافی برای نمایش */
  opacity: 1;
}
</style>
