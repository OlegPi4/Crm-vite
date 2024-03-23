<script lang="ts" setup>
import dayjs from 'dayjs';
import type { IDeal } from '@/types/deals.types'
import { useCreateComment } from './useCreateComment'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from "@tanstack/vue-query";
import { DB } from '@/lib/appwrite'
import { COLLECTION_DEALS, DB_ID } from "@/lib/app.constants";
import { useDealSlideStore } from '@/stores/deal-slide.store' 
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent,  TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import  ModalOk  from '@/components/layout/ModalOk.vue'
import { ref } from 'vue'
//import { Skeleton } from '@/components/ui/skeleton'

const store = useDealSlideStore()
const cardId = store.card?.id || ''
const {data, refetch, isLoading} = useQuery({
      queryKey: ['deal', cardId],
      queryFn: () => DB.getDocument(DB_ID, COLLECTION_DEALS, cardId),
   })

const {commentRef, writeComment, plandataRef} = useCreateComment({refetch})
const showMod2 = ref(false)
const message = 'Введіть коментар і планову дату виконання'

const card = data as unknown as IDeal

function closMod() {
   showMod2.value = false
}

const addComment = () => {
   if (!commentRef.value || plandataRef.value == undefined ) {
      showMod2.value = true
      return
   }  
   writeComment()
}
</script>

<template>
   <div class=" mt-1 px-2 py-1 flex flex-col border bg-slate-100 rounded-md">
      <h3 class="mr-3 text-lg text-slate-500"> Створити коментар</h3>
      <div>
         <Input placeholder="Коментар"
         v-model="commentRef"
         class="mt-1"
      />   
      </div>
      <div>
         <span class="text-base text-slate-500">Планова дата </span>
         <Input placeholder="Планова дата"
            v-model="plandataRef"
            type="date"
            class=" inline-block mt-2 max-w-40"
         />
         <div class="inline-block">
            <TooltipProvider >
               <Tooltip >
                  <TooltipTrigger  @click.stop="addComment"
                  class=" inline-block transition-colors  hover:text-secondary" 
                  >
                     <img 
                     src="/add-comment_icon-icons.com_71793.svg"  width="25" alt="add comment"
                     class="inline-block ml-5 opacity-40 hover:opacity-65 "  /> 
                  </TooltipTrigger>
                  <TooltipContent>
                     <p class="text-sm">add comment</p>
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>
         </div>
      </div>
   </div>
   <div 
      v-if="isLoading" class="w-full h-[76px] rounded mt-5" 
   > Loading...
   </div>
   <div v-else-if="card">
      <div 
         v-for="comment in card?.comments"
         :key="comment.$id"
         class="flex items-start mt-2">
         <!-- <i name="system-uicons:write" class="mr-3 mt-1" size="20" /> -->
         <div class="border-border bg-slate-200 rounded p-2 w-full">
            <div class="mb-2 text-sm">
               Коментар -  {{ dayjs(comment.$createdAt).format('HH:mm') }}  /  {{ dayjs(comment.$createdAt).format('DD:MM:YY') }}
            </div>
            <p class="italic font-semibold"> {{ comment.text }} </p>
            <div class="mb-2 mt-2 text-base">
               Дата виконання:
               <span class="ml-4">
                  {{ dayjs(comment.plandata).format('DD:MM:YYYY') }}
               </span>
            </div>
         </div>
      </div>
      <ModalOk v-if="showMod2" @closeM="closMod" > {{ message }} </ModalOk>
   </div>
</template>