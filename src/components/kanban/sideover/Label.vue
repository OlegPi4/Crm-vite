<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
   labelText: {
      type: String,
      default: '',
   }
})

</script>

<template>
   <div class="mb-3">
      <!-- отображаем label, если передан в пропсе -->
      <Label v-if="labelText" class="opacity-75 mb-0.5 block text-xs">
      {{ labelText }}
      </Label>
      <!-- Слот для вложенного содержимого -->
      <div class="text-base"><slot /></div>
   </div>
   
</template>