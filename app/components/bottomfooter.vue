<template>
  <div class="fixed bottom-0 left-0 w-full z-50">
    <div
      class="relative flex justify-between items-center bg-white  border border-gray-200 rounded-t-3xl h-16 px-4 shadow-lg"
    >
      <!-- Home -->
      <NuxtLink
        to="/home"
        class="flex flex-col items-center justify-center w-16 h-16 cursor-pointer transform transition-transform duration-200 hover:-translate-y-1 active:scale-90"
      >
        <Icon name="lucide:house" class="w-5 h-5" />
      </NuxtLink>

      <!-- دکمه وسط -->
      <NuxtLink
        to="/addlist"
        class="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform duration-200"
      >
        <Icon name="lucide:plus" class="w-8 h-8" />
      </NuxtLink>

      <!-- Profile -->
      <NuxtLink
        to="/profile"
        class="flex flex-col items-center justify-center w-16 h-16 cursor-pointer transform transition-transform duration-200 hover:-translate-y-1 active:scale-90"
      >
        <Icon name="lucide:user-round" class="w-5 h-5"/>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
/* فقط border-radius از بالا */
div.relative {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

/* Bounce animation هنگام کلیک روی آیکون‌ها */
svg {
  transition: transform 0.2s ease;
}
svg:active {
  transform: scale(1.2);
}

/* Shadow دکمه وسط */
.absolute.w-16.h-16 {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
}
</style>
