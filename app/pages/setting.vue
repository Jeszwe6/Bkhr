<script lang="ts" setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const copied = ref(false);

function handleCopyInvite() {
  navigator.clipboard.writeText("متن دعوت شما اینجا").then(() => {
    copied.value = true;
    // 2 ثانیه بعد آیکون محو شود
    setTimeout(() => {
      copied.value = false;
    }, 1500); // 0.5s انیمیشن + 1s نمایش = 1.5s
  });
}

// Modals, dropdowns and settings states
const languageOpen = ref(false);
const currencyOpen = ref(false);
const fontSizeOpen = ref(false);
const activityOpen = ref(false);

const passwords = ref({ current: "", new: "", confirm: "" });
const notificationSounds = ref({ messages: true, calls: true, vibration: true });
const dataUsage = ref({ mobile: 120, wifi: 450 });
const autoDownload = ref({ images: true, videos: false, files: false });

const settings = ref({
  notifications: true,
  language: "fa",
  currency: "IRR",
  darkMode: false,
});

// لینک دعوت
const inviteLink = "https://Bkhr.com/invite?code=Bkhr71404";
// به اشتراک‌گذاری لینک دعوت
function shareApp(app: string) {
  const message = `سلام! بیا با این لینک ثبت‌نام کن\n${inviteLink}`;

  switch (app) {
    case "whatsapp":
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
      break;
    case "telegram":
      window.open(
        `https://t.me/share/url?url=${encodeURIComponent(
          inviteLink
        )}&text=${encodeURIComponent("سلام! بیا با این لینک ثبت‌ نام کن")}`,
        "_blank"
      );
      break;
    case "instagram":
      window.navigator.clipboard.writeText(inviteLink);
      alert("لینک کپی شد! آن را در دایرکت اینستاگرام بفرست");
      break;
    case "email":
      window.open(`mailto:?subject=دعوت به برنامه&body=${encodeURIComponent(message)}`);
      break;
    default:
      alert("پلتفرم مورد نظر پشتیبانی نمی‌شود.");
  }
}

// کپی لینک دعوت
const copyInvite = () => {
  window.navigator.clipboard
    .writeText(inviteLink)
    .then(() => alert("لینک کپی شد!"))
    .catch(() => alert("خطا در کپی لینک"));
};

const selectedFont = ref<string>("Tahoma");
const selectedSize = ref<string>("16px");

const activeModal = ref<{ id: number | null; title: string }>({ id: null, title: "" });
const excludedIds = [5, 6, 7];

