<script setup lang="ts">
//#region Imports
import { ref, nextTick } from "vue";
//#endregion

//#region Types
type Sender = "user" | "support";

interface BaseMessage {
  from: Sender;
  time: string;
}

export interface TextMessage extends BaseMessage {
  type: "text";
  text: string;
}
export interface ImageMessage extends BaseMessage {
  type: "image";
  image: string;
}
export interface VideoMessage extends BaseMessage {
  type: "video";
  video: string;
}

type Message = TextMessage | ImageMessage | VideoMessage;
//#endregion

//#region Refs and State
const messages = ref<Message[]>([
  {
    from: "support",
    type: "text",
    text: "سلام! به پشتیبانی کُدینچی خوش اومدی 😊 چطور می‌تونم کمکت کنم؟",
    time: "21:00",
  },
]);

const newMessage = ref("");
const uploadOpen = ref(false);
const chatContainer = ref<HTMLElement | null>(null);
//#endregion

//#region Type Guards
const isText = (m: Message): m is TextMessage => m.type === "text";
const isImage = (m: Message): m is ImageMessage => m.type === "image";
const isVideo = (m: Message): m is VideoMessage => m.type === "video";
//#endregion

//#region Helper Functions
const getText = (m: Message): string => (isText(m) ? m.text : "");
const getImage = (m: Message): string => (isImage(m) ? m.image : "");
const getVideo = (m: Message): string => (isVideo(m) ? m.video : "");
const msgKey = (m: Message, idx: number) => `${m.time}-${m.type}-${idx}`;

const nowTime = (): string => {
  const now = new Date();
  return now.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
};

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value)
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  });
};
//#endregion

//#region Event Handlers
const toggleUpload = () => {
  uploadOpen.value = !uploadOpen.value;
};

const sendMessage = () => {
  const text = newMessage.value.trim();
  if (!text) return;

  const msg: TextMessage = {
    from: "user",
    type: "text",
    text,
    time: nowTime(),
  };

  messages.value.push(msg);
  newMessage.value = "";
  scrollToBottom();

  setTimeout(() => {
    messages.value.push({
      from: "support",
      type: "text",
      text: "پیامت رو دریافت کردیم؛ همکاران در حال بررسی هستند 😊",
      time: nowTime(),
    });
    scrollToBottom();
  }, 900);
};

const handleFileUpload = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  const t = file.type || "";

  if (t.startsWith("image")) {
    messages.value.push({ from: "user", type: "image", image: url, time: nowTime() });
  } else if (t.startsWith("video")) {
    messages.value.push({ from: "user", type: "video", video: url, time: nowTime() });
  } else {
    console.warn("Unsupported file type:", t);
  }

  input.value = "";
  scrollToBottom();
};

const sendContact = () => {
  messages.value.push({
    from: "user",
    type: "text",
    text: "📞 ارسال مخاطب انجام شد",
    time: nowTime(),
  });
  uploadOpen.value = false;
};

const sendLocation = () => {
  messages.value.push({
    from: "user",
    type: "text",
    text: "📍 موقعیت شما ارسال شد",
    time: nowTime(),
  });
  uploadOpen.value = false;
};
//#endregion
</script>

