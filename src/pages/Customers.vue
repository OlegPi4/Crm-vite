<script setup  lang="ts">
import { Table, TableBody, TableCaption, TableCell, TableHead,
  TableHeader, TableRow, } from '@/components/ui/table'
import { Input } from "@/components/ui/input"
import { DB } from '@/lib/appwrite';
import { useQuery } from '@tanstack/vue-query';
import { COLLECTION_CUSTOMERS, DB_ID } from '@/lib/app.constants';
import type { ICustomer } from '@/types/deals.types';
import { ref, computed} from 'vue'
import TooltipBlock from '@/components/layout/TooltipBlock.vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const button = {
   edit: 'customers/edit.svg',
   edit1: 'edit',
   del: 'customers/delete.svg',
   del1: 'delete'
}

let customers:ICustomer[]
const {data, isLoading, refetch} = useQuery({
   queryKey: ['customers'],
   queryFn: () => DB.listDocuments(DB_ID, COLLECTION_CUSTOMERS),
   select(data) {
   customers = data.documents as unknown as ICustomer[] 
   }
})

const q = ref('')

const filteredRows = computed(() => {
  if (!q.value) {
    return customers
  }
  return customers.filter((customer) => {
    return Object.values(customer).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

function deleteCustommer(id: string) {
   if(confirm('Підтвердіть видалення ?')) {
      const promise = DB.deleteDocument(DB_ID, COLLECTION_CUSTOMERS, id)
      promise.then(function () {
         alert('Запис видалено')
         router.go(0)
      }, function (error:string) {
         alert(error)
      })
   }
}


</script>

<template>
   <div class="p-7">
      <h2 class="font-semibold text-2xl italic mb-1">Клієнти</h2>
      <div class="flex  py-3  dark:border-gray-700 w-[400px]">
            <Input v-model="q" placeholder="Пошук ..."  style="border: solid #ccc 2px"/>
      </div>
      <div v-if="isLoading"> Loading... </div>
        
      <Table v-else>
         <TableHeader class=" dark:border-gray-700 border-t text-base ">
            <TableRow >
               <TableHead class="w-[30px]">п/н</TableHead>
               <TableHead class="w-[80px]">Зображення</TableHead>
               <TableHead class="w-[200px]">Назва</TableHead>
               <TableHead class="w-[200px]">Email</TableHead>
               <TableHead class="w-[100px]">Джерело залучення</TableHead>
               <TableHead class="w-[100px]">Розгорнута інформація</TableHead>
            </TableRow>
         </TableHeader> 
         <TableBody 
            class=" dark:border-gray-700 border-b "
            >
            <TableRow 
               v-for="customer in filteredRows"
               :key="customer.$id"
            >
               <TableCell class="text-xl ">
                  {{ filteredRows.indexOf(customer) + 1 }}
               </TableCell>
               <TableCell>
                  <img 
                     :src="customer.avatar_url"
                     :alt="customer.name"
                     width="50"
                     height="50"
                     class="rounded-full"
                  > 
               </TableCell>
               <TableCell class="font-medium text-base">
                  {{ customer.name }}
               </TableCell>
               <TableCell class="text-base">
                  {{ customer.email }}
               </TableCell>
               <TableCell class="text-base">
                  {{ customer.from_source }}
               </TableCell>
               <TableCell class="flex justify-around mt-2 items-center ">
                  <RouterLink 
                     :to="`/customer/edit/${customer.$id}`"
                     :refetch="refetch"
                     class="transition-all opacity-40 hover:opacity-100  hover:text-[#a252c8]"
                  >
                     <TooltipBlock :src='button.edit' :name="button.edit1"/>
                  </RouterLink>
                  <button 
                     @click="deleteCustommer(customer.$id)"
                     class="transition-all opacity-40  hover:opacity-100  
                     hover:text-[#a252c8]"
                     :refetch="refetch"
                  >
                     <TooltipBlock :src='button.del' :name="button.del1"/>
                  </button> 
               </TableCell>
            </TableRow>
         </TableBody>
      </Table> 
   </div>
</template>
<style lang="sass" scoped>

.my-btn
   padding: 5px 12px
   border-radius: 4px 

.my-btn:hover
   color: #fff
     
</style>