<script setup>
//#region Imports
import { ref, computed } from "vue";
//#endregion

//#region-Refs
const name = ref("");
const password = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);
//#endregion

//#region-Password-Toggle
const togglePassword = () => (showPassword.value = !showPassword.value);
//#endregion

//#region-Drawer-State
const showModal = ref(false);
const recoveryEmail = ref("");
//#endregion

//#region-Drawer-Handlers
const openModal = () => (showModal.value = true);
const closeModal = () => (showModal.value = false);
//#endregion

//#region-Form-Validation
const isFormValid = computed(() => {
  return name.value.trim() !== "" && password.value !== "";
});
//#endregion

//#region-Form-Submission
const submitForm = () => {
  if (isFormValid.value) {
    // در Nuxt می‌توان از navigateTo استفاده کرد
    navigateTo("/home");
  } else {
    alert("لطفاً نام و رمز عبور خود را وارد کنید.");
  }
};
//#endregion

//#region-Password-Recovery
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
  <!--#region-Main-Container-->
  <transition name="fade">
    <div
      class="relative w-screen h-screen bg-white flex flex-col justify-center items-center p-6"
    >
      <h1 class="text-3xl font-bold mb-6 dark:text-black">ورود</h1>
      <!--#region-Register-Form-->
      <div class="w-full max-w-sm space-y-4">
        <!--#region-User-Name-Field-->
        <div class="flex items-center bg-[#eee] rounded-full px-4 py-2 shadow-sm">
          <!--#region-User-Name-Icon -->
          <Icon class="text-gray-700 ml-2" name="lucide:user-round" size="20" />
          <!--#endregion-->
          <input
            type="text"
            v-model="name"
            placeholder="نام"
            class="flex-1 bg-transparent outline-none dark:text-gray-700"
          />
        </div>
        <!--#endregion-->

        <!--#region-Password-Field-->
        <div
          class="flex items-center bg-[#eee] rounded-full px-4 py-2 relative shadow-sm"
        >
          <!--#region-Password-Icon-->
          <Icon class="text-gray-700 ml-2" name="lucide:lock-open" size="20" />
          <!--#endregion-->
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="رمز عبور"
            class="flex-1 bg-transparent outline-none pr-2 dark:text-gray-700"
          />
          <!--#region-Visiable-Icon-->
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
          <!--#endregion-->
        </div>
        <!--#endregion-->
      </div>
      <!--#endregion-->

      <!--#region-Remember-Forgot-Password-->
      <div class="flex items-center justify-between mt-3">
        <label class="flex items-center space-x-1">
          <input type="checkbox" class="circle" v-model="rememberMe" />
          <span class="text-sm ml-8 dark:text-black">مرا به خاطر بسپار</span>
        </label>

        <button @click="openModal" class="text-yellow-300 text-sm underline mr-5">
          رمز عبور خود را فراموش کردم
        </button>
      </div>
      <!--#endregion-->

      <!--#region-Register-Link-->
      <p class="text-sm mt-2 text-center">
        <NuxtLink to="/registar" class="text-yellow-300 underline">
          حساب کاربری ندارید؟
        </NuxtLink>
      </p>
      <!--#endregion-->

      <!--#region-Login-Button-->
      <button
        :disabled="!isFormValid"
        @click="submitForm"
        to="/home"
        class="w-80 h-12 bg-[#101010] text-white flex justify-center items-center rounded-full absolute bottom-22 left-1/2 transform -translate-x-1/2 transition-all duration-300 hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ورود
      </button>
      <!--#endregion-->

      <!--#region-Password-Recovery-->
      <transition name="fade">
        <div
          v-if="showModal"
          class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div class="bg-white rounded-2xl p-6 w-80 text-center">
            <h2 class="text-lg font-bold mb-4">بازیابی رمز عبور</h2>
            <p class="text-sm text-gray-700 mb-6">
              لطفاً ایمیل خود را وارد کنید تا لینک بازیابی برای شما ارسال شود.
            </p>
            <input
              type="email"
              placeholder="ایمیل"
              class="w-full bg-gray-100  dark:text-gray-700 rounded-full px-4 py-2 mb-4 focus:outline-none"
              v-model="recoveryEmail"
            />
            <button
              @click="sendRecovery"
              class="bg-yellow-300 text-black font-bold px-6 py-2 rounded-full"
            >
              ارسال
            </button>
          </div>
        </div>
      </transition>
      <!--#endregion-->
    </div>
  </transition>
  <!--#endregion-->
</template>

<style>
/*#region-Checkbox-Styles*/
input[type="checkbox"].circle {
  appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid black;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

input[type="checkbox"].circle:checked {
  background-color: black;
  border-color: black;
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

/*#region-Fade-Transition*/
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