<template>
  <!--#region Chat App Container-->
  <div class="flex flex-col h-screen bg-gray-100">
    <!--#region Header-->
    <header
      class="flex items-center justify-between border-b bg-white text-black font-bold px-4 py-5 shadow-[0_6px_10px_rgba(0,0,0,0.5)]"
    >
      <div class="flex items-center gap-3">
        <img
          src="/img/Logo-1.png"
          alt="Support"
          class="w-15 h-15 rounded-full border border-black bg-white"
        />
        <div class="text-black items-center">
          <h2 class="text-base font-bold">پشتیبانی کُدینچی</h2>
          <p class="text-xs mt-2">آنلاین</p>
        </div>
      </div>
      <NuxtLink
        to="/setting"
        class="bg-black text-white w-10 h-10 rounded-full p-2 flex items-center justify-center shadow transition"
      >
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
    </header>
    <!--#endregion-->

    <!--#region Messages-->
    <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
      <transition-group name="fade-slide" tag="div" class="flex flex-col gap-3">
        <div
          v-for="(msg, idx) in messages"
          :key="msgKey(msg, idx)"
          :class="msg.from === 'user' ? 'text-right' : 'text-left'"
        >
          <div
            :class="[
              'inline-block p-3 rounded-2xl shadow max-w-[75%] break-words transition-all',
              msg.from === 'user'
                ? 'bg-yellow-300 text-black rounded-br-none'
                : 'bg-gray-100 text-black rounded-bl-none',
            ]"
          >
            <p v-if="msg.type === 'text'">{{ getText(msg) }}</p>

            <img
              v-if="msg.type === 'image'"
              :src="getImage(msg)"
              class="rounded-2xl mt-1 max-w-full cursor-pointer"
              alt="uploaded image"
            />

            <video
              v-if="msg.type === 'video'"
              :src="getVideo(msg)"
              controls
              class="rounded-2xl mt-1 max-w-full"
            ></video>

            <div class="text-[10px] text-gray-700 mt-1 text-left">{{ msg.time }}</div>
          </div>
        </div>
      </transition-group>
    </div>
    <!--#endregion-->

    <!--#region Input Section-->
    <form
      @submit.prevent="sendMessage"
      dir="rtl"
      class="flex items-center justify-center gap-3 p-3 bg-white border-t relative"
    >
      <!--#region Upload Button with Dropdown-->
      <div class="relative flex-shrink-0" @click.stop>
        <button
          @click="toggleUpload"
          type="button"
          class="cursor-pointer flex items-center justify-center transition-transform duration-300"
          :class="{ 'rotate-45': uploadOpen }"
        >
          <Icon
            name="lucide:circle-plus"
            class="w-7 h-7 text-black transition-colors duration-200"
          />
        </button>

        <!--#region Dropdown Menu-->
        <transition name="fade-slide">
          <div
            v-if="uploadOpen"
            class="absolute bottom-12 right-0 bg-white border border-gray-200 rounded-xl shadow-lg w-44 p-2 space-y-1 z-50"
          >
            <label
              for="imageInput"
              class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              <Icon name="lucide:image" class="w-5 h-5 text-blue-300" />
              <span class="text-sm text-gray-700">ارسال عکس</span>
            </label>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileUpload"
            />

            <label
              for="videoInput"
              class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              <Icon name="lucide:video" class="w-5 h-5 text-red-300" />
              <span class="text-sm text-gray-700">ارسال ویدیو</span>
            </label>
            <input
              id="videoInput"
              type="file"
              accept="video/*"
              class="hidden"
              @change="handleFileUpload"
            />

            <label
              for="fileInput"
              class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              <Icon name="lucide:file" class="w-5 h-5 text-yellow-300" />
              <span class="text-sm text-gray-700">ارسال فایل</span>
            </label>
            <input id="fileInput" type="file" class="hidden" @change="handleFileUpload" />

            <button
              type="button"
              @click="sendContact"
              class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg w-full"
            >
              <Icon name="lucide:user" class="w-5 h-5 text-green-300" />
              <span class="text-sm text-gray-700">ارسال مخاطب</span>
            </button>

            <button
              type="button"
              @click="sendLocation"
              class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg w-full"
            >
              <Icon name="lucide:map-pin" class="w-5 h-5 text-purple-300" />
              <span class="text-sm text-gray-700">ارسال موقعیت</span>
            </button>
          </div>
        </transition>
        <!--#endregion-->
      </div>
      <!--#endregion-->

      <!--#region Input-->
      <input
        v-model="newMessage"
        type="text"
        placeholder="پیام خود را بنویسید..."
        class="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none text-right"
      />

      <!--#region Send Icon-->
      <button
        type="submit"
        class="bg-black text-white p-2 w-10 h-10 rounded-full active:scale-95 transition-transform flex-shrink-0"
      >
        <Icon name="lucide:arrow-up" class="w-5 h-5" />
      </button>
      <!--#endregion-->
    </form>
    <!--#endregion-->
  </div>
  <!--#endregion-->
</template>

<style scoped>
/*#region Animations*/
.fade-slide-enter-active {
  transition: all 0.25s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.rotate-45 {
  transform: rotate(45deg);
}
/*#endregion*/

/*#region Scrollbar*/
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #ffdf20;
  border-radius: 10px;
}
/*#endregion*/
</style>