const options = [
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

const goHome = () => (window.location.href = "/home");

function openModal(id: number, title: string) {
  activeModal.value = { id, title };
}

function closeModal() {
  activeModal.value = { id: null, title: "" };
}

function saveNotificationSettings() {
  alert("تنظیمات اعلان‌ها ذخیره شد ✅");
}

function clearCache() {
  alert("کش برنامه پاک شد 🧹");
}

function savePassword() {
  if (!passwords.value.current || !passwords.value.new || !passwords.value.confirm) {
    alert("لطفاً همه فیلدها را پر کنید.");
    return;
  }
  if (passwords.value.new !== passwords.value.confirm) {
    alert("رمز جدید و تایید آن مطابقت ندارند.");
    return;
  }
  alert("رمز عبور با موفقیت تغییر کرد ✅");
  passwords.value = { current: "", new: "", confirm: "" };
}

// For editing email and password in security modal
const isEditingEmail = ref(false);
const isEditingPassword = ref(false);
const email = ref("user@example.com");
const activityStatus = ref("all");

function saveDataSettings() {
  // به TypeScript بگو این alert مربوط به window هست
  window.alert("تنظیمات داده‌ها و دانلود خودکار ذخیره شد ✅");
}
</script>

<template>
  <div class="flex flex-col h-screen bg-white text-[#222]">
    <!-- Header -->
    <div class="flex justify-between items-center px-4 py-5 shadow-sm mb-8">
      <h2 class="font-bold text-xl">تنظیمات</h2>
      <NuxtLink
        to="/home"
        class="bg-[#222] text-white rounded-full w-10 h-10 p-2 flex items-center justify-center"
      >
        <Icon icon="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
    </div>

    <!-- Main scrollable content -->
    <div class="flex-1 overflow-y-auto px-4 py-2 space-y-4">
      <!-- Options List -->
      <ul class="flex flex-col gap-4">
        <li
          v-for="option in options"
          :key="option.id"
          class="flex items-center justify-between p-3 bg-gray-100 cursor-pointer shadow-sm rounded-3xl"
          @click="![5, 6, 7].includes(option.id) && openModal(option.id, option.label)"
        >
          <div class="flex items-center gap-3">
            <Icon :icon="option.icon" width="20" height="20" />
            <span>{{ option.label }}</span>
          </div>
          <div class="flex items-center gap-2">
            <!-- Toggle dark mode -->
            <label
              v-if="option.id === 7"
              class="relative inline-flex items-center cursor-pointer"
            >
              <input type="checkbox" v-model="settings.darkMode" class="sr-only peer" />
              <div
                class="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-[#222] transition-all"
              ></div>
              <div
                class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full peer-checked:translate-x-full transition-transform shadow"
              ></div>
            </label>

            <!-- Dropdown Language -->
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

            <!-- Dropdown Currency -->
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

            <!-- Drawer icon -->
            <button v-if="![5, 6, 7].includes(option.id)" class="p-1">
              <Icon icon="lucide:arrow-left" width="16" height="16" />
            </button>
          </div>
        </li>
      </ul>

      <!-- Footer text -->
      <div class="p-4 text-center text-[#222] leading-relaxed">
        <p class="text-md mt-2">ساخته شده با 💜 توسط تیم کُدینچی</p>
        <p class="text-md mt-2 mb-4">v.1.2</p>
      </div>

      <div class="h-[30px]"></div>

      <!-- Modals -->
      <div v-for="option in options" :key="'drawer-' + option.id">
        <transition name="drawer-bottom">
          <div
            v-if="activeModal.id === option.id && !excludedIds.includes(option.id)"
            class="fixed inset-0 bg-[#2222226b] flex justify-center items-end z-50"
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
                <!--#region-Chat-Settings-->
                <div
                  v-if="option.id === 1"
                  class="h-[85vh] w-full p-5 flex flex-col gap-6 rounded-3xl bg-white"
                >
                  <p class="text-gray-700 mb-4 text-center">
                    در این بخش می‌توانید تنظیمات گفتگو و چت‌ها را مدیریت کنید.
                  </p>
                  <div
                    class="rounded-3xl shadow-sm p-5 border border-black/10 bg-white flex flex-col gap-4"
                  >
                    <h3 class="font-bold text-[#222] mb-2">تغییر فونت و اندازه متن</h3>
                    <div class="flex flex-col gap-2">
                      <span class="text-gray-600">فونت پیام‌ها:</span>
                      <label class="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="IRANSans"
                          v-model="selectedFont"
                          class="appearance-none w-5 h-5 border-2 border-gray-700 rounded-full checked:bg-[#222]"
                        />
                        ایران سنس
                      </label>
                      <label class="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="Vazir"
                          v-model="selectedFont"
                          class="appearance-none w-5 h-5 border-2 border-gray-700 rounded-full checked:bg-[#222]"
                        />
                        وزیر
                      </label>
                      <label class="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="Shabnam"
                          v-model="selectedFont"
                          class="appearance-none w-5 h-5 border-2 border-gray-700 rounded-full checked:bg-[#222]"
                        />
                        شبنم
                      </label>
                      <label class="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="Esteghlal"
                          v-model="selectedFont"
                          class="appearance-none w-5 h-5 border-2 border-gray-700 rounded-full checked:bg-[#222]"
                        />
                        استعداد
                      </label>
                    </div>
                    <!-- Font Size -->
                    <div class="relative w-52" @click.stop="fontSizeOpen = !fontSizeOpen">
                      <button
                        class="w-full bg-gray-100 border border-gray-100 rounded-full px-4 py-2 text-sm font-medium flex justify-between items-center shadow-sm transition-all"
                      >
                        <span class="text-gray-700">
                          {{
                            selectedSize === "14px"
                              ? "کوچک"
                              : selectedSize === "16px"
                              ? "متوسط"
                              : selectedSize === "18px"
                              ? "بزرگ"
                              : "انتخاب اندازه"
                          }}
                        </span>
                        <Icon
                          icon="lucide:arrow-down"
                          :class="{ 'rotate-180': fontSizeOpen }"
                          class="w-4 h-4 text-gray-500 transition-transform duration-200"
                        />
                      </button>
                      <transition name="fade-slide">
                        <ul
                          v-show="fontSizeOpen"
                          class="absolute left-0 mt-2 w-full bg-gray-100 rounded-lg shadow-lg overflow-hidden border border-gray-100 z-50"
                        >
                          <li
                            v-for="size in [
                              { label: 'کوچک', value: '14px' },
                              { label: 'متوسط', value: '16px' },
                              { label: 'بزرگ', value: '18px' },
                            ]"
                            :key="size.value"
                            @click="
                              selectedSize = size.value;
                              fontSizeOpen = false;
                            "
                            class="px-4 py-2 text-sm text-gray-700 cursor-pointer text-center"
                          >
                            {{ size.label }}
                          </li>
                        </ul>
                      </transition>
                    </div>
                    <!-- Preview -->
                    <div
                      class="mt-4 p-3 bg-gray-100 rounded-2xl text-[#222] shadow-sm"
                      :style="{ fontFamily: selectedFont, fontSize: selectedSize }"
                    >
                      این یک پیام نمونه است. فونت و اندازه متن را تغییر دهید تا تغییرات را
                      مشاهده کنید.
                    </div>
                  </div>
                </div>
                <!--#endregion-->
                <!--#region-Security-Privacy-->
                <div
                  v-else-if="option.id === 2"
                  class="h-[80vh] w-full p-5 flex flex-col gap-6 rounded-3xl bg-white"
                >
                  <!-- Scrollable content -->
                  <div class="flex-1 overflow-y-auto space-y-6">
                    <!-- Last seen -->
                    <div
                      class="rounded-3xl shadow-sm p-5 border border-black/10 bg-white flex flex-col gap-4"
                    >
                      <h3 class="font-bold text-[#222] text-lg">
                        آخرین بازدید و آنلاین بودن
                      </h3>
                      <div
                        class="relative w-full"
                        @click.stop="activityOpen = !activityOpen"
                      >
                        <label
                          class="flex items-center justify-between p-3 bg-gray-100 rounded-full cursor-pointer select-none shadow-sm"
                        >
                          <span class="text-[#222]">نمایش وضعیت به:</span>
                          <div class="flex items-center gap-2">
                            <span class="font-medium text-[#222]">
                              {{ activityStatus === "all" ? "همه" : "مخاطبین" }}
                            </span>
                            <Icon
                              icon="lucide:arrow-down"
                              :class="{ 'rotate-180': activityOpen }"
                              class="w-5 h-5 text-[#222] transition-transform duration-200"
                            />
                          </div>
                        </label>
                        <transition name="fade-slide">
                          <ul
                            v-show="activityOpen"
                            class="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg overflow-hidden border border-black/10 z-50"
                          >
                            <li
                              v-for="option in [
                                { label: 'همه', value: 'all' },
                                { label: 'مخاطبین', value: 'contacts' },
                              ]"
                              :key="option.value"
                              @click="
                                activityStatus = option.value;
                                activityOpen = false;
                              "
                              class="px-4 py-2 text-center cursor-pointer text-[#222] font-medium transition-all"
                            >
                              {{ option.label }}
                            </li>
                          </ul>
                        </transition>
                      </div>
                    </div>

                    <!-- Password Change -->
                    <div
                      class="rounded-3xl shadow-sm p-5 border border-black/10 bg-white flex flex-col gap-5"
                    >
                      <div class="flex items-center justify-between">
                        <h3 class="font-semibold text-[#222] text-lg">تغییر رمز عبور</h3>
                        <button
                          class="text-sm text-yellow-400 font-medium"
                          @click="isEditingPassword = !isEditingPassword"
                        >
                          {{ isEditingPassword ? "ذخیره" : "ویرایش" }}
                        </button>
                      </div>
                      <div class="space-y-3">
                        <input
                          type="password"
                          placeholder="رمز فعلی"
                          v-model="passwords.current"
                          :readonly="!isEditingPassword"
                          :class="[
                            'w-full px-4 py-3 rounded-full text-sm focus:outline-none transition-all shadow-sm',
                            isEditingPassword
                              ? 'bg-white border border-yellow-400'
                              : 'bg-gray-100 cursor-not-allowed text-[#222]',
                          ]"
                        />
                        <input
                          type="password"
                          placeholder="رمز جدید"
                          v-model="passwords.new"
                          :readonly="!isEditingPassword"
                          :class="[
                            'w-full px-4 py-3 rounded-full text-sm focus:outline-none transition-all shadow-sm',
                            isEditingPassword
                              ? 'bg-white border border-yellow-400'
                              : 'bg-gray-100 cursor-not-allowed text-[#222]',
                          ]"
                        />
                        <input
                          type="password"
                          placeholder="تأیید رمز جدید"
                          v-model="passwords.confirm"
                          :readonly="!isEditingPassword"
                          :class="[
                            'w-full px-4 py-3 rounded-full text-sm focus:outline-none transition-all shadow-sm',
                            isEditingPassword
                              ? 'bg-white border border-yellow-400'
                              : 'bg-gray-100 cursor-not-allowed text-[#222]',
                          ]"
                        />
                      </div>
                      <button
                        class="w-full bg-[#222] text-white font-bold py-3 rounded-full active:scale-95 transition-transform shadow-md"
                        @click="savePassword"
                      >
                        ذخیره تغییرات
                      </button>
                    </div>
                  </div>
                </div>
                <!--#endregion-->
                <!--#region-Notifications-->
                <div
                  v-else-if="option.id === 3"
                  class="h-[60vh] w-full overflow-y-auto p-4 space-y-6 rounded-3xl"
                >
                  <div class="p-5 bg-white rounded-3xl shadow-sm flex flex-col gap-4">
                    <div
                      class="flex items-center justify-between bg-gray-100 p-3 rounded-full shadow-sm"
                    >
                      <span class="text-gray-700 font-medium">فعال بودن اعلان‌ها</span>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          v-model="settings.notifications"
                          class="sr-only peer"
                        />
                        <div
                          class="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-[#222] transition-all"
                        ></div>
                        <div
                          class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full peer-checked:translate-x-full transition-transform shadow"
                        ></div>
                      </label>
                    </div>

                    <div
                      class="flex flex-col gap-3 bg-gray-100 p-4 rounded-3xl shadow-sm"
                    >
                      <label class="flex items-center justify-between cursor-pointer">
                        <span class="text-gray-700">صدای پیام‌ها</span>
                        <input
                          type="checkbox"
                          v-model="notificationSounds.messages"
                          class="w-5 h-5 accent-[#222]"
                        />
                      </label>
                      <label class="flex items-center justify-between cursor-pointer">
                        <span class="text-gray-700">صدای تماس‌ها</span>
                        <input
                          type="checkbox"
                          v-model="notificationSounds.calls"
                          class="w-5 h-5 accent-[#222]"
                        />
                      </label>
                      <label class="flex items-center justify-between cursor-pointer">
                        <span class="text-gray-700">ویبره هنگام اعلان</span>
                        <input
                          type="checkbox"
                          v-model="notificationSounds.vibration"
                          class="w-5 h-5 accent-[#222]"
                        />
                      </label>
                    </div>

                    <button
                      class="bg-[#222] text-white font-bold py-3 rounded-full active:scale-95 transition-all"
                      @click="saveNotificationSettings"
                    >
                      ذخیره تغییرات
                    </button>
                  </div>
                </div>
                <!--#endregion-->
                <!--#region-Data-Storage-->
                <div
                  v-else-if="option.id === 4"
                  class="h-[70vh] w-full overflow-y-auto p-4 space-y-6 rounded-3xl"
                >
                  <div class="p-5 bg-white rounded-3xl shadow-sm flex flex-col gap-5">
                    <div class="bg-gray-100 p-4 rounded-3xl shadow-sm">
                      <h4 class="font-bold text-gray-700 mb-2">مصرف اینترنت</h4>
                      <div class="flex justify-between items-center text-gray-700">
                        <span>استفاده از داده موبایل:</span
                        ><span>{{ dataUsage.mobile }} MB</span>
                      </div>
                      <div class="flex justify-between items-center text-gray-700">
                        <span>استفاده از وای‌فای:</span
                        ><span>{{ dataUsage.wifi }} MB</span>
                      </div>
                    </div>
                    <div class="bg-gray-100 p-4 rounded-3xl space-y-2 shadow-sm">
                      <h4 class="font-bold text-gray-700 mb-2">دانلود خودکار رسانه‌ها</h4>
                      <label class="flex items-center justify-between cursor-pointer"
                        ><span class="text-gray-700">تصاویر</span
                        ><input
                          type="checkbox"
                          v-model="autoDownload.images"
                          class="w-5 h-5 accent-[#222]"
                      /></label>
                      <label class="flex items-center justify-between cursor-pointer"
                        ><span class="text-gray-700">ویدیوها</span
                        ><input
                          type="checkbox"
                          v-model="autoDownload.videos"
                          class="w-5 h-5 accent-[#222]"
                      /></label>
                      <label class="flex items-center justify-between cursor-pointer"
                        ><span class="text-gray-700">فایل‌ها</span
                        ><input
                          type="checkbox"
                          v-model="autoDownload.files"
                          class="w-5 h-5 accent-[#222]"
                      /></label>
                    </div>
                    <!-- ***برای آپدیت بعدی ***
                    <div class="bg-gray-100 p-4 rounded-3xl">
                      <h4 class="font-bold text-gray-700 mb-2">حافظه و کش برنامه</h4>
                      <p class="text-gray-600 text-sm leading-relaxed mb-4">
                        می‌توانید داده‌های موقت و فایل‌های غیرضروری را برای آزادسازی حافظه
                        پاک کنید.
                      </p>
                      <button
                        class="w-full bg-red-500 text-white py-3 rounded-full font-bold active:scale-95 transition-all"
                        @click="clearCache"
                      >
                        پاک‌سازی کش
                      </button>
                    </div>
                    -->
                    <button
                      class="w-full bg-[#222] text-white font-bold py-3 rounded-full active:scale-95 transition-all shadow-md"
                      @click="saveDataSettings"
                    >
                      ذخیره تغییرات
                    </button>
                  </div>
                </div>
                <!--#endregion-->
                <!--#region-Invite-Friends-->
                <div
                  v-else-if="option.id === 8"
                  class="h-[58vh] w-full overflow-y-auto p-4 space-y-6 rounded-3xl"
                >
                  <div class="text-center grid gap-5">
                    <p>دوستان خود را با لینک زیر دعوت کنید:</p>
                    <!-- لینک دعوت -->
                    <input
                      type="text"
                      readonly
                      :value="inviteLink"
                      class="w-full p-3 rounded-full bg-gray-100 text-[#222] text-center shadow-sm"
                    />
                    <button
                      @click="copyInvite"
                      class="px-4 py-2 bg-[#222] text-white rounded-full items-center"
                    >
                      کپی لینک
                    </button>
                  </div>
                  <!-- کد دعوت مخصوص -->
                  <div class="my-5">
                    <p>کد دعوت مخصوص شما:</p>
                    <div
                      class="flex items-center justify-between bg-gray-100 p-3 rounded-full my-5 shadow-sm"
                    >
                      <span class="font-mono font-semibold text-yellow-400 mr-2"
                        >Bkhr71404</span
                      >
                      <button
                        @click="handleCopyInvite"
                        class="relative flex items-center justify-center w-24 h-10 text-[#222] overflow-hidden"
                      >
                        <span
                          v-show="!copied"
                          class="transition-opacity duration-200 font-semibold"
                          >کپی</span
                        >

                        <Icon
                          v-show="copied"
                          icon="lucide:circle-check"
                          width="25"
                          height="25"
                          class="absolute text-[#222] animate-check"
                        />
                      </button>
                    </div>
                  </div>

                  <!-- گزینه اشتراک در اپ‌ها -->
                  <div class="my-5">
                    <div class="flex justify-around">
                      <!-- واتساپ -->
                      <button
                        @click="shareApp('whatsapp')"
                        class="flex flex-col items-center text-green-600"
                      >
                        <Icon icon="logos:whatsapp-icon" class="w-8 h-8" />
                      </button>

                      <!-- تلگرام -->
                      <button
                        @click="shareApp('telegram')"
                        class="flex flex-col items-center"
                      >
                        <Icon icon="logos:telegram" class="w-8 h-8" />
                      </button>

                      <!-- اینستاگرام -->
                      <button
                        @click="shareApp('instagram')"
                        class="flex flex-col items-center text-pink-600"
                      >
                        <Icon icon="skill-icons:instagram" class="w-8 h-8" />
                      </button>

                      <!-- ایمیل -->
                      <button
                        @click="shareApp('email')"
                        class="flex flex-col items-center text-gray-600"
                      >
                        <Icon icon="logos:google-gmail" class="w-8 h-8" />
                      </button>
                    </div>
                  </div>
                </div>
                <!--#endregion-->
                <!--#region-ABout-Codinci-->
                <div
                  v-else-if="option.id === 9"
                  class="h-[25vh] w-full px-3 flex flex-col gap-6 bg-white text-center mt-5"
                >
                  <div class="text-[#222] leading-relaxed">
                    تیم
                    <span
                      class="inline-block align-middle transform bg-yellow-400 text-[#222] mx-1.5 rotate-2"
                    >
                      کُدینچی
                    </span>
                    با اپلیکیشن
                    <span
                      class="inline-block align-middle transform bg-yellow-400 text-[#222] mx-1.5 -rotate-2"
                    >
                      بخر
                    </span>
                    اینجاست تا خرید کردن رو برای شما ساده و سریع کنه.<br />
                    هر ویژگی و هر به‌روزرسانی با
                    <span
                      class="inline-block align-middle transform bg-yellow-400 text-[#222] mx-1.5 rotate-1"
                    >
                      هدف راحتی
                    </span>
                    <span
                      class="inline-block align-middle transform bg-yellow-400 text-[#222] mx-1.5 rotate-1"
                    >
                      و رضایت شما
                    </span>
                    طراحی شده است.
                  </div>
                </div>
                <!--#endregion-->
                <!--#region-Contact-COdinci-Team-->
                <div
                  v-else-if="option.id === 10"
                  class="h-[50vh] w-full px-3 flex flex-col gap-6 bg-white text-center mt-5"
                >
                  <p class="text-gray-600 leading-7 mb-4">
                    ما همیشه دوست داریم صدای شما را بشنویم 💜<br />
                    می‌توانید از طریق یکی از گزینه‌های زیر با ما در ارتباط باشید:
                  </p>

                  <div class="flex flex-col sm:flex-row gap-4">
                    <!-- ایمیل -->
                    <a
                      href="https://mail.google.com/mail/?view=cm&to=jessmafmbt@gmail.com"
                      target="_blank"
                      class="flex items-center gap-2 bg-gray-100 text-[#222] p-3 rounded-full shadow-sm"
                    >
                      <Icon icon="lucide:mail" class="w-5 h-5" />
                      ارسال ایمیل
                    </a>

                    <!-- چت آنلاین -->
                    <RouterLink
                      to="/contactus"
                      class="flex items-center gap-2 bg-gray-100 text-[#222] p-3 rounded-full shadow-sm"
                    >
                      <Icon icon="lucide:headset" class="w-5 h-5" />
                      چت آنلاین
                    </RouterLink>

                    <!-- ارسال تیکت -->
                    <RouterLink
                      to="/submit-ticket"
                      class="flex items-center gap-2 bg-gray-100 text-[#222] p-3 rounded-full shadow-sm"
                    >
                      <Icon icon="lucide:message-circle" class="w-5 h-5" />
                      ارسال تیکت
                    </RouterLink>
                  </div>
                </div>
                <!--#endregion-->
                <!--#region-Help-->
                <div
                  v-else-if="option.id === 11"
                  class="h-[50vh] w-full px-3 flex flex-col gap-6 bg-white text-center mt-5"
                >
                  <p class="text-gray-700 leading-7 mb-4">
                    برای دریافت راهنمایی می‌توانید از یکی از گزینه‌های زیر استفاده کنید:
                  </p>
                  <div class="flex flex-col sm:flex-row gap-4">
                    <!-- پرسش‌های متداول -->
                    <RouterLink
                      to="/faq"
                      class="flex items-center gap-2 bg-gray-100 text-[#222] p-3 rounded-full shadow-sm"
                    >
                      <Icon icon="lucide:info" class="h-5 w-5" />
                      پرسش‌های متداول
                    </RouterLink>

                    <!-- پرسیدن سوال -->
                    <RouterLink
                      to="/ask-question"
                      class="flex items-center gap-2 bg-gray-100 text-[#222] p-3 rounded-full shadow-sm"
                    >
                      <Icon icon="lucide:circle-question-mark" class="h-5 w-5" />

                      پرسیدن سوال
                    </RouterLink>

                    <!-- سیاست حریم خصوصی -->
                    <RouterLink
                      to="/privacy-policy"
                      class="flex items-center gap-2 bg-gray-100 text-[#222] p-3 rounded-full shadow-sm"
                    >
                      <Icon icon="lucide:ghost" class="h-5 w-5" />

                      سیاست حریم خصوصی
                    </RouterLink>
                  </div>
                </div>
                <!--#endregion-->
              </div>
              <div class="flex justify-end mt-4">
                <button
                  class="bg-gray-200 px-4 py-2 rounded"
                  @click="closeModal"
                ></button>
                <!--#endregion-->
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Footer -->
    <div class="flex-none">
      <bottomfooter />
      <!--#endregion-->
    </div>
  </div>
</template>

<style scoped>
/* Drawer transition */
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

/* Dropdown transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/*انیمیشن تیک کپی لینک */
@keyframes check-anim {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-check {
  animation: check-anim 0.5s ease forwards;
}
</style>
