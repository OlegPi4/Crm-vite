<script lang="ts" setup> 
import { DB } from '@/lib/appwrite';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { COLLECTION_OURCOMPANY, DB_ID } from '@/lib/app.constants';
import type { IOurCompany } from '@/types/company.types';
import { useRoute, useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { watch } from 'vue';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const props = defineProps({
   refetch: {
      type: Function,
   }
})

interface IOurCompanyFormState extends IOurCompany{} 

const route = useRoute()
const router = useRouter()

const companyId = route.params.rid as string

const { handleSubmit, defineField, setFieldValue, setValues, values } =
   useForm<IOurCompanyFormState>()

const { data, isSuccess } = useQuery({
   queryKey: ['get company', companyId],
   queryFn: () => DB.getDocument(DB_ID, COLLECTION_OURCOMPANY, companyId),
}) 

watch(isSuccess, () => {
   const initialData = data.value as unknown as IOurCompanyFormState
   setValues({
      namelong: initialData.namelong,
      nameshort: initialData.nameshort,
      address: initialData.address,
      edrpo: initialData.edrpo
   })
})

const [namelong, namelongAttrs] = defineField('namelong')
const [nameshort, nameshortAttrs] = defineField('nameshort')
const [address, addressAttrs] = defineField('address')
const [edrpo, edrpoAttrs] = defineField('edrpo')

const { mutate, isPending } = useMutation({
   mutationKey: ['update ourcompany', companyId],
   mutationFn: (data: IOurCompanyFormState) => DB.updateDocument(DB_ID, COLLECTION_OURCOMPANY, companyId, data),
   onSuccess(data) {
      props.refetch && props.refetch()
   }
})

const onSubmit = handleSubmit(values => {
   mutate(values)
   router.go(-1)
})

function exit() {
   router.go(-1)
}

</script>

<template>
   <div class="p-10">
      <div class="flex justify-between ">
         <h2 class="font-bold text-2xl mb-5">
         Редагування реквізитів компанії 
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
      <form @submit="onSubmit"  class="form" >
         <Input 
            placeholder="Повна назва"
            v-model="namelong"
            v-bind="namelongAttrs"
            class="input"
            type="text"
         />
         <Input 
            placeholder="Скорочена назва"
            v-model="nameshort"
            v-bind="nameshortAttrs"
            class="input"
            type="text"
         />
         <Input 
            placeholder="Юридична адреса"
            v-model="address"
            v-bind="addressAttrs"
            class="input"
            type="text"
         />
         <Input 
            placeholder="Код ЄДРПОУ"
            v-model="edrpo"
            v-bind="edrpoAttrs"
            class="input"
            type="number"
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