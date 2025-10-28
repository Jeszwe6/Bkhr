<script setup lang="ts">
//#region Imports
import { ref } from "vue";
// @ts-ignore
import html2canvas from "html2canvas";
// @ts-ignore
import jsPDF from "jspdf";
//#endregion

//#region Ticket Form State
const ticket = ref({
  subject: "",
  section: "",
  list: "",
  message: "",
  file: null as File | null,
  fileName: "",
  priority: "معمولی",
});
//#endregion

//#region Dropdown States
const sectionOpen = ref(false);
//#endregion

//#region Handle File Upload
const handleFileUpload = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    ticket.value.file = file;
    ticket.value.fileName = file.name;
  }
};
//#endregion

//#region Submit Form & Export as File
const formRef = ref<HTMLElement | null>(null);

const submitTicket = async () => {
  if (!ticket.value.subject || !ticket.value.message) {
    alert("لطفاً موضوع و متن پیام را وارد کنید 📝");
    return;
  }

  // نمایش پیام موفقیت
  alert("تیکت شما با موفقیت ارسال شد ✅");

  // ذخیره فرم به عنوان فایل
  if (formRef.value) {
    const canvas = await html2canvas(formRef.value);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

    // دانلود فایل
    pdf.save(`ticket-${Date.now()}.pdf`);
  }

  // بازگشت به صفحه تیکت‌ها
  setTimeout(() => {
    window.location.href = "/ticket";
  }, 1200);
};
//#endregion
</script>

<template>
  <!--#region Container-->
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <!--#region Animated Card-->
    <transition name="fade-up">
      <div
        ref="formRef"
        class="w-full max-w-xl r p-8 transform transition-all duration-500 hover:scale-[1.01] relative"
      >
        <!-- دکمه برگشت -->
        <NuxtLink
          to="/home"
          class="absolute top-5 w-10 h-10 px-2 py-3 left-5 bg-black rounded-full transition items-center text-center"
        >
          <Icon name="lucide:arrow-left" class="w-5 h-5 text-white" />
        </NuxtLink>

        <!-- Header -->
        <h2
          class="text-2xl font-bold mb-6 text-center text-gray-800 border-b pb-3 border-gray-200"
        >
          ارسال تیکت
        </h2>

        <!-- Subject -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">موضوع پیام</label>
          <input
            v-model="ticket.subject"
            type="text"
            placeholder="مثلاً مشکل در اضافه کردن کالا"
            class="w-full bg-gray-100 border border-gray-200 rounded-full px-3 py-2 text-sm shadow-sm transition"
          />
        </div>

        <!-- Section Dropdown -->
        <div class="mb-4 relative">
          <label class="block text-sm font-medium text-gray-700 mb-1">مربوط به بخش</label>

          <div @click.stop="sectionOpen = !sectionOpen" class="relative">
            <button
              class="w-full bg-gray-100 border border-gray-200 rounded-full px-3 py-2 text-sm flex justify-between items-center shadow-sm"
            >
              {{ ticket.section || "انتخاب کنید" }}
              <Icon
                name="lucide:arrow-down"
                :class="{ 'rotate-180': sectionOpen }"
                class="w-4 h-4 transition-transform duration-200"
              />
            </button>

            <transition name="fade-slide">
              <ul
                v-show="sectionOpen"
                class="absolute left-0 right-0 mt-2 bg-gray-100 rounded-2xl shadow-sm overflow-hidden z-50"
              >
                <li
                  v-for="item in ['ثبت سفارش', 'پرداخت', 'ارسال', 'لیست اشتراکی']"
                  :key="item"
                  @click="
                    ticket.section = item;
                    sectionOpen = false;
                  "
                  class="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  {{ item }}
                </li>
              </ul>
            </transition>
          </div>
        </div>

        <!-- Message -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">متن پیام</label>
          <textarea
            v-model="ticket.message"
            rows="4"
            placeholder="توضیحات مربوط به مشکل یا درخواست خود را بنویسید..."
            class="w-full bg-gray-100 border border-gray-200 rounded-2xl px-3 py-2 text-sm shadow-sm transition"
          ></textarea>
        </div>

        <!-- File Upload -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">فایل ضمیمه</label>
          <input
            type="file"
            @change="handleFileUpload"
            accept=".png,.jpg,.jpeg,.svg,.pdf"
            class="w-full bg-gray-100 border border-gray-200 rounded-full px-3 py-2 text-sm flex justify-between items-center shadow-sm"
          />
          <p v-if="ticket.fileName" class="text-xs text-gray-500 mt-1 animate-fade-in">
            📎 فایل انتخاب شده: {{ ticket.fileName }}
          </p>
        </div>

        <!-- Priority -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">اولویت پیام</label>
          <div class="flex items-center justify-between gap-3">
            <label
              class="w-full bg-gray-100 border border-gray-200 rounded-full px-3 py-2 text-sm flex justify-between items-center shadow-sm"
            >
              <input type="radio" v-model="ticket.priority" value="معمولی" />
              <span class="text-sm text-gray-700">معمولی</span>
            </label>

            <label
              class="w-full bg-gray-100 border border-gray-200 rounded-full px-3 py-2 text-sm flex justify-between items-center shadow-sm"
            >
              <input type="radio" v-model="ticket.priority" value="مهم" />
              <span class="text-sm text-gray-700">مهم</span>
            </label>

            <label
              class="w-full bg-gray-100 border border-gray-200 rounded-full px-3 py-2 text-sm flex justify-between items-center shadow-sm"
            >
              <input type="radio" v-model="ticket.priority" value="بسیار مهم" />
              <span class="text-sm text-gray-700">فوری</span>
            </label>
          </div>
        </div>

        <!-- Submit -->
        <button
          @click="submitTicket"
          class="bg-black text-white font-bold px-6 py-2 rounded-full mt-6 w-full"
        >
          ارسال پیام
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/*#region Fade Animations */
.fade-up-enter-active {
  transition: all 0.6s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(40px);
}
.fade-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
/*#endregion*/

/*#region Fade-In File Name */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeIn 0.4s ease forwards;
}
/*#endregion*/

/*#region Radio Accent */
input[type="radio"] {
  accent-color: black;
}
/*#endregion*/
</style>
