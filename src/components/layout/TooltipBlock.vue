<script setup lang="ts" >
import { Tooltip, TooltipContent,  TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { defineProps } from 'vue';

const props = defineProps({
   src: String,
   name: String   
})
</script>

<template>
   <TooltipProvider >
      <Tooltip >
         <TooltipTrigger  
         class=" inline-block transition-colors  hover:text-secondary" 
         >
         <img 
            :src= "props.src"
            :alt = "props.name" 
            class="fade-in-100 fade-out-0 "
            width="25" 
         />  
         </TooltipTrigger>
         <TooltipContent>
            <p class="text-sm"> {{ props.name}} </p>
         </TooltipContent>
      </Tooltip>
   </TooltipProvider>
</template>