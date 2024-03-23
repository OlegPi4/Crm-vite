<script lang="ts" setup>
import { useMutation } from '@tanstack/vue-query'
import { v4 as uuid} from 'uuid'
import { COLLECTION_DEALS, DB_ID } from '@/lib/app.constants'
import type { IDeal } from '@/types/deals.types'
import { DB } from '@/lib/appwrite'
import { defineProps, ref } from 'vue'
import { useForm } from 'vee-validate';
import  ModalOk  from '@/components/layout/ModalOk.vue'
import TooltipBlock from '@/components/layout/TooltipBlock.vue';

const button = {
   create: 'arrowdown_icon-icons.com_61188.svg',
   create1: 'close',
   add: 'plusadd.svg',
   add1: 'create new'
}



const isOpenForm = ref(false);
const showMod2 = ref(false);
const message = ref()

interface IDealFormState extends Pick<IDeal, 'name' | 'price'>
{
   customer: {
      email: string
      name: string
   }
   status: string
}

const props = defineProps({
   status: {
      type: String,
      default: '',
   },
   refetch: {
      type: Function,
   }
})

const {handleSubmit, defineField, handleReset} = useForm<IDealFormState>({
   initialValues: {
      status: props.status
   }
}) 

const [name, nameAttrs] = defineField('name')
const [price, priceAttrs] = defineField('price')
const [customerEmail, customerEmailAttrs] = defineField('customer.email')
const [customerName, customerNameAttrs] = defineField('customer.name')

const {mutate, isPending} = useMutation({
   mutationKey: ['create a new deal'],
   mutationFn: (data: IDealFormState) => DB.createDocument(DB_ID, COLLECTION_DEALS, uuid(), data),
   onSuccess(){
      props.refetch && props.refetch()
      handleReset()
   },
   onError(error) {
      message.value = `Корректно введіть данні, сума має бути вказана цифрами. `
      showMod2.value = true;
   }
})

const onSubmit = handleSubmit(values => {
   mutate(values)
}) 

function closMod() {
   showMod2.value = false
}

</script> 
<template>
   <div class="wrapper"> 
      <div class="text-center " v-if="status == 'todo'" >
         <button class="transition-all opacity-15  hover:opacity-100  hover:text-[#a252c8]"
         @click="isOpenForm = !isOpenForm">
         <TooltipBlock v-if="isOpenForm" :src="button.create" :name="button.create1" />
            <TooltipBlock v-else :src="button.add" :name="button.add1" />
         </button>
      </div>
      <div class="form">
         <form v-if="isOpenForm"
            @submit="onSubmit"
            class="form">
            <input
               placeholder="Назва"
               v-model="name"
               v-bind="nameAttrs"
               type="text"
               class="input"
            />
            <input 
               placeholder="Вартість"
               v-model="price"
               v-bind="priceAttrs"
               type="text"
               class="input"
            />
            <input 
               placeholder="Email"
               v-model="customerEmail"
               v-bind="customerEmailAttrs"
               type="text"
               class="input"
            />
            <input 
               placeholder="Контрагент"
               v-model="customerName"
               v-bind="customerNameAttrs"
               type="text"
               class="input"
            />
            <button class="btn btn-add" :disabled="isPending">
               {{ isPending ? 'Загрузка...' : 'Додати'  }}
            </button>
         </form>   
      </div>
      <ModalOk v-if="showMod2" @closeM="closMod" > {{ message }} </ModalOk>   
   </div> 
</template>

<style scoped>
.input{
   @apply border-[#161c26]  mb-2 placeholder:text-[#748092] focus:border-border transition-colors py-1 px-2 ;
}

.btn {
   @apply text-base border-2 py-1 px-2 rounded border-[#808b99] hover:border-[#2c5065] transition-colors text-[#616e80] hover:text-slate-800 hover:border-2;
}

.btn-add {
   max-width: 120px;
}
.form {
   position: relative;
   display: flex;
   flex-direction: column;
   z-index: 10;
   min-width: 600px;
}

form {
   @apply mb-3 block min-w-80;
   animation: show 0.3s ease-in-out;
   background-color: #f1dfdc;
   padding: 10px 10px;
   border-radius: 8px;

}

@keyframes show {
   from {
      @apply border-[#a252c83d];
      transition: translateY(-35px);
      opacity: 0.4; 
   }

   90% {
      @apply border-[#a252c83d];
   }

   to {
      @apply border-transparent;
      transition: translateY(0);
      opacity: 1; 
   }
}
</style>