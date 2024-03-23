
<script lang="ts" setup>
import { ref, defineProps, defineEmits } from "vue";
import { useDealSlideStore } from '@/stores/deal-slide.store'
import { computed } from 'vue';
import { converterCurrency } from '@/lib/converterCurrency'
import dayjs from 'dayjs'; 
import Comments from '@/components/kanban/sideover/Comments.vue'
import { Tooltip, TooltipContent,  TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const store = useDealSlideStore() 

const isLocalOpen = computed({
  get: () => store.isOpen,
  set: value => {
     store.isOpen = value
  }

})


const props = defineProps({
  isOpen: Boolean,
  title: String,
});

const emit = defineEmits();

const close = () => {
  emit("update:isOpen", false);
};

</script>
<template>
   <transition name="slide">
     <div v-if="isOpen" class="fixed inset-0 overflow-hidden z-50">
       <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
       <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
         <transition name="slide">
           <div v-if="isOpen" class="w-screen max-w-xl bg-white shadow-xl">
             <div class="p-4">
               <div class="flex justify-between items-center">
                 <h2 class="text-lg font-semibold">{{ title }}</h2>
                 <button
                   @click="close"
                   class="text-gray-500 hover:text-gray-700 focus:outline-none"
                 >
                   <svg
                     class="h-5 w-5"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                   >
                     <path
                       stroke-linecap="round"
                       stroke-linejoin="round"
                       stroke-width="2"
                       d="M6 18L18 6M6 6l12 12"
                     ></path>
                   </svg>
                 </button>
               </div>
               <div class="mt-1">
                  <h3 class="text-centr mb-2 text-2xl text-slate-700">Розширена інформація :</h3>
                  <div class="line "></div>
                  <div class="text-left text-xl font-bold mt-1 mb-1 text-slate-700">
                    {{ store.card?.name }}
                    <div class="text-xl font-normal mt-2">
                      <span class="mr-3  text-slate-400" > Дата створення: </span>
                      {{ dayjs(store.card?.$createdAt).format('DD MMMM YYYY') }} 
                    </div>  
                  </div>
                  <div class="mt-1 text-left text-xl text-slate-700">
                    <!-- <span class="mr-3 text-slate-400" > Вартість: </span>
                    {{ converterCurrency(store.card?.price) }}
                  </div> -->
                  <div class="mt-1 text-left text-xl text-slate-700">
                    <span class="mr-3  text-slate-400" > Контрагент: </span>
                    {{ store.card?.companyName }}  
                  </div>
                  <div class="mt-1 mb-4 text-left text-xl text-slate-700">
                    <span class="mr-3  text-slate-400" > Статус: </span>
                    {{ store.card?.status }}  
                  </div>
                  <div class="line"></div>
                  <comments></comments>  
                  <slot>
                
                  </slot>
               </div>
               </div>
             </div>
           </div>  
         </transition>
       </div>
     </div>
   </transition>
 </template>
  
 <style>
 .slide-enter-active,
 .slide-leave-active {
   transition: transform 0.3s ease;
 }
 .slide-enter-from,
 .slide-leave-to {
   transform: translateX(100%);
 }
 .line {
  margin: 0 auto;
  width: 100%;
  height: 2.5px;
  background-color: #bbb;
 }
 </style>
 