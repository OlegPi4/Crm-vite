<script lang="ts" setup> 
import { DB } from '@/lib/appwrite';
import { storage } from '@/lib/appwrite';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { COLLECTION_CUSTOMERS, DB_ID, STORAGE_ID } from '@/lib/app.constants';
import { v4 as uuid } from 'uuid';
import type { ICustomer } from '@/types/deals.types';
import { useRoute, useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { watch } from 'vue'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ICustomerFormState
   extends Pick<ICustomer, 'avatar_url' | 'email' | 'name' | 'from_source' | 'mfo' | 'account' | 'nameBank' | 'fioLider' | 'fioLiderBy'> {}

interface InputFileEvent extends Event {
   target: HTMLInputElement
}

const props = defineProps({
   refetch: {
      type: Function,
   }
})

const route = useRoute()
const router = useRouter()
const customerId = route.params.rid as unknown as string

const { handleSubmit, defineField, setFieldValue, setValues, values, handleReset } = useForm<ICustomerFormState>()

const { data, isSuccess } = useQuery({
   queryKey: ['get custumer', customerId],
   queryFn: () => DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, customerId),

}) 

watch(isSuccess, () => {
      const initialData = data.value as unknown as ICustomerFormState
   setValues({
      email: initialData.email,
      avatar_url: initialData.avatar_url,
      from_source: initialData.from_source || '',
      name: initialData.name,
      mfo: initialData.mfo,
      account: initialData.account,
      nameBank: initialData.nameBank,
      fioLider: initialData.fioLider,
      fioLiderBy: initialData.fioLiderBy
   })
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [fromsource, fromsourceAttrs] = defineField('from_source')
const [mfo, mfoAttrs] = defineField('mfo')
const [account, accountAttrs] = defineField('account')
const [nameBank, nameBankAttrs] = defineField('nameBank')
const [fioLider, fioLiderAttrs] = defineField('fioLider')
const [fioLiderBy, fioLiderByAttrs] = defineField('fioLiderBy')

const { mutate, isPending } = useMutation({
   mutationKey: ['update customer', customerId],
   mutationFn: (data: ICustomerFormState) => DB.updateDocument(DB_ID, COLLECTION_CUSTOMERS, customerId, data),
   onSuccess(){
      props.refetch && props.refetch()
      handleReset()
   }
})

const onSubmit = handleSubmit(values => {
   mutate(values)
   props.refetch
   router.go(-1)
})

const { mutate: uploadImage, isPending: isUploadImagePending } = useMutation({
   mutationKey: ['upload image'], 
   mutationFn: (file: File) => storage.createFile(STORAGE_ID, uuid(), file),
   onSuccess(data) {
      const response = storage.getFileDownload(STORAGE_ID, data.$id)
      setFieldValue('avatar_url', response.href)
   }
})

</script>

<template>
   <div class="py-5  px-8 max-w-4xl">
         <div class="flex justify-between">
            <h2 class="font-semibold text-2xl mb-10 inline-block">
               <span class="mr-8">Редагування :</span> {{ (data as unknown as ICustomerFormState)?.name }} 
            </h2>   
            <RouterLink 
            :to="`/customers`"
            class="transition-all opacity-40 hover:opacity-100  hover:text-[#111011]"
            >
               <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 20 20"
                  >
                  <path
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     stroke-width="2"
                     d="M6 18L18 6M6 6l12 12"
                  ></path>
               </svg> 
            </RouterLink>   
         
         </div>
      <form @submit="onSubmit"  class="form" >
         <Input 
            placeholder="Назва"
            v-model="name"
            v-bind="nameAttrs"
            class="input"
            type="text"
         />
         <Input 
            placeholder="Email"
            v-model="email"
            v-bind="emailAttrs"
            class="input"
            type="email"
         />
         <Input 
            placeholder="Джерело залучення"
            v-model="fromsource"
            v-bind="fromsourceAttrs"
            class="input"
            type="text"
         />
         <Input 
            placeholder="МФО"
            v-model="mfo"
            v-bind="mfoAttrs"
            class="input"
            type="number"
         />
         <Input 
            placeholder="Рахунок"
            v-model="account"
            v-bind="accountAttrs"
            class="input"
            type="text"
         />
         <Input 
            placeholder="Назва банку"
            v-model="nameBank"
            v-bind="nameBankAttrs"
            class="input"
            type="text"
         />
         <Input 
            placeholder="ПІБ керівника"
            v-model="fioLider"
            v-bind="fioLiderAttrs"
            class="input"
            type="text"
         />
         <Input 
            placeholder="ПІБ керів. в род. відмінку"
            v-model="fioLiderBy"
            v-bind="fioLiderByAttrs"
            class="input"
            type="text"
         />
         <img 
            v-if="values.avatar_url || isUploadImagePending"
            :src="values.avatar_url"
            alt=""
            width="50"
            height="50"
            class="roumded-full my-2"
         />
         <div class="grid w-full max-w-sm items-center gap-1.5 input">
            <label for="Логотип">
               <Input
                  type="file"
                  :onchange="(e:InputFileEvent) => e?.target?.files?.length && uploadImage(e.target.files[0])"
                  :disabled="isUploadImagePending"
               />
            </label>
         </div>
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