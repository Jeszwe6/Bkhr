<script lang="ts" setup>
import type { DialogOverlayProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { DrawerOverlay } from "vaul-vue";
import { cn } from "../../../lib/utils";

// Props با کلاس اختیاری
const props = defineProps<DialogOverlayProps & { class?: HTMLAttributes["class"] }>();

// حذف props غیر ضروری برای انتقال به DrawerOverlay
const delegatedProps = reactiveOmit(props, "class");
defineOptions({ name: "DrawerOverlay" });
</script>

<template>
  <DrawerOverlay
    data-slot="drawer-overlay"
    v-bind="delegatedProps"
    :class="
      cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80',
        props.class
      )
    "
  />
  <div class="fixed inset-0 bg-black/50 z-40" />
</template>
