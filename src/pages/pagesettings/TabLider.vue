<script lang="ts" setup>
import { DB } from '@/lib/appwrite';
import { Table, TableBody, TableCaption, TableCell, TableHead,
  TableHeader, TableRow, } from '@/components/ui/table'
import { useQuery } from '@tanstack/vue-query';
import {  DB_ID, COLLECTION_OURCHIFS } from '@/lib/app.constants';
import type { IOurChifs } from '@/types/company.types';
import { ref } from 'vue'
import TooltipBlock from '@/components/layout/TooltipBlock.vue'
import AddPerson from '@/pages/pagesettings/add/AddPerson.vue'
import { useRouter } from 'vue-router';

const button = {
   edit: 'customers/edit.svg',
   edit1: 'edit',
   del: 'customers/delete.svg',
   del1: 'delete',
   add: 'plusadd.svg',
   add1: 'add',
}
const router = useRouter()
const showAddForm = ref(false)

let chifs:IOurChifs[]
const {data, isLoading, refetch} = useQuery({
   queryKey: ['ourchifs'],
   queryFn: () => DB.listDocuments(DB_ID, COLLECTION_OURCHIFS),
   select(data) {
      chifs = data.documents as unknown as IOurChifs[]
   }
})

function delitem(val: string) {
   if(confirm('Підтвердіть видалення ?')) {
      let docId = val
      const promise = DB.deleteDocument(DB_ID, COLLECTION_OURCHIFS, docId)
      promise.then(function () {
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

</script>
<template>
   <div class="p-4">
      <div v-if="isLoading"> Loading... </div>
        
      <Table v-else>
         <TableHeader>
            <TableRow>
               <TableHead class="w-[250px]">Назва посади</TableHead>
               <TableHead class="w-[250px]">Назва посади у родовому відм.</TableHead>
               <TableHead class="w-[250px]">П І Б</TableHead>
               <TableHead class="w-[250px]">П І Б у родовому відмінку</TableHead>
               <TableHead class="w-[400px]">Документ на підставі якого діє</TableHead>
               <TableHead class="w-[200px]"></TableHead>
            </TableRow>
         </TableHeader> 
         <TableBody v-if="chifs">
            <TableRow 
               v-for="item in chifs"
               :key="item.$id"
            >
               <TableCell class="font-medium">
                  {{ item.jobtitle }}
               </TableCell>
               <TableCell>
                  {{ item.jobtitleadd }}
               </TableCell>
               <TableCell>
                  {{ item.name }}
               </TableCell>
               <TableCell>
                  {{ item.nameadd }}
               </TableCell>
               <TableCell>
                  {{ item.document }}
               </TableCell>
               <TableCell class="flex justify-start flex-wrap">
                  <RouterLink 
                     :to="`/settings/edit/person/${item.$id}`"
                     class="transition-all mr-3 mt-3 opacity-40 hover:opacity-100  hover:text-[#a252c8]"
                     style="min-width: 40px;"
                     :refetch="refetch"
                  >
                     <TooltipBlock :src='button.edit' :name="button.edit1"/>
                  </RouterLink>
                  <button 
                  @click.stop='delitem(item.$id)'
                     class="transition-all opacity-40 mt-3  hover:opacity-100  hover:text-[#a252c8]"
                  >
                     <TooltipBlock :src='button.del' :name="button.del1"/>
                  </button> 
 
               </TableCell>
            </TableRow>
         </TableBody>
      </Table> 
      <div class="block-btn" >
         <button  v-if="!showAddForm"
            class="transition-all opacity-40  hover:opacity-100 hover:text-[#a252c8]" 
            @click.stop="onShowAddForm"
         >
         <TooltipBlock :src='button.add' :name="button.add1"/>
      </button>
      </div>
   </div>
   <section class="add-form">
      <AddPerson 
      v-if="showAddForm"
      @exit-add="setShowAddForm" />
   </section>
</template>

<style lang="sass" scoped>

.my-btn:hover
   color: #fff 

.block-btn
   margin-top: 10px
   display: flex
   justify-content: center
.btn-add
   padding: 5px 12px

.btn-add:hover
   color: #fff
</style>