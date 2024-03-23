<script lang="ts" setup>
import { DB } from '@/lib/appwrite';
import { Table, TableBody, TableCaption, TableCell, TableHead,
  TableHeader, TableRow, } from '@/components/ui/table'
import { useQuery } from '@tanstack/vue-query';
import {  DB_ID, COLLECTION_OURCOMPANY } from '@/lib/app.constants';
import type { IOurCompany } from '@/types/company.types';
import { ref } from 'vue';
import TooltipBlock from '@/components/layout/TooltipBlock.vue'

let companys:IOurCompany[] 
const {data, isLoading, refetch} = useQuery({
   queryKey: ['ourcompany'],
   queryFn: () => DB.listDocuments(DB_ID, COLLECTION_OURCOMPANY),
   select(data) {
      companys = data.documents as unknown as IOurCompany[]
   } 
})

const button = {
   edit: 'customers/edit.svg',
   edit1: 'edit',
}

const comp = ref() 

function edit(val:IOurCompany[]) {
   comp.value = val
}
refetch()


</script>
<template>
   <div class="p-2">
      <div v-if="isLoading"> Loading... </div>
      <Table v-else>
         <TableHeader>
            <TableRow>
               <TableHead class="w-[400px]">Назва</TableHead>
               <TableHead class="w-[300px]">Скорочена назва</TableHead>
               <TableHead class="w-[400px]">Адреса</TableHead>
               <TableHead class="w-[300px]">ЄДРПОУ</TableHead>
               <TableHead class="w-[200px]"></TableHead>
            </TableRow>
         </TableHeader> 
         <TableBody v-if="companys">
            <TableRow 
               v-for="item in companys"
               :key="item.$id"
            >
               <TableCell class="font-medium">
                  {{ item.namelong }}
               </TableCell>
               <TableCell>
                  {{ item.nameshort }}
               </TableCell>
               <TableCell>
                  {{ item.address }}
               </TableCell>
               <TableCell>
                  {{ item.edrpo }}
               </TableCell>
               <TableCell class="flex justify-start">
                  <RouterLink 
                     :to="`/settings/edit/company/${item.$id}`"
                     :refetch='refetch' 
                     class="transition-all opacity-40 hover:opacity-100  hover:text-[#a252c8]"
                  >
                     <TooltipBlock :src='button.edit' :name="button.edit1"/>
                  </RouterLink>
               </TableCell>
            </TableRow>
         </TableBody>
      </Table> 
   </div>
</template>

<style lang="sass" scoped>
.my-btn
   padding: 3px 8px
   border-radius: 4px

.my-btn:hover
   color: #fff 

</style>