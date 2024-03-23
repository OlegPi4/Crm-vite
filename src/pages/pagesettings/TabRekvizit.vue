<script lang="ts" setup>
import { DB } from '@/lib/appwrite';
import { Table, TableBody, TableCaption, TableCell, TableHead,
  TableHeader, TableRow, } from '@/components/ui/table'
import { useQuery, useMutation } from '@tanstack/vue-query';
import {  DB_ID, COLLECTION_OURBANKRECV } from '@/lib/app.constants';
import type { IOurBankRecvizits } from '@/types/company.types';
import { ref } from 'vue'
import TooltipBlock from '@/components/layout/TooltipBlock.vue'
import AddRekvizit from '@/pages/pagesettings/add/AddRekvizit.vue'
import { useRouter } from 'vue-router';

const router = useRouter()

let rekvizits:IOurBankRecvizits[]
const {data, isLoading, refetch} = useQuery({
   queryKey: ['ourrecvizits'],
   queryFn: () => DB.listDocuments(DB_ID, COLLECTION_OURBANKRECV),
   select(data) {
      rekvizits = data.documents as unknown as IOurBankRecvizits[]
   }
})

const button = {
   edit: 'customers/edit.svg',
   edit1: 'edit',
   del: 'customers/delete.svg',
   del1: 'delete',
   add: 'plusadd.svg',
   add1: 'add'
}

const docId = ref('')
const showAddForm = ref(false)

function delitem(val: string) {
   if(confirm('Підтвердіть видалення ?')) {
      docId.value = val
      const promise = DB.deleteDocument(DB_ID, COLLECTION_OURBANKRECV, docId.value)
      promise.then(function () {
         docId.value = ''
         alert('Запис видалено')
         router.go(0)
      }, function (error:string) {
         alert(error)
      })
   }
}

function onShowAddForm() {
   showAddForm.value = true;
}
function setShowAddForm() {
   showAddForm.value = false;
   router.go(0)
}
function exitEdit() {
   router.go(0)
}

</script>
<template>
   <div class="p-4">
      <div v-if="isLoading"> Loading... </div>
        
      <Table v-else>
         <TableHeader>
            <TableRow>
               <TableHead class="w-[180px]">МФО</TableHead>
               <TableHead class="w-[300px]">Назва банку</TableHead>
               <TableHead class="w-[250px]">Рахунок</TableHead>
               <TableHead class="w-[200px]"></TableHead>
            </TableRow>
         </TableHeader> 
         <TableBody v-if="rekvizits">
            <TableRow  
               v-for="item in rekvizits"
               :key="item.$id"
            >
               <TableCell class="font-medium">
                  {{ item.mfo }}
               </TableCell>
               <TableCell>
                  {{ item.namebank }}
               </TableCell>
               <TableCell>
                  {{ item.account }}
               </TableCell>
            
               <TableCell class="flex justify-start">
                  <RouterLink 
                     :to="`/settings/edit/rekvizit/${item.$id}`"
                     class="transition-all mr-5 opacity-40 hover:opacity-100  hover:text-[#a252c8]"
                     :refetch="refetch"
                  >
                     <TooltipBlock :src='button.edit' :name="button.edit1"/>
                  </RouterLink>
                  <button 
                     @click.stop='delitem(item.$id)'
                     @exit-edit="exitEdit"
                     class="transition-all opacity-40  hover:opacity-100  hover:text-[#a252c8]"
                  >
                     <TooltipBlock :src='button.del' :name="button.del1"/>
                  </button> 
               </TableCell>   
            </TableRow>
         </TableBody>
      </Table> 
      <div class="block-btn" >
         <button  v-if="!showAddForm"
            @click.stop="onShowAddForm"
            class="transition-all opacity-40  hover:opacity-100 hover:text-[#a252c8]"  
         >
            <TooltipBlock :src='button.add' :name="button.add1"/>
         </button>
      </div>
   </div>
   <section class="add-form">
      <AddRekvizit 
      v-if="showAddForm"
      @exit-add="setShowAddForm" />
   </section>
</template>

<style lang="sass" scoped>
.table-row
   min-width: 100%
   display: flex
   justify-content: space-between

.my-btn:hover
   color: #fff 

.block-btn
   margin-top: 10px
   display: flex
   justify-content: center
.btn-add 
   margin-top: 8px
   padding: 5px 12px

.btn-add:hover
   color: #fff
</style>