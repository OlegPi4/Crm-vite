<script lang="ts" setup>
import type { ICard, IColumn } from '@/components/kanban/kanban.types'
import { useKanbanQuery } from '@/components/kanban/useKanbanQuery'
import { converterCurrency } from '@/lib/converterCurrency'
import dayjs from 'dayjs'; 
import {useMutation} from '@tanstack/vue-query'
import { DB } from '@/lib/appwrite'
import { DB_ID, COLLECTION_DEALS } from '@/lib/app.constants'
import type { EnumStatus } from '@/types/deals.types';
import { generateColumnStyle } from '@/components/kanban/generate-gradient'
import { ref } from 'vue'
import { useDealSlideStore } from '@/stores/deal-slide.store'
import { Card, CardContent, CardDescription,  CardFooter, CardHeader,         CardTitle,} from '@/components/ui/card'
import  CreateDeal  from '@/components/kanban/CreateDeal.vue'
import  Sideover from '@/components/kanban/sideover/Sideover.vue'

const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const {data, isLoading, refetch} = useKanbanQuery();

const store = useDealSlideStore()
const dialogOpen = ref(false);

const closeDialog = () => {
  dialogOpen.value = false;
};

function openSideBar(card:ICard) {
   store.set(card);
   dialogOpen.value = true;
}

type TypeMutationVariables = {
   docId: string
   status?: EnumStatus
}

const { mutate } = useMutation({
   mutationKey: ['move card'],
   mutationFn: ({ docId, status}: TypeMutationVariables) => DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, {
      status,
   }),
   onSuccess: () => {
      refetch()
   },
})

function handleDragStart(card: ICard, column: IColumn) {
   dragCardRef.value = card
   sourceColumnRef.value = column
}

function handleDragOver(event: DragEvent) {
   event.preventDefault()
}

function handleDrop(targetColumn: IColumn) {
   if(dragCardRef.value && sourceColumnRef.value) {
      mutate({ docId: dragCardRef.value.id, status: targetColumn.id })
   }
}

</script>

<template>
   <div class="xl:p-10 p-5">
      <h1 class="mb-10 text-cyan-800 text-xl" 
        style="font-size: 46px;
        font-weight: 700;"
        > 
        SRM-System
      </h1>
      <div v-if="isLoading">Loading...</div>
      <div v-else>
         <div class="grid grid-cols-5 xl:gap-8 gap-4 ">
            <div v-for="(column, index) in data"
               :key="column.id"
               @dragover="handleDragOver"
               @drop="() => handleDrop(column)"
               class="min-h-screen"
               >
               <div class="rounder bg-blue-300 py-1 xl:px-5 px-2
                  mb-3 text-center font-medium lg:text-lg text-base rounded-md"
                  :style="generateColumnStyle(index, data?.length)"   
               >
                  {{ column.name }}
               </div>
               <div>
                  <CreateDeal :refetch="refetch" :status="column.id" />
                  <Card 
                  v-for="card in column.items" 
                     :key="card.id"
                     class="mb-2 bg-slate-200 card"
                     draggable="true"
                     @click.stop="openSideBar(card)"
                     @dragstart="() => handleDragStart(card, column)"
                     > 
                     <CardHeader role="button" >
                         {{ card.name }} 
                     </CardHeader>
                     <CardDescription class="pl-3  font-bold">
                         {{ converterCurrency(card.price) }}
                     </CardDescription> 
                     <CardContent>
                        <div class="contragent"> 
                           <span>Контрагент:</span>
                        </div> 
                        <div class="contragent">   
                           {{ card.companyName }}
                        </div>   
                     </CardContent>
                     <CardFooter> 
                        {{ dayjs(card.$createdAt).format('DD MMMM YYYY') }} 
                     </CardFooter>   
                  </Card>         
               </div>
            </div>
         </div>   
         <Sideover 
            :is-open="dialogOpen"
            @update:is-open="closeDialog"
         />
      </div>     
   </div>
</template>

<style  scoped>

.contragent {
   font-weight: 600;
}
.contragent span {
   font-size: 14px;
   font-style: italic;
}
</style>