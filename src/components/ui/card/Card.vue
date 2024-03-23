<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="
      cn(
        'rounded-lg  bg-card text-card-foreground animation border  order-transparent transition-colors hover:border-[#a252c83d]',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
