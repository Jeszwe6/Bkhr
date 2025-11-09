<script setup lang="ts">
//#region Imports
import { ref, reactive, computed, onMounted, onBeforeUnmount } from "vue";
import { Icon } from "@iconify/vue";
//#endregion

//#region Product State
interface ProductItem {
  name: string;
  quantity: number;
  unit: string;
}

const units = ["کیلو", "عدد", "پاکت", "جعبه"];
const productList = ref<ProductItem[]>([{ name: "نان بربری", quantity: 2, unit: "عدد" }]);
const newItem = reactive<ProductItem>({ name: "", quantity: 1, unit: units[0] });
const addingItem = ref(false);
const dropdownOpen = ref(false);

function addItem() {
  if (!newItem.name.trim()) return alert("نام محصول را وارد کنید");
  productList.value.push({ ...newItem });
  newItem.name = "";
  newItem.quantity = 1;
  newItem.unit = units[0];
  dropdownOpen.value = false;
}

function removeItem(index: number) {
  productList.value.splice(index, 1);
}
//#endregion

//#region Contacts State
interface Contact {
  id: number;
  name: string;
  avatar: string;
  selected: boolean;
}

const sendSheetOpen = ref(false);
const step = ref(1);
const contactSearch = ref("");

const contacts = ref<Contact[]>([
  { id: 1, name: "محمد قنواتی", avatar: "/img/Oval-1.png", selected: false },
  { id: 2, name: "احمد قنواتی", avatar: "/img/Oval-1.png", selected: false },
  { id: 3, name: "محمد حسین مقدم", avatar: "/img/Oval-1.png", selected: false },
  { id: 4, name: "محمد حسن مقدم", avatar: "/img/Oval-1.png", selected: false },
  { id: 5, name: "بتول مقدم", avatar: "/img/Oval-1.png", selected: false },
  { id: 6, name: "ساجده شوکاوی", avatar: "/img/Oval-1.png", selected: false },
  { id: 7, name: "ساهره شوکاوی", avatar: "/img/Oval-1.png", selected: false },
]);

const filteredContacts = computed(() => {
  if (!contactSearch.value.trim()) return contacts.value;
  const q = contactSearch.value.trim().toLowerCase();
  return contacts.value.filter((c) => c.name.toLowerCase().includes(q));
});

const selectedContacts = computed(() => contacts.value.filter((c) => c.selected));
//#endregion

//#region Contact Functions
const toggleContact = (id: number) => {
  const c = contacts.value.find((c) => c.id === id);
  if (c) c.selected = !c.selected;
};

const nextStep = () => {
  if (!selectedContacts.value.length) return alert("حداقل یک مخاطب انتخاب کنید.");
  step.value = 2;
};

const backStep = () => (step.value = 1);

const sendFinal = () => {
  alert(`ارسال شد برای: ${selectedContacts.value.map((c) => c.name).join(", ")}`);
  sendSheetOpen.value = false;
  step.value = 1;
  contacts.value.forEach((c) => (c.selected = false));
};
//#endregion

//#region Click Outside Handler
const sendSheetRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  if (
    sendSheetOpen.value &&
    sendSheetRef.value &&
    !sendSheetRef.value.contains(event.target as Node)
  ) {
    sendSheetOpen.value = false;
    step.value = 1;
    contacts.value.forEach((c) => (c.selected = false));
    dropdownOpen.value = false;
  }
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onBeforeUnmount(() => document.removeEventListener("click", handleClickOutside));
//#endregion
</script>

<template>
  <!--#region Header-->
  <header
    class="flex justify-between items-center p-4 shadow-sm bg-white sticky top-0 z-20"
  >
    <button
      @click="sendSheetOpen = true"
      class="bg-[#222] text-white px-3 py-2 rounded-full flex items-center gap-2 hover:scale-105 transition"
    >
      <Icon icon="lucide:send" class="w-5 h-5" />
      ارسال برای
    </button>

    <h2 class="font-bold text-lg">لیست محصولات</h2>

    <NuxtLink
      to="/home"
      class="bg-[#222] text-white w-10 h-10 flex items-center justify-center rounded-full hover:scale-105 transition"
    >
      <Icon icon="lucide:arrow-left" class="w-5 h-5" />
    </NuxtLink>
  </header>
  <!--#endregion-->

  <!--#region Product List-->
  <main class="px-4 mt-4 flex flex-col gap-3 pb-16">
    <transition-group name="list-fade" tag="div">
      <div
        v-for="(item, index) in productList"
        :key="index"
        class="bg-gray-50 rounded-3xl p-4 flex justify-between items-center shadow-sm my-5 gap-2"
       
      >
        <div>
          <div class="font-semibold text-gray-800">{{ item.name }}</div>
          <div class="text-sm text-[#222]">{{ item.quantity }} {{ item.unit }}</div>
        </div>
        <button
          @click="removeItem(index)"
          class="text-[#222] hover:text-[#222] transition"
        >
          <Icon icon="lucide:trash-2" class="w-5 h-5 text-red-700" />
        </button>
      </div>
    </transition-group>

    <!--#region Add Item Button-->
    <button
      v-if="!addingItem"
      @click="addingItem = true"
      class="bg-[#222] text-white py-3 rounded-full mt-5 flex items-center justify-center gap-2 hover:scale-105 transition"
    >
      <Icon icon="lucide:plus-circle" class="w-5 h-5" />
      افزودن آیتم جدید
    </button>
    <!--#endregion-->

    <!--#region Add Item Form-->
    <transition name="fade-slide">
      <div
        v-if="addingItem"
        class="bg-white rounded-3xl p-5 mt-5 shadow-lg flex flex-col gap-3 animate-fadeIn"
      >
        <input
          v-model="newItem.name"
          placeholder="نام محصول"
          class="rounded-3xl px-3 py-2 text-[#222] shadow-inner bg-gray-50"
        />

        <div class="flex items-center gap-2 justify-center">
          <input
            v-model.number="newItem.quantity"
            type="number"
            min="1"
            class="rounded-3xl px-3 py-2 text-[#222] bg-gray-50 shadow-inner w-24"
          />

          <div class="relative w-24">
            <button
              @click="dropdownOpen = !dropdownOpen"
              class="w-full rounded-3xl px-3 py-2 text-[#222] bg-gray-50 flex justify-between items-center shadow-md hover:shadow-lg transition"
            >
              {{ newItem.unit }}
              <Icon
                icon="lucide:chevron-down"
                class="w-4 h-4 transition-transform"
                :class="{ 'rotate-180': dropdownOpen }"
              />
            </button>

            <transition name="dropdown">
              <ul
                v-if="dropdownOpen"
                class="absolute w-full mt-1 text-[#222] bg-gray-50 rounded-3xl shadow-lg max-h-48 overflow-y-auto z-50"
              >
                <li
                  v-for="u in units"
                  :key="u"
                  @click="
                    newItem.unit = u;
                    dropdownOpen = false;
                  "
                  class="px-3 py-2 text-[#222] hover:shadow-md cursor-pointer rounded-2xl transition"
                >
                  {{ u }}
                </li>
              </ul>
            </transition>
          </div>
        </div>

        <div class="text-center text-gray-500 mt-1">
          شما {{ newItem.quantity }} {{ newItem.unit }} می‌خواهید
        </div>

        <div class="flex gap-2 mt-4">
          <button
            @click="addItem"
            class="flex-1 bg-[#222] text-white py-2 rounded-full hover:scale-105 transition shadow-md hover:shadow-lg"
          >
            افزودن به لیست
          </button>
        </div>
      </div>
    </transition>
    <!--#endregion-->
  </main>
  <!--#endregion-->

  <!--#region Send Contacts Sheet-->
  <transition name="sheet">
    <div
      v-if="sendSheetOpen"
      ref="sendSheetRef"
      class="fixed left-0 bottom-0 w-full bg-white rounded-t-3xl shadow-2xl z-50 flex flex-col overflow-hidden animate-slideUp"
      style="height: 60vh"
    >
      <div class="w-16 h-2 bg-gray-300 rounded-full self-center mt-3"></div>

      <!--#region Step 1 - Select Contacts-->
      <div v-if="step === 1" class="flex-1 overflow-y-auto px-4 pt-2">
        <input
          v-model="contactSearch"
          placeholder="جستجو..."
          class="w-full rounded-xl px-3 py-2 mb-4 text-red-500 bg-gray-100"
        />
        <div class="flex flex-col gap-2">
          <div
            v-for="c in filteredContacts"
            :key="c.id"
            class="flex items-center justify-between cursor-pointer p-2 rounded-xl text-[#222] hover:bg-gray-100 transition"
            @click="toggleContact(c.id)"
          >
            <div class="flex items-center gap-3">
              <img
                :src="c.avatar"
                class="w-12 h-12 rounded-full border-2 border-transparent"
              />
              <span class="text-gray-800 font-medium">{{ c.name }}</span>
            </div>
            <Icon
              v-if="c.selected"
              icon="lucide:check-circle"
              class="w-6 h-6 text-[#222]"
            />
          </div>
        </div>
        <button
          @click="nextStep"
          class="mt-4 w-full bg-[#222] text-white py-3 rounded-full"
        >
          بعدی
        </button>
      </div>
      <!--#endregion-->

      <!--#region Step 2 - Confirm Send-->
      <div v-else-if="step === 2" class="flex-1 px-4 pt-4">
        <div class="flex justify-between items-center mb-4">
          <button @click="backStep" class="flex items-center gap-1 text-gray-700">
            <Icon icon="lucide:arrow-left" class="w-5 h-5" /> بازگشت
          </button>
          <button @click="sendFinal" class="bg-[#222] text-white px-4 py-2 rounded-full">
            ارسال
          </button>
        </div>

        <div class="flex flex-col gap-2">
          <div
            v-for="c in selectedContacts"
            :key="c.id"
            class="flex items-center gap-3 p-2 bg-gray-100 rounded-xl animate-fadeIn"
          >
            <img :src="c.avatar" class="w-10 h-10 rounded-full" />
            <span class="text-gray-800 font-medium">{{ c.name }}</span>
          </div>
        </div>
      </div>
      <!--#endregion-->
    </div>
  </transition>
  <!--#endregion-->

  <bottomfooter />
</template>

<style scoped>
/*#region Animations */
.list-fade-enter-active,
.list-fade-leave-active {
  transition: all 0.25s ease-in-out;
}
.list-fade-enter-from,
.list-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.sheet-enter-active,
.sheet-leave-active {
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease;
}
.sheet-enter-from,
.sheet-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease forwards;
}

@keyframes slideUp {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.animate-slideUp {
  animation: slideUp 0.35s ease forwards;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}
.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.dropdown-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
/*#endregion*/
</style>
