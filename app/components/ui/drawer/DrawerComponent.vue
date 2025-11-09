<script lang="ts" setup>
import type { DrawerRootEmits, DrawerRootProps } from "vaul-vue"
import { useForwardPropsEmits } from "reka-ui"
import { DrawerRoot } from "vaul-vue"

// تعریف props با مقدار پیش‌فرض
const props = withDefaults(defineProps<DrawerRootProps>(), {
  shouldScaleBackground: true,
})

// تعریف emits
const emits = defineEmits<DrawerRootEmits>()

// هدایت props و emits به کامپوننت داخلی
// ✅ اصلاح: cast به Object برای TypeScript
const forwarded = useForwardPropsEmits(props, emits) as unknown as Record<string, unknown>

// تعریف explicit name برای جلوگیری از conflict
defineOptions({
  name: "DrawerComponent"
})
</script>

<template>
  <DrawerRoot
    data-slot="drawer"
    v-bind="forwarded"
  >
    <slot />
  </DrawerRoot>
</template>
