<script lang="ts" setup> 
import { DB } from '@/lib/appwrite';
import { useMutation } from '@tanstack/vue-query';
import { COLLECTION_OURBANKRECV, DB_ID } from '@/lib/app.constants';
import type { IOurBankRecvizits } from '@/types/company.types';
import { v4 as uuid} from 'uuid'
import { useForm } from 'vee-validate';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router';

interface IOurBankRekvFormState extends IOurBankRecvizits{} 
const router = useRouter()

const { handleSubmit, defineField } =
 useForm<IOurBankRekvFormState>()

const props = defineProps({
   refetch: {
      type: Function,
   }
})
const emit = defineEmits(['exit-add'])

const [mfo, mfoAttrs] = defineField('mfo')
const [namebank, namebankAttrs] = defineField('namebank')
const [account, accountAttrs] = defineField('account')

const { mutate, isPending } = useMutation({
   mutationKey: ['create rekvuzut'],
   mutationFn: (data: IOurBankRekvFormState) => DB.createDocument(DB_ID, COLLECTION_OURBANKRECV, uuid(), data),
   onSuccess(){
      props.refetch && props.refetch()
   }
})

const onSubmit = handleSubmit(values => {
   mutate(values)
   
})

function exit(){
   emit('exit-add')
}

</script>

<template>
   <div class="p-5 wrapp">
      <div class="flex justify-between" >
         <h2 class="heared-title font-bold text-2xl mb-5">
            Додати банківські реквізити 
         </h2>   
         <button type="button"
         class="hover:opacity-45"
         @click="exit" >
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
      <form @submit="onSubmit"  class="form" >
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
.wrapp
   margin: 10px 20px
   border: 2px solid  #aaa
   border-radius: 10px

.input
   @apply border-[#161c26] mb-2 placeholder:text-[#748092] focus:border transition-colors

</style> 
