<script setup>
import { ref } from "vue";
//#region Import Bottom Footer
import BottomFooter from "../components/bottomfooter.vue";

//#endregion

//#region State
const isEditing = ref(false);

const user = ref({
  name: "نرجس مقدم",
  avatar: "/img/Oval-10.png",
});

const email = ref("jessmafmbt@gmail.com");
const birthdate = ref("1381-03-09");
const location = ref("اصفهان، مجلسی");

const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

const saveProfile = () => {
  isEditing.value = false;
  alert("تغییرات ذخیره شد ✅");
};

const onImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    user.value.avatar = URL.createObjectURL(file);
  }
};
//#endregion
</script>

<template>
  <div class="flex flex-col min-h-screen bg-white overflow-hidden">
    <!--#region Header -->
    <div class="flex items-center justify-between py-5 px-6 shadow-lg bg-white">
      <!-- Edit Icon (Left) -->
      <button @click="toggleEdit">
        <template v-if="!isEditing">
          <Icon name="lucide:pen" size="20" class="text-black" />
        </template>
      </button>

      <!-- Profile Info (Center) -->
      <div class="flex flex-col items-center">
        <span class="mb-2 text-3xl text-black">پروفایل</span>
        <div class="relative">
          <img
            :src="user.avatar"
            alt="Profile"
            class="w-20 h-20 rounded-full border-2 border-black object-cover"
          />
          <!-- آپلود عکس -->
          <input
            v-if="isEditing"
            type="file"
            accept="image/*"
            @change="onImageChange"
            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
          />
        </div>
        <h2 class="mt-2 text-lg font-semibold text-black">{{ user.name }}</h2>
      </div>

      <!-- Back Button (Right) -->
      <NuxtLink
        to="/home"
        class="bg-black rounded-full p-2 inline-flex items-center justify-center cursor-pointer"
      >
        <Icon name="lucide:arrow-left" size="20" class="text-white" />
      </NuxtLink>
    </div>

    <!--#region Profile Form -->
    <div class="flex-1 p-6 space-y-4 mt-5 gap-4 overflow-auto">
      <!-- Email -->
      <div>
        <div class="flex items-center bg-gray-100 shadow-sm rounded-full px-4 py-2">
          <Icon name="lucide:mail" size="20" class="text-gray-700" />
          <input
            type="email"
            v-model="email"
            placeholder="ایمیل"
            class="w-full p-2 text-gray-700 focus:outline-none"
          />
        </div>
      </div>

      <!-- Username -->
      <div>
        <div class="flex items-center bg-gray-100 shadow-sm rounded-full px-4 py-2">
          <Icon name="lucide:user-round" size="20" class="text-gray-700" />
          <input
            type="text"
            v-model="user.name"
            placeholder="نام کاربری"
            class="w-full p-2 text-gray-700 focus:outline-none"
          />
        </div>
      </div>

      <!-- Birthdate -->
      <div>
        <div class="flex items-center bg-gray-100 shadow-sm rounded-full px-4 py-2">
          <Icon name="lucide:calendar-days" size="20" class="text-gray-700" />
          <input
            type="date"
            v-model="birthdate"
            class="w-full p-2 text-gray-700 focus:outline-none [appearance:none] [&::-webkit-calendar-picker-indicator]:hidden"
          />
        </div>
      </div>

      <!-- Location -->
      <div>
        <div class="flex items-center bg-gray-100 shadow-sm rounded-full px-4 py-2">
          <Icon name="lucide:map-pin" size="20" class="text-gray-700" />
          <input
            type="text"
            v-model="location"
            placeholder="موقعیت مکانی"
            class="w-full p-2 text-gray-700 focus:outline-none"
          />
        </div>
      </div>

      <!-- Save Button -->
      <button
        v-if="isEditing"
        @click="saveProfile"
        class="w-full h-12 bg-black text-white py-2 rounded-3xl font-semibold mt-4 hover:bg-gray-800 transition"
      >
        ذخیره تغییرات
      </button>
    </div>
    <!--#endregion-->
 <BottomFooter />

  </div>
</template>

<style scoped>
/* صفحه بدون اسکرول کلی، فقط فرم خودش overflow auto داره */
</style>
