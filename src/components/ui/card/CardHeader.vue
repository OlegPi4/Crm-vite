<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn('flex font-semibold flex-col gap-y-1.2 p-3', props.class)">
    <slot />
  </div>
</template>
