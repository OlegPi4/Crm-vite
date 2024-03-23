<script lang="ts" setup> 
import { DB } from '@/lib/appwrite';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { COLLECTION_OURBANKRECV, DB_ID } from '@/lib/app.constants';
import type { IOurBankRecvizits } from '@/types/company.types';
import { useRouter, useRoute } from 'vue-router';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'vee-validate';
import { watch } from 'vue';

interface IOurBankRekvFormState extends IOurBankRecvizits{} 

const route = useRoute()
const docId = route.params.rid as string
const router = useRouter();

const { handleSubmit, defineField, setFieldValue, setValues, values } =
   useForm<IOurBankRekvFormState>()

const { data, isSuccess, isLoading, refetch } = useQuery({
   queryKey: ['get person', docId],
   queryFn: () => DB.getDocument(DB_ID, COLLECTION_OURBANKRECV, docId),
}) 
const emit = defineEmits(['exit-edit'])


watch(isSuccess, () => {
   const initialData = data.value as unknown as IOurBankRekvFormState
   setValues({
      mfo: initialData.mfo,
      namebank: initialData.namebank,
      account: initialData.account,
   })
})

const [mfo, mfoAttrs] = defineField('mfo')
const [namebank, namebankAttrs] = defineField('namebank')
const [account, accountAttrs] = defineField('account')

const { mutate, isPending} = useMutation({
   mutationKey: ['update ourcompany', docId],
   mutationFn: (data: IOurBankRekvFormState) => DB.updateDocument(DB_ID, COLLECTION_OURBANKRECV, docId, data),
   onSuccess: () => {
      refetch()
   }   
})

const onSubmit = handleSubmit(values => {
   mutate(values)
   router.go(-1);
   emit('exit-edit')  
})
function exit() {
   router.go(-1)
}

</script>

<template>
   <div class="p-10">
      <div class="flex justify-between ">
         <h2 class="font-bold text-2xl mb-5">
         Редагування банківських реквізитів 
         </h2>
         <button type="button"
            class="mr-5"
            @click="exit" >
            <svg
               class="h-5 w-5 hover:opacity-45"
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
      <div v-if="isLoading"> Loading...</div>
      <form v-else @submit="onSubmit"  class="form" >
         <Input 
            placeholder="МФО банку"
            v-model="mfo"
            v-bind="mfoAttrs"
            class="input"
            type="number"
         />
         <Input 
            placeholder="Назва банку"
            v-model="namebank"
            v-bind="namebankAttrs"
            class="input"
            type="text"
         />
         <Input 
            placeholder="Рахунок"
            v-model="account"
            v-bind="accountAttrs"
            class="input"
            type="text"
         />
         <Button :disabled="isPending" variant="secondary" class="mt-3 hover:text-white" style="background-color: #bbb; ">
            {{ isPending ? 'Загрузка...' : 'Зберегти' }}
         </Button>
      </form>
   </div>
</template>

<style lang="sass" scoped>
.input
   @apply border-[#161c26] mb-2 placeholder:text-[#748092] focus:border transition-colors

</style>