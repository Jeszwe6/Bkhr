<script lang="ts" setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const languageOpen = ref(false);
const currencyOpen = ref(false);

interface Option {
  id: number;
  label: string;
  icon: string;
}

const options: Option[] = [
  { id: 1, label: "تنظیمات گفتگو", icon: "lucide:message-circle" },
  { id: 2, label: "حریم خصوصی و امنیت", icon: "lucide:lock" },
  { id: 3, label: "اعلان‌ها و صداها", icon: "lucide:bell" },
  { id: 4, label: "داده‌ها و ذخیره‌سازی", icon: "lucide:pie-chart" },
  { id: 5, label: "زبان", icon: "lucide:earth" },
  { id: 6, label: "واحد پول", icon: "lucide:credit-card" },
  { id: 7, label: "تم شب و روز", icon: "lucide:moon-star" },
  { id: 8, label: "دعوت از دوستان", icon: "lucide:send" },
  { id: 9, label: "درباره ما", icon: "lucide:smile" },
  { id: 10, label: "تماس با ما", icon: "lucide:phone" },
  { id: 11, label: "راهنما", icon: "lucide:info" },
];

interface Modal {
  id: number | null;
  title: string;
}

const activeModal = ref<Modal>({ id: null, title: "" });
const excludedIds = [5, 6, 7];

function openModal(id: number, title: string) {
  activeModal.value.id = id;
  activeModal.value.title = title;
}

function closeModal() {
  activeModal.value.id = null;
}

function goHome() {
  window.location.href = "/home";
}

const settings = ref({
  notifications: true,
  language: "fa",
  currency: "IRR",
  darkMode: false,
});

// تنظیمات فونت و سایز
const selectedFont = ref<string>("Tahoma");
const selectedSize = ref<string>("16px");
</script>

<template>
  <div class="flex flex-col h-screen bg-white text-black">
    <!-- Header -->
    <div class="flex justify-between items-center p-4 shadow">
      <h2 class="font-bold text-lg">تنظیمات</h2>
      <NuxtLink
        to="/home"
        class="bg-black text-white rounded-full p-2 flex items-center justify-center"
      >
        <Icon icon="lucide:arrow-left" width="20" height="20" />
      </NuxtLink>
    </div>

    <!-- Main content scrollable -->
    <div class="flex-1 overflow-y-auto px-4 py-2 space-y-4">
      <!-- Options List -->
      <ul class="flex flex-col gap-4">
        <li
          v-for="option in options"
          :key="option.id"
          class="flex items-center justify-between p-3 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200"
          @click="![5, 6, 7].includes(option.id) && openModal(option.id, option.label)"
        >
          <div class="flex items-center gap-3">
            <Icon :icon="option.icon" width="20" height="20" />
            <span>{{ option.label }}</span>
          </div>

          <div class="flex items-center gap-2">
            <!-- Toggle گزینه 7 -->
            <label
              v-if="option.id === 7"
              class="relative inline-flex items-center cursor-pointer"
            >
              <input type="checkbox" v-model="settings.darkMode" class="sr-only peer" />
              <div
                class="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-black transition-all"
              ></div>
              <div
                class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full peer-checked:translate-x-full transition-transform shadow"
              ></div>
            </label>

            <!-- Dropdown زبان -->
            <div
              v-if="option.id === 5"
              class="relative w-32"
              @click.stop="languageOpen = !languageOpen"
            >
              <button
                class="w-full bg-white rounded-full px-4 py-2 text-sm font-medium flex justify-between items-center shadow-sm"
              >
                {{ settings.language === "fa" ? "فارسی" : "English" }}
                <Icon
                  icon="lucide:arrow-down"
                  :class="{ 'rotate-180': languageOpen }"
                  class="w-4 h-4 transition-transform duration-200"
                />
              </button>
              <transition name="fade-slide">
                <ul
                  v-show="languageOpen"
                  class="absolute left-0 mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden z-50"
                >
                  <li
                    v-for="lang in [
                      { label: 'فارسی', value: 'fa' },
                      { label: 'English', value: 'en' },
                    ]"
                    :key="lang.value"
                    @click="
                      settings.language = lang.value;
                      languageOpen = false;
                    "
                    class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {{ lang.label }}
                  </li>
                </ul>
              </transition>
            </div>

            <!-- Dropdown واحد پول -->
            <div
              v-if="option.id === 6"
              class="relative w-32"
              @click.stop="currencyOpen = !currencyOpen"
            >
              <button
                class="w-full bg-white rounded-full px-4 py-2 text-sm font-medium flex justify-between items-center shadow-sm"
              >
                {{ settings.currency === "IRR" ? "ریال" : "تومن" }}
                <Icon
                  icon="lucide:arrow-down"
                  :class="{ 'rotate-180': currencyOpen }"
                  class="w-4 h-4 transition-transform duration-200"
                />
              </button>
              <transition name="fade-slide">
                <ul
                  v-show="currencyOpen"
                  class="absolute left-0 mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden z-50"
                >
                  <li
                    v-for="curr in [
                      { label: 'ریال', value: 'IRR' },
                      { label: 'تومن', value: 'USD' },
                    ]"
                    :key="curr.value"
                    @click="
                      settings.currency = curr.value;
                      currencyOpen = false;
                    "
                    class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {{ curr.label }}
                  </li>
                </ul>
              </transition>
            </div>

            <!-- Drawer button -->
            <button v-if="![5, 6, 7].includes(option.id)" class="p-1">
              <Icon icon="lucide:arrow-left" width="16" height="16" />
            </button>
          </div>
        </li>
      </ul>

      <!-- ✅ متن اضافه‌شده زیر گزینه‌ها -->
      <div
        class="p-4 text-center text-black leading-relaxed"
      >
        <p class="text-md mt-2">ساخته شده با 💜 توسط تیم کدینچی</p>
        <p class="text-md mt-2">v.1.2</p>
      </div>

      <!-- برای تست اسکرول -->
      <div class="h-[30px]"></div>

      <!-- Modals -->
      <div v-for="option in options" :key="'drawer-' + option.id">
        <transition name="drawer-bottom">
          <div
            v-if="activeModal.id === option.id && !excludedIds.includes(option.id)"
            class="fixed inset-0 bg-black/40 flex justify-center items-end z-50"
            @click="closeModal"
          >
            <div
              class="bg-white rounded-t-2xl w-full max-w-md p-4 shadow-lg transform translate-y-1/6 transition-all overflow-hidden"
              @click.stop
            >
              <div class="flex justify-between items-center mb-3">
                <h3 class="font-bold text-lg">{{ option.label }}</h3>
                <button class="text-xl" @click="closeModal">✕</button>
              </div>

              <div class="flex flex-col gap-2">
                <div
                  v-if="option.id === 1"
                  class="h-[80vh] w-full overflow-y-auto p-4 space-y-6 rounded-3xl"
                >
                  <p class="text-gray-700 mb-4 text-center">
                    در این بخش می‌توانید تنظیمات گفتگو و چت‌ها را مدیریت کنید.
                  </p>

                  <div class="p-4 bg-[#eee] rounded-3xl space-y-4 mx-2">
                    <h3 class="font-bold text-black mb-2">تغییر فونت و اندازه متن</h3>

                    <!-- انتخاب فونت -->
                    <div class="flex flex-col gap-2">
                      <span class="text-gray-600">فونت پیام‌ها:</span>
                      <label class="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="IRANSans"
                          v-model="selectedFont"
                          class="appearance-none w-5 h-5 border-2 border-[#888] rounded-full checked:bg-black"
                        />
                        ایران سنس
                      </label>
                      <label class="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="Vazir"
                          v-model="selectedFont"
                          class="appearance-none w-5 h-5 border-2 border-[#888] rounded-full checked:bg-black"
                        />
                        وزیر
                      </label>
                      <label class="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="Shabnam"
                          v-model="selectedFont"
                          class="appearance-none w-5 h-5 border-2 border-[#888] rounded-full checked:bg-black"
                        />
                        شبنم
                      </label>
                      <label class="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="Esteghlal"
                          v-model="selectedFont"
                          class="appearance-none w-5 h-5 border-2 border-[#888] rounded-full checked:bg-black"
                        />
                        استعداد
                      </label>
                    </div>

                    <!-- انتخاب اندازه متن -->
                    <div class="flex flex-col gap-2 w-52 relative" dir="ltr">
                      <span
                        v-if="!selectedSize"
                        class="absolute left-4 top-1/2 -translate-y-1/2 text-[#888] pointer-events-none"
                        >اندازه متن</span
                      >
                      <select
                        v-model="selectedSize"
                        class="w-full pl-4 pr-4 py-2 rounded-full bg-white border border-gray-300 text-gray-700 appearance-none text-center focus:outline-none focus:border-gray-500"
                      >
                        <option value="14px">کوچک</option>
                        <option value="16px">متوسط</option>
                        <option value="18px">بزرگ</option>
                      </select>
                    </div>

                    <!-- پیش‌نمایش -->
                    <div
                      class="mt-4 p-3 bg-white rounded-2xl text-black"
                      :style="{ fontFamily: selectedFont, fontSize: selectedSize }"
                    >
                      این یک پیام نمونه است. فونت و اندازه متن را تغییر دهید تا تغییرات را
                      مشاهده کنید.
                    </div>
                  </div>
                </div>

                <p v-else-if="option.id === 2">متن اختصاصی گزینه ۲</p>
                <p v-else-if="option.id === 3">متن اختصاصی گزینه ۳</p>
                <p v-else-if="option.id === 4">متن اختصاصی گزینه ۴</p>
                <p v-else-if="option.id === 8">متن اختصاصی گزینه ۸</p>
                <p v-else-if="option.id === 9">متن اختصاصی گزینه ۹</p>
                <p v-else-if="option.id === 10">متن اختصاصی گزینه ۱۰</p>
                <p v-else-if="option.id === 11">متن اختصاصی گزینه ۱۱</p>
              </div>

              <div class="flex justify-end mt-4">
                <button class="bg-gray-200 px-4 py-2 rounded" @click="closeModal">
                  بستن
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Footer ثابت -->
    <div class="flex-none">
      <div class="text-center py-2 bg-gray-100 text-gray-700">v.1.2</div>
      <bottomfooter />
    </div>
  </div>
</template>

<style scoped>
/* Transition Drawer */
.drawer-bottom-enter-from,
.drawer-bottom-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.drawer-bottom-enter-to,
.drawer-bottom-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.drawer-bottom-enter-active,
.drawer-bottom-leave-active {
  transition: all 0.3s ease;
}

/* Transition Dropdown */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
