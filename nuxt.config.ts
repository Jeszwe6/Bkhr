// 📦 ایمپورت افزونه Tailwind برای Vite
import tailwindcss from "@tailwindcss/vite";

// 🧭 پیکربندی اصلی Nuxt
export default defineNuxtConfig({
  // 📅 نسخه‌ای از Nuxt که پروژه باهاش سازگار تعریف شده
  compatibilityDate: "2025-07-15",

  // ⚙️ تنظیمات کلی اپلیکیشن
  app: {
    // 🧠 تنظیمات <head> (تایتل، متا، آیکون، viewport و ...)
    head: {
      title: "بخر", // عنوان سایت در تب مرورگر
      charset: "utf-8", // کدگذاری استاندارد فارسی/انگلیسی
      viewport: "width=device-width, initial-scale=1", // واکنش‌گرا برای موبایل
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no",
        },
        { name: "HandheldFriendly", content: "true" },
        { name: "version", content: "0.1" },
      ],
      // 🖼️ آیکون favicon سایت
      link: [{ rel: "icon", type: "image/png", href: "/img/favicon.png" }],
    },

    // 🎞️ افکت انتقال بین صفحات (با نام کلاس "page")
    pageTransition: { name: "page", mode: "out-in" },

    // 🧩 افکت تغییر بین layout ها (اختیاری)
    layoutTransition: { name: "layout", mode: "out-in" },
  },

  // ⚡️ چون پروژه فقط سمت کلاینت ران میشه (SPA) — SSR خاموشه
  ssr: false,

  // 🧰 ابزار توسعه غیرفعاله (درصورت نیاز میشه فعال کرد)
  devtools: { enabled: false },

  // 📦 ماژول‌های فعال پروژه
  modules: [
    "cap-module", // افزونه‌ی مخصوص Capacitor یا PWA (در صورت استفاده)
    "@nuxt/ui", // فریم‌ورک کامپوننت‌های UI آماده برای Nuxt
    "nuxt-marquee", // برای ساخت marquee (اسلاید متحرک متن)
    // ❌ nuxt-icon حذف شده چون با Nuxt 4 ناسازگاره
  ],

  // 🎨 فایل‌های CSS سراسری پروژه
  css: [
    "@/assets/css/main.css", // استایل‌های اصلی پروژه
    "@/assets/css/font.css", // فونت‌ها و تنظیمات تایپوگرافی
    // ✅ پیشنهاد: فایل tailwind.css رو هم اضافه کن تا در همه صفحات باشه
    "@/assets/css/tailwind.css",
  ],

  // ⚙️ پیکربندی Vite (ابزار build)
  vite: {
    plugins: [
      tailwindcss(), // اجرای پلاگین TailwindCSS در Vite
    ],
  },

  // 🌐 تنظیمات سرور محلی توسعه
  devServer: {
    port: 2000, // آدرس پروژه در مرورگر: http://localhost:2000
  },
});
