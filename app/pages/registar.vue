<script setup>
//#region-Imports
import { ref, computed, watch } from "vue";
import { navigateTo } from "#app";
//#endregion

//#region-Refs
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const agreeRules = ref(false);
const showModal = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
//#endregion

//#region-Modal-Handlers
const openModal = () => (showModal.value = true);
const acceptRules = () => {
  agreeRules.value = true;
  showModal.value = false;
};
//#endregion

//#region-Password-Toggle
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};
//#endregion

//#region-Form-Validation
const isFormValid = computed(() => {
  return (
    name.value.trim() !== "" &&
    email.value.trim() !== "" &&
    password.value !== "" &&
    confirmPassword.value !== "" &&
    password.value === confirmPassword.value &&
    agreeRules.value
  );
});
//#endregion

//#region-Form-Submission
const submitForm = () => {
  if (isFormValid.value) {
    navigateTo("/home");
  } else {
    alert(
      "لطفاً تمام فیلدها را پر کرده و قوانین را قبول کنید. همچنین مطمئن شوید که رمز عبور و تأیید آن یکسان هستند."
    );
  }
};
//#endregion
</script>

<template>
  <!--#region-Main-Container-->
  <transition name="fade">
    <div
      class="relative w-screen h-screen bg-white flex flex-col justify-center items-center p-6"
    >
      <h1 class="text-3xl font-bold mb-6 dark:text-[#121212]">ثبت‌ نام</h1>
      <!--#region-Register-Form-->
      <div class="w-full max-w-sm space-y-4">
        <!--#region-User-Name -->
        <div class="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm">
          <Icon class="text-gray-700 ml-2" name="lucide:user-round" size="20" />
          <input
            type="text"
            v-model="name"
            placeholder="نام"
            class="flex-1 bg-transparent outline-none dark:text-gray-700"
          />
        </div>

        <!--#region-mail-->
        <div class="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm">
          <Icon class="text-gray-700 ml-2" name="lucide:mail" size="20" />
          <input
            type="email"
            v-model="email"
            placeholder="ایمیل"
            class="flex-1 bg-transparent outline-none dark:text-gray-700"
          />
        </div>

        <!--#region-Password-->
        <div class="flex items-center bg-gray-100 rounded-full px-4 py-2 relative shadow-sm">
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

        <!--#region Confirm-Password-->
        <div class="flex items-center bg-gray-100 rounded-full px-4 py-2 relative shadow-sm">
          <Icon class="text-gray-700 ml-2" name="lucide:lock-open" size="20" />
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

        <!--#region-Rules-->
        <div class="flex items-center justify-center mt-3 space-x-2">
          <input type="checkbox" id="rules" class="circle" v-model="agreeRules" />
          <label for="rules" class="text-sm text-center text-[#121212]">
            <button class="bg-yellow-400 p-1 rotate-5" @click="openModal">
              قوانین و مقررات
            </button>
            را قبول می‌کنم
          </label>
        </div>

        <!--#region-Login-Link-->
        <p class="text-sm mt-2 text-center">
          <router-link to="/login" class="text-yellow-400 underline">
            حساب کاربری دارم
          </router-link>
        </p>
      </div>
      <!--#endregion-->
    </div>
  </transition>

  <!-- دکمه ثبت‌نام - ثابت در پایین صفحه -->
  <button
    :disabled="!isFormValid"
    @click="submitForm"
    class="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-80 h-12 bg-[#121212] text-white px-8 py-3 rounded-full flex items-center justify-center z-50"
  >
    ثبت‌ نام
  </button>

  <!-- Modal قوانین و مقررات -->
  <transition name="fade">
    <div
      v-if="showModal"
      class="fixed inset-0 bg-[#12121270] flex items-center justify-center z-50"
    >
      <div
        class="bg-white rounded-2xl p-6 w-80 max-h-[80vh] overflow-y-auto text-right shadow-lg"
      >
        <h2 class="text-lg font-bold mb-4 text-center">قوانین و مقررات</h2>
        <div class="text-sm text-[#121212] leading-relaxed space-y-3">
          <p>
            به اپلیکیشن ما خوش آمدید. لطفاً پیش از ثبت‌نام و استفاده از خدمات، این
            قوانین و مقررات را با دقت مطالعه کنید.
          </p>
          <p>
            ۱. پذیرش قوانین: با ایجاد حساب کاربری و استفاده از اپلیکیشن، کاربر
            متعهد می‌شود که تمامی قوانین را پذیرفته و به آن‌ها پایبند باشد.
          </p>
          <p>
            ۲. ثبت‌نام و حساب کاربری: کاربران موظف‌اند اطلاعات صحیح، کامل و به‌روز
            خود را هنگام ثبت‌نام وارد کنند.
          </p>
          <p>
            ۳. حفظ حریم خصوصی: اطلاعات شخصی کاربران محرمانه تلقی شده و بدون رضایت
            آن‌ها در اختیار شخص ثالث قرار نخواهد گرفت.
          </p>
          <p>
            ۴. استفاده مجاز از خدمات: کاربران متعهد می‌شوند که از خدمات اپلیکیشن
            فقط در چارچوب قوانین استفاده کنند.
          </p>
          <p>
            ۵. مسئولیت کاربران: مسئولیت تمام فعالیت‌های انجام‌شده در حساب کاربری بر
            عهده‌ی صاحب حساب است.
          </p>
        </div>
        <button
          @click="acceptRules"
          class="bg-[#121212] text-white font-bold px-6 py-2 rounded-full mt-6 w-full"
        >
          قبول میکنم
        </button>
      </div>
    </div>
  </transition>
</template>

<style>
/*#region-Checkbox-Appearance*/
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
  background-color: #121212;
  border-color: #121212;
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

/* #region-Fade-Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/* #endregion*/
</style>
