<template>
  <div class="flex flex-col h-screen bg-gray-100">
    <!-- Header -->
    <header
      class="flex items-center justify-between bg-white text-black font-bold px-4 py-5 shadow-lg"
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
        to="/home"
        class="bg-black text-white rounded-full p-2 flex items-center justify-center shadow hover:bg-gray-100 transition"
      >
        <Icon name="lucide:arrow-left" width="20" height="20" />
      </NuxtLink>
    </header>

    <!-- Chat messages -->
    <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
      <transition-group name="fade-slide" tag="div">
        <div
          v-for="(msg, idx) in messages"
          :key="msgKey(msg, idx)"
          :class="msg.from === 'user' ? 'text-right' : 'text-left'"
        >
          <div class="mb-1 text-xs text-gray-400">
            {{ msg.time }}
          </div>

          <div
            :class="[
              'inline-block p-3 rounded-2xl shadow max-w-[75%] break-words transition-all',
              msg.from === 'user'
                ? 'bg-yellow-400 text-black rounded-br-none ml-auto'
                : 'bg-gray-100 text-black rounded-bl-none',
            ]"
          >
            <!-- متن -->
            <p v-if="msg.type === 'text'">{{ getText(msg) }}</p>

            <!-- عکس -->
            <img
              v-if="msg.type === 'image'"
              :src="getImage(msg)"
              class="rounded-2xl mt-1 max-w-full cursor-pointer"
              alt="uploaded image"
            />

            <!-- ویدیو -->
            <video
              v-if="msg.type === 'video'"
              :src="getVideo(msg)"
              controls
              class="rounded-2xl mt-1 max-w-full"
            ></video>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- Input section -->
    <form
      @submit.prevent="sendMessage"
      class="flex items-center gap-2 p-3 bg-white border-t"
    >
      <!-- Upload -->
      <label for="fileInput" class="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="gray"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25m0 0L9 12l6.75 6.75M9 12h12"
          />
        </svg>
      </label>
      <input
        id="fileInput"
        type="file"
        accept="image/*,video/*"
        class="hidden"
        @change="handleFileUpload"
      />

      <!-- Input -->
      <input
        v-model="newMessage"
        type="text"
        placeholder="پیام خود را بنویسید..."
        class="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
      />

      <!-- Send -->
      <button
        type="submit"
        class="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold active:scale-95 transition-transform"
      >
        ارسال
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";

/* === تایپ‌ها === */
type Sender = "user" | "support";

interface BaseMessage {
  from: Sender;
  time: string;
}

/* discriminated unions */
export interface TextMessage extends BaseMessage {
  type: "text";
  text: string;
}

export interface ImageMessage extends BaseMessage {
  type: "image";
  image: string; // URL
}

export interface VideoMessage extends BaseMessage {
  type: "video";
  video: string; // URL
}

type Message = TextMessage | ImageMessage | VideoMessage;

/* === state === */
const messages = ref<Message[]>([
  {
    from: "support",
    type: "text",
    text: "سلام! به پشتیبانی کُدینچی خوش اومدی 😊 چطور می‌تونم کمکت کنم؟",
    time: "21:00",
  },
]);

const newMessage = ref("");
const chatContainer = ref<HTMLElement | null>(null);

/* === helper type-guards & accessors (همه در اسکریپت، بدون استفاده از `as` در template) === */
const isText = (m: Message): m is TextMessage => m.type === "text";
const isImage = (m: Message): m is ImageMessage => m.type === "image";
const isVideo = (m: Message): m is VideoMessage => m.type === "video";

const getText = (m: Message): string => (isText(m) ? m.text : "");
const getImage = (m: Message): string => (isImage(m) ? m.image : "");
const getVideo = (m: Message): string => (isVideo(m) ? m.video : "");

const msgKey = (m: Message, idx: number) => {
  // تولید کلید یکتا بدون وابستگی به assertion در template
  return `${m.time}-${m.type}-${idx}`;
};

/* === utilities === */
const nowTime = (): string => {
  const now = new Date();
  return now.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
};

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
};

/* === send text message === */
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

  // پاسخ نمونه پشتیبانی
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

/* === handle file upload (image/video) === */
const handleFileUpload = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  const t = file.type || "";

  if (t.startsWith("image")) {
    const imgMsg: ImageMessage = {
      from: "user",
      type: "image",
      image: url,
      time: nowTime(),
    };
    messages.value.push(imgMsg);
  } else if (t.startsWith("video")) {
    const vidMsg: VideoMessage = {
      from: "user",
      type: "video",
      video: url,
      time: nowTime(),
    };
    messages.value.push(vidMsg);
  } else {
    console.warn("Unsupported file type:", t);
  }

  // reset input so same file can be picked again
  input.value = "";
  scrollToBottom();
};
</script>

<style scoped>
.fade-slide-enter-active {
  transition: all 0.28s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #facc15;
  border-radius: 10px;
}
</style>
