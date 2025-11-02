<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

// ==================== TYPES ====================
interface ProductItem {
  name: string;
  quantity: number;
  unit: string;
}
interface Contact {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
  selected?: boolean;
}

// ==================== STATE ====================
const router = useRouter();

const units = ["کیلو", "عدد", "پاکت", "جعبه"];

const productList = ref<ProductItem[]>([
  { name: "نان بربری", quantity: 2, unit: "عدد" },
]);

const newItem = reactive<ProductItem>({
  name: "",
  quantity: 1,
  unit: units[0] ?? "عدد", // 👈 مقدار پیش‌فرض امن
});

const addingItem = ref(false);

const sendSheetOpen = ref(false);
const sheetHeight = ref(55);
const contactSearch = ref("");
const messageText = ref("");

const contacts = ref<Contact[]>([
  { id: 1, name: "علی", avatar: "https://i.pravatar.cc/150?img=1", online: true },
  { id: 2, name: "سارا", avatar: "https://i.pravatar.cc/150?img=2", online: false },
  { id: 3, name: "مریم", avatar: "https://i.pravatar.cc/150?img=3", online: true },
  { id: 4, name: "رضا", avatar: "https://i.pravatar.cc/150?img=4", online: true },
]);

// ==================== COMPUTED ====================
const filteredContacts = computed<Contact[]>(() => {
  const q = contactSearch.value.trim();
  if (!q) return contacts.value;
  return contacts.value.filter((c) => c.name.includes(q));
});

const selectedContacts = computed<Contact[]>(() =>
  contacts.value.filter((c) => c.selected)
);

// ==================== FUNCTIONS ====================
function addItem(): void {
  if (!newItem.name.trim()) return;

  productList.value.push({
    name: newItem.name.trim(),
    quantity: newItem.quantity,
    unit: newItem.unit || (units[0] ?? "عدد"),
  });

  // Reset safely
  setTimeout(() => {
    newItem.name = "";
    newItem.quantity = 1;
    newItem.unit = units[0] ?? "عدد";
    addingItem.value = false;
  }, 0);
}

function removeItem(index: number): void {
  if (index >= 0 && index < productList.value.length) {
    productList.value.splice(index, 1);
  }
}

function toggleContact(id: number): void {
  const contact = contacts.value.find((c) => c.id === id);
  if (contact) {
    contact.selected = !contact.selected;
    contacts.value = [...contacts.value]; // trigger reactivity
  }
}

function sendToSelected(): void {
  if (!selectedContacts.value.length) {
    alert("لطفاً حداقل یک مخاطب انتخاب کنید.");
    return;
  }
  console.log("ارسال به:", selectedContacts.value.map((c) => c.name));
  contacts.value.forEach((c) => (c.selected = false));
  sendSheetOpen.value = false;
}

// ==================== NAVIGATION ====================
function goToHome(): void {
  router.push("/home");
}
function goToOrders(): void {
  router.push("/orders");
}
function goToHistory(): void {
  router.push("/history");
}
function alertMore(): void {
  alert("بیشتر...");
}
</script>

<template>
  <div dir="rtl" class="min-h-screen bg-gray-50 relative pb-24">
    <!-- HEADER -->
    <header
      class="flex justify-between items-center p-4 shadow-sm bg-white sticky top-0 z-20"
    >
      <div class="flex items-center gap-3">
        <button @click="goToHome" class="p-2 rounded-full hover:bg-gray-100 transition">
          <Icon icon="lucide:home" class="w-6 h-6" />
        </button>
        <button @click="goToOrders" class="p-2 rounded-full hover:bg-gray-100 transition">
          <Icon icon="lucide:send" class="w-6 h-6" />
        </button>
        <button @click="goToHistory" class="p-2 rounded-full hover:bg-gray-100 transition">
          <Icon icon="lucide:clock" class="w-6 h-6" />
        </button>
        <button @click="alertMore" class="p-2 rounded-full hover:bg-gray-100 transition">
          <Icon icon="lucide:more-vertical" class="w-6 h-6" />
        </button>
      </div>

      <button
        @click="sendSheetOpen = true"
        class="bg-black text-white px-3 py-2 rounded-full flex items-center gap-2 hover:scale-105 transition"
      >
        <Icon icon="lucide:send" class="w-5 h-5" />
        ارسال برای
      </button>
    </header>

    <!-- PRODUCT LIST -->
    <main class="px-4 mt-4 flex flex-col gap-3 pb-16">
      <transition-group name="list-fade" tag="div">
        <div
          v-for="(item, index) in productList"
          :key="index"
          class="bg-white rounded-xl shadow-md p-4 flex justify-between items-center transition-all"
        >
          <div class="flex items-center gap-3">
            <Icon icon="lucide:package" class="w-6 h-6 text-gray-700" />
            <div>
              <div class="font-semibold text-gray-800">{{ item.name }}</div>
              <div class="text-sm text-gray-500">
                {{ item.quantity }} {{ item.unit }}
              </div>
            </div>
          </div>
          <button
            @click="removeItem(index)"
            class="text-red-500 hover:text-red-700 transition"
          >
            <Icon icon="lucide:trash-2" class="w-5 h-5" />
          </button>
        </div>
      </transition-group>

      <!-- افزودن آیتم جدید -->
      <transition name="fade-slide">
        <div
          v-if="addingItem"
          class="bg-white rounded-xl shadow p-4 flex flex-wrap gap-3 items-center"
        >
          <input
            v-model="newItem.name"
            placeholder="نام محصول"
            class="flex-1 border rounded-lg px-3 py-2 focus:ring focus:ring-gray-300"
          />
          <input
            v-model.number="newItem.quantity"
            type="number"
            min="1"
            class="w-24 border rounded-lg px-3 py-2 focus:ring focus:ring-gray-300"
          />
          <select
            v-model="newItem.unit"
            class="border rounded-lg px-3 py-2 focus:ring focus:ring-gray-300"
          >
            <option v-for="u in units" :key="u" :value="u">{{ u }}</option>
          </select>
          <button
            @click="addItem"
            class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            افزودن
          </button>
        </div>
      </transition>
    </main>
    <!-- ✅ BOTTOM FOOTER -->
    <BottomFooter />

    <!-- SEND SHEET -->
    <transition name="sheet">
      <div
        v-if="sendSheetOpen"
        class="fixed left-0 bottom-0 w-full bg-white rounded-t-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
        :style="{ height: sheetHeight + 'vh' }"
      >
        <div class="w-16 h-2 bg-gray-300 rounded-full self-center mt-3 cursor-grab"></div>

        <div class="flex-1 overflow-y-auto p-4">
          <input
            v-model="contactSearch"
            placeholder="جستجو..."
            class="w-full mb-4 border rounded-xl px-3 py-2 focus:ring focus:ring-gray-300"
          />
          <div class="grid grid-cols-3 gap-3">
            <div
              v-for="c in filteredContacts"
              :key="c.id"
              class="flex flex-col items-center cursor-pointer"
              @click="toggleContact(c.id)"
            >
              <div class="relative">
                <img
                  :src="c.avatar ?? ''"
                  class="w-16 h-16 rounded-full border-2 transition"
                  :class="c.selected ? 'border-blue-500' : 'border-transparent'"
                />
                <span
                  v-if="c.selected"
                  class="absolute inset-0 flex justify-center items-center"
                >
                  <Icon icon="lucide:check-circle" class="w-6 h-6 text-blue-500" />
                </span>
              </div>
              <span class="mt-1 text-sm">{{ c.name }}</span>
            </div>
          </div>
        </div>

        <div class="p-4 border-t border-gray-200">
          <button
            @click="sendToSelected"
            class="w-full bg-black text-white py-3 rounded-full hover:scale-105 transition"
          >
            ارسال
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.list-fade-enter-active,
.list-fade-leave-active {
  transition: all 0.25s ease-in-out;
}
.list-fade-enter-from,
.list-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.sheet-enter-active,
.sheet-leave-active {
  transition: transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease;
}
.sheet-enter-from,
.sheet-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
