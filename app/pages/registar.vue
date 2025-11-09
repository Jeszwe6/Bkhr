<script setup>
// #region Imports
import { ref, computed } from "vue";
import { navigateTo } from "#app";
// #endregion

// #region Reactive-Variables
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const agreeRules = ref(false);
const showModal = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
// #endregion

// #region Modal-Functions
const openModal = () => (showModal.value = true);

const acceptRules = () => {
  // #region Accept-Rules-Logic
  agreeRules.value = true;
  showModal.value = false;
  // #endregion
};
// #endregion

// #region Password-Toggle-Functions
const togglePassword = () => (showPassword.value = !showPassword.value);

const toggleConfirmPassword = () =>
  (showConfirmPassword.value = !showConfirmPassword.value);
// #endregion

// #region Computed-Validation
const isFormValid = computed(() => {
  // #region Validation-Logic
  return (
    name.value.trim() !== "" &&
    email.value.trim() !== "" &&
    password.value !== "" &&
    confirmPassword.value !== "" &&
    password.value === confirmPassword.value &&
    agreeRules.value
  );
  // #endregion
});
// #endregion

// #region Submit-Form
const submitForm = () => {
  // #region Check-Validation
  if (isFormValid.value) {
    navigateTo("/home");
  } else {
    // #region Alert-Invalid-Form
    alert(
      "لطفاً تمام فیلدها را پر کرده و قوانین را قبول کنید. همچنین مطمئن شوید که رمز عبور و تأیید آن یکسان هستند."
    );
    // #endregion
  }
  // #endregion
};
// #endregion
</script>

<template>
  <!--#region Main-Container-->
  <transition name="fade">
    <div
      class="relative w-screen h-screen bg-white flex flex-col justify-center items-center p-6"
    >
      <!--#region Title-->
      <h1 class="text-3xl font-bold mb-6 dark:text-[#222]">ثبت‌ نام</h1>
      <!--#endregion-->

      <!--#region Form-Container-->
      <div class="w-full max-w-sm space-y-4">
        <!--#region Name-Input-->
        <div class="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm">
          <input
            type="text"
            v-model="name"
            placeholder="نام"
            class="flex-1 bg-transparent outline-none dark:text-gray-700"
          />
        </div>
        <!--#endregion-->

        <!--#region Email-Input-->
        <div class="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm">
          <input
            type="email"
            v-model="email"
            placeholder="ایمیل"
            class="flex-1 bg-transparent outline-none dark:text-gray-700"
          />
        </div>
        <!--#endregion-->

        <!--#region Password-Input-->
        <div
          class="flex items-center bg-gray-100 rounded-full px-4 py-2 relative shadow-sm"
        >
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
        <!--#endregion-->

        <!--#region ConfirmPassword-Input-->
        <div
          class="flex items-center bg-gray-100 rounded-full px-4 py-2 relative shadow-sm"
        >
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            v-model="confirmPassword"
            placeholder="تأیید رمز عبور"
            class="flex-1 bg-transparent outline-none pr-2 dark:text-gray-700"
          />
          <button
            type="button"
            @click="toggleConfirmPassword"
            class="absolute left-3 text-gray-700 focus:outline-none"
          >
            <Icon
              v-if="!showConfirmPassword"
              class="text-gray-700"
              name="lucide:eye"
              size="20"
            />
            <Icon v-else class="text-gray-700" name="lucide:eye-off" size="20" />
          </button>
        </div>
        <!--#endregion-->

        <!--#region Rules-Checkbox-->
        <div class="flex items-center justify-center mt-3 space-x-2">
          <input type="checkbox" id="rules" class="circle" v-model="agreeRules" />
          <label for="rules" class="text-sm text-center text-[#222]">
            <button class="bg-yellow-400 font-semibold p-1 rotate-5" @click="openModal">
              قوانین و مقررات
            </button>
            را قبول می‌کنم
          </label>
        </div>
        <!--#endregion-->

        <!--#region Login-Link-->
        <p class="text-sm mt-2 text-center">
          <router-link to="/login" class="text-yellow-400 underline">
            حساب کاربری دارم
          </router-link>
        </p>
        <!--#endregion-->
      </div>
      <!--#endregion-->
    </div>
  </transition>
  <!--#endregion-->

  <!--#region Submit-Button-->
  <button
    :disabled="!isFormValid"
    @click="submitForm"
    :class="[
      'fixed bottom-8 left-1/2 transform -translate-x-1/2 w-80 h-12 rounded-full flex items-center justify-center z-50 transition-colors',
      isFormValid
        ? 'bg-[#222] text-white cursor-pointer'
        : 'bg-gray-400 text-gray-200 cursor-not-allowed',
    ]"
  >
    ثبت‌ نام
  </button>
  <!--#endregion-->

  <!--#region Modal-Rules-->
  <transition name="fade">
    <div
      v-if="showModal"
      class="fixed inset-0 bg-[#22222274] flex items-center justify-center z-50"
    >
      <!--#region Modal-Box-->
      <div
        class="bg-white rounded-2xl p-6 w-80 max-h-[80vh] overflow-y-auto text-right shadow-lg"
      >
        <h2 class="text-lg font-bold mb-4 text-center">قوانین و مقررات</h2>

        <!--#region Modal-Text-->
        <div class="text-sm text-[#222] leading-relaxed space-y-3">
          <p>
            به اپلیکیشن ما خوش آمدید. لطفاً پیش از ثبت‌نام و استفاده از خدمات، این قوانین
            و مقررات را با دقت مطالعه کنید.
          </p>
          <p>
            ۱. پذیرش قوانین: با ایجاد حساب کاربری و استفاده از اپلیکیشن، کاربر متعهد
            می‌شود که تمامی قوانین را پذیرفته و به آن‌ها پایبند باشد.
          </p>
          <p>
            ۲. ثبت‌نام و حساب کاربری: کاربران موظف‌اند اطلاعات صحیح، کامل و به‌روز خود را
            هنگام ثبت‌نام وارد کنند.
          </p>
          <p>
            ۳. حفظ حریم خصوصی: اطلاعات شخصی کاربران محرمانه تلقی شده و بدون رضایت آن‌ها در
            اختیار شخص ثالث قرار نخواهد گرفت.
          </p>
          <p>
            ۴. استفاده مجاز از خدمات: کاربران متعهد می‌شوند که از خدمات اپلیکیشن فقط در
            چارچوب قوانین استفاده کنند.
          </p>
          <p>
            ۵. مسئولیت کاربران: مسئولیت تمام فعالیت‌های انجام‌شده در حساب کاربری بر عهده‌ی
            صاحب حساب است.
          </p>
        </div>
        <!--#endregion-->

        <!--#region Modal-Accept-Button-->
        <button
          @click="acceptRules"
          class="bg-[#222] text-white font-bold px-6 py-2 rounded-full mt-6 w-full"
        >
          قبول میکنم
        </button>
        <!--#endregion-->
      </div>
      <!--#endregion-->
    </div>
  </transition>
  <!--#endregion-->
</template>

<style>
/*#region Checkbox-Style*/
input[type="checkbox"].circle {
  appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid gray;
  border-radius: 50%;
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
/*#endregion*/

/*#region Fade-Transition*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/*#endregion*/
</style>
