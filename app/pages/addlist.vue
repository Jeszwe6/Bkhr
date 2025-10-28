<script setup lang="ts">
import { ref, reactive } from "vue";
import { Icon } from "@iconify/vue";

// لیست محصولات اضافه شده
interface ProductItem {
  name: string;
  quantity: number;
  unit: string;
}

const productList = ref<ProductItem[]>([]);

// واحدها
const units = ["کیلو", "عدد", "پاکت", "جعبه"];

// input جدید
const newItem = reactive({
  name: "",
  quantity: 1,
  unit: units[0], // همیشه مقدار string پیش‌فرض
});

// کنترل نمایش input جدید
const addingItem = ref(false);

// کنترل باز شدن منوها
const contactsOpen = ref(false);
const menuOpen = ref(false);

// نمونه مخاطبین آنلاین
const contacts = ref([
  { id: 1, name: "علی", online: true },
  { id: 2, name: "سارا", online: false },
  { id: 3, name: "مریم", online: true },
]);

// اضافه کردن آیتم به لیست
const addItem = () => {
  if (!newItem.name.trim()) return;

  productList.value.push({
    name: newItem.name,
    quantity: newItem.quantity,
    unit: newItem.unit as string, // ⚡ assertion برای TypeScript
  });

  // ریست کردن input
  newItem.name = "";
  newItem.quantity = 1;
  newItem.unit = units[0];
  addingItem.value = false;
};

// حذف آیتم
const removeItem = (index: number) => {
  productList.value.splice(index, 1);
};
</script>

<template>
  <div dir="rtl" class="min-h-screen bg-gray-50 relative pb-24">
    <!-- Header -->
    <header
      class="flex justify-between items-center p-4 shadow-sm bg-white sticky top-0 z-20"
    >
      <div class="flex items-center gap-3">
        <!-- Contacts -->
        <div class="relative">
          <button
            @click="contactsOpen = !contactsOpen"
            class="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <Icon icon="lucide:users" class="w-6 h-6 text-black" />
          </button>
          <transition name="fade-slide">
            <ul
              v-show="contactsOpen"
              class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl overflow-hidden z-50"
            >
              <li
                v-for="c in contacts"
                :key="c.id"
                class="px-4 py-2 flex justify-between items-center hover:bg-gray-100 cursor-pointer"
              >
                {{ c.name }}
                <span
                  :class="c.online ? 'bg-green-500' : 'bg-gray-400'"
                  class="w-3 h-3 rounded-full"
                ></span>
              </li>
            </ul>
          </transition>
        </div>

        <!-- History -->
        <button class="p-2 rounded-full hover:bg-gray-100 transition">
          <Icon icon="lucide:clock" class="w-6 h-6 text-black" />
        </button>

        <!-- Menu 3 نقطه -->
        <div class="relative">
          <button
            @click="menuOpen = !menuOpen"
            class="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <Icon icon="lucide:more-vertical" class="w-6 h-6 text-black" />
          </button>
          <transition name="fade-slide">
            <ul
              v-show="menuOpen"
              class="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-xl overflow-hidden z-50"
            >
              <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">تنظیمات</li>
              <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">حذف همه</li>
              <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">راهنما</li>
            </ul>
          </transition>
        </div>
      </div>
    </header>

    <!-- لیست محصولات -->
    <main class="px-4 mt-4 flex flex-col gap-3">
      <!-- آیتم‌ها -->
      <div
        v-for="(item, index) in productList"
        :key="index"
        class="bg-white rounded-xl shadow-md p-4 flex justify-between items-center transition hover:scale-[1.03]"
      >
        <div class="flex items-center gap-3">
          <Icon icon="lucide:package" class="w-6 h-6 text-gray-700" />
          <div>
            <div class="font-semibold text-gray-800">{{ item.name }}</div>
            <div class="text-sm text-gray-500">{{ item.quantity }} {{ item.unit }}</div>
          </div>
        </div>
        <button
          @click="removeItem(index)"
          class="text-red-500 hover:text-red-700 transition"
        >
          <Icon icon="lucide:trash-2" class="w-5 h-5" />
        </button>
      </div>

      <!-- Input جدید -->
      <transition name="fade-slide">
        <div
          v-if="addingItem"
          class="bg-white rounded-xl shadow-md p-4 flex flex-wrap gap-3 items-center"
        >
          <input
            v-model="newItem.name"
            placeholder="نام محصول"
            class="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
          />
          <input
            v-model.number="newItem.quantity"
            type="number"
            min="1"
            class="w-24 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
          />
          <select
            v-model="newItem.unit"
            class="border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
          >
            <option v-for="u in units" :key="u" :value="u">{{ u }}</option>
          </select>
          <button
            @click="addItem"
            class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition shadow-md"
          >
            افزودن
          </button>
        </div>
      </transition>
    </main>

    <!-- دکمه + چسبیده پایین -->
    <button
      @click="addingItem = true"
      class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white p-5 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-transform z-50"
    >
      <Icon icon="lucide:plus" class="w-6 h-6" />
    </button>
  </div>
</template>

<style scoped>
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
