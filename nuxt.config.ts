// 📦 ایمپورت افزونه Tailwind برای Vite
import tailwindcss from "@tailwindcss/vite";

// 🧭 پیکربندی اصلی Nuxt
export default defineNuxtConfig({
  // 📅 نسخه‌ای از Nuxt که پروژه باهاش سازگار تعریف شده
  compatibilityDate: "2025-07-15",

  // ⚙️ تنظیمات کلی اپلیکیشن
  app: {
    head: {
      title: "بخر",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no",
        },
        { name: "HandheldFriendly", content: "true" },
        { name: "version", content: "0.1" },
      ],
      link: [{ rel: "icon", type: "image/png", href: "/img/favicon.png" }],
    },

    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },

  // ⚡️ پروژه SPA (SSR خاموش)
  ssr: false,

  // 🧰 Devtools (درصورت نیاز فعال می‌کنیم)
  devtools: { enabled: false },

  // 📦 ماژول‌های پروژه
  modules: ["cap-module", "@nuxt/ui", "nuxt-marquee"],

  // 🎨 فایل‌های CSS سراسری
  css: [
    "@/assets/css/main.css",
    "@/assets/css/font.css",
    "@/assets/css/tailwind.css",
  ],

  // ⚙️ پیکربندی Vite برای HMR و Tailwind
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        usePolling: true, // فعال کردن polling برای شناسایی تغییرات
        interval: 100,    // بررسی تغییرات هر 100 میلی‌ثانیه
      },
      hmr: true,          // Hot Module Replacement فعال
    },
  },

  // 🌐 تنظیمات سرور توسعه
  devServer: {
    port: 2000,
  },
});
