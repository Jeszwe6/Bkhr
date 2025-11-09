<script setup>
//#region Imports
// 📦 وارد کردن ابزارهای مورد نیاز از Vue
import { ref, computed } from "vue";
import { navigateTo } from "#app";
//#endregion

//#region Reactive-States
// 🧠 تعریف متغیرهای واکنشی (Reactive)
const name = ref("");
const password = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);

const showModal = ref(false);
const recoveryEmail = ref("");
//#endregion

//#region Password-Toggle
// 👁️ تغییر نمایش رمز عبور
const togglePassword = () => (showPassword.value = !showPassword.value);
//#endregion

//#region Modal-Handlers
// 📩 کنترل باز و بسته شدن پنجره بازیابی رمز عبور
const openModal = () => (showModal.value = true);
const closeModal = () => (showModal.value = false);
//#endregion

//#region Form-Validation
// ✅ بررسی صحت ورود اطلاعات
const isFormValid = computed(() => {
  return name.value.trim() !== "" && password.value !== "";
});
//#endregion

//#region Form-Submission
// 🚀 ارسال فرم و هدایت کاربر به صفحه خانه
const submitForm = () => {
  if (isFormValid.value) {
    navigateTo("/home");
  } else {
    alert("لطفاً نام و رمز عبور خود را وارد کنید.");
  }
};
//#endregion

//#region Password-Recovery
// 🔁 ارسال درخواست بازیابی رمز عبور
const sendRecovery = () => {
  if (!recoveryEmail.value.trim()) {
    alert("لطفاً ایمیل خود را وارد کنید.");
    return;
  }
  alert(`لینک بازیابی به ${recoveryEmail.value} ارسال شد.`);
  recoveryEmail.value = "";
  closeModal();
};
//#endregion
</script>

<template>
  <!--#region Main-Container -->
  <transition name="fade">
    <div
      class="relative w-screen h-screen bg-white flex flex-col justify-center items-center p-6"
    >
      <h1 class="text-3xl font-bold mb-6 dark:text-[#222]">ورود</h1>

      <!--#region Login-Form -->
      <div class="w-full max-w-sm space-y-4">
        <!--#region Username-Field -->
        <div class="flex items-center bg-[#eee] rounded-full px-4 py-2 shadow-sm">
          <Icon class="text-gray-700 ml-2" name="lucide:user-round" size="20" />
          <input
            type="text"
            v-model="name"
            placeholder="نام"
            class="flex-1 bg-transparent outline-none dark:text-gray-700"
          />
        </div>
        <!--#endregion -->

        <!--#region Password-Field -->
        <div
          class="flex items-center bg-[#eee] rounded-full px-4 py-2 relative shadow-sm"
        >
          <Icon class="text-gray-700 ml-2" name="lucide:lock-open" size="20" />
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="رمز عبور"
            class="flex-1 bg-transparent outline-none pr-2 dark:text-gray-700"
          />
          <button
            type="button"
            @click="togglePassword"
            class="absolute left-3 text-gray-700 focus:outline-none"
          >
            <Icon
              v-if="!showPassword"
              class="text-gray-700"
              name="lucide:eye"
              size="20"
            />
            <Icon v-else class="text-gray-700" name="lucide:eye-off" size="20" />
          </button>
        </div>
        <!--#endregion -->
      </div>
      <!--#endregion -->

      <!--#region Remember&Forgot -->
      <div class="flex items-center justify-between mt-3 w-full max-w-sm">
        <label class="flex items-center space-x-1">
          <input type="checkbox" class="circle" v-model="rememberMe" />
          <span class="text-sm ml-8 dark:text-[#222]">مرا به خاطر بسپار</span>
        </label>

        <button @click="openModal" class="text-yellow-400 text-sm underline mr-5">
          رمز عبور خود را فراموش کردم
        </button>
      </div>
      <!--#endregion -->

      <!--#region Register-Link -->
      <p class="text-sm mt-2 text-center">
        <NuxtLink to="/register" class="text-yellow-400 underline">
          حساب کاربری ندارید؟
        </NuxtLink>
      </p>
      <!--#endregion -->

      <!--#region Login-Button -->
      <button
        :disabled="!isFormValid"
        @click="submitForm"
        class="w-80 h-12 bg-[#222] text-white flex justify-center items-center rounded-full absolute bottom-22 left-1/2 transform -translate-x-1/2 transition-all duration-300 hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ورود
      </button>
      <!--#endregion -->

      <!--#region Password-Recovery-Modal -->
      <transition name="fade">
        <div
          v-if="showModal"
          class="fixed inset-0 bg-[#2222226a] flex items-center justify-center z-50"
        >
          <div class="bg-white rounded-2xl p-6 w-80 text-center">
            <h2 class="text-lg font-bold mb-4">بازیابی رمز عبور</h2>
            <p class="text-sm text-gray-700 mb-6">
              لطفاً ایمیل خود را وارد کنید تا لینک بازیابی برای شما ارسال شود.
            </p>

            <input
              type="email"
              placeholder="ایمیل"
              class="w-full bg-gray-100 dark:text-gray-700 rounded-full px-4 py-2 mb-4 focus:outline-none"
              v-model="recoveryEmail"
            />

            <div class="flex gap-2 justify-center">
              <button
                @click="sendRecovery"
                class="bg-yellow-400 text-[#222] font-bold px-6 py-2 rounded-full"
              >
                ارسال
              </button>
              <button
                @click="closeModal"
                class="bg-gray-200 text-[#222] font-bold px-6 py-2 rounded-full"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      </transition>
      <!--#endregion -->
    </div>
  </transition>
  <!--#endregion -->
</template>

<style>
/*#region Checkbox-Styles */
/* 🎨 استایل برای چک‌باکس دایره‌ای */
input[type="checkbox"].circle {
  appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #222;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

input[type="checkbox"].circle:checked {
  background-color: #222;
  border-color: #222;
}

input[type="checkbox"].circle:checked::after {
  content: "✓";
  position: absolute;
  top: -1px;
  left: 3px;
  font-size: 13px;
  color: white;
  font-weight: bold;
}
/*#endregion */

/*#region Fade-Transition */
/* ✨ انیمیشن fade برای نمایش و پنهان شدن مودال */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/*#endregion */
</style>
