<script lang="ts" setup> 
import { DB } from '@/lib/appwrite';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { COLLECTION_OURCHIFS, DB_ID } from '@/lib/app.constants';
import type { IOurChifs } from '@/types/company.types';
import { useRoute, useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { watch } from 'vue';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface IOurPersonsFormState extends IOurChifs{} 

const route = useRoute()
const router = useRouter()
const docId = route.params.rid as string

const { handleSubmit, defineField, setFieldValue, setValues, values } =
   useForm<IOurPersonsFormState>()
 
const { data, isSuccess } = useQuery({
   queryKey: ['get person', docId],
   queryFn: () => DB.getDocument(DB_ID, COLLECTION_OURCHIFS, docId),
}) 

const props = defineProps({
   refetch: {
      type: Function,
   }
})

watch(isSuccess, () => {
   const initialData = data.value as unknown as IOurPersonsFormState
   setValues({
      jobtitle: initialData.jobtitle,
      jobtitleadd: initialData.jobtitleadd,
      name: initialData.name,
      nameadd: initialData.nameadd,
      document: initialData.document
   })
})

const [jobtitle, jobtitleAttrs] = defineField('jobtitle')
const [jobtitleadd, jobtitleaddAttrs] = defineField('jobtitleadd')
const [name, nameAttrs] = defineField('name')
const [nameadd, nameaddAttrs] = defineField('nameadd')
const [document, documentAttrs] = defineField('document')

const { mutate, isPending } = useMutation({
   mutationKey: ['update ourcompany', docId],
   mutationFn: (data: IOurPersonsFormState) => DB.updateDocument(DB_ID, COLLECTION_OURCHIFS, docId, data)
})

const onSubmit = handleSubmit(values => {
   mutate(values)
   props.refetch
   router.go(-1)
})
function exit() {
   router.go(-1)
}

</script>

<template>
   <div class="p-5">
      <div class="flex justify-between ">
         <h2 class="font-bold text-2xl mb-5">
         Редагування посадових осіб 
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
            placeholder="Назва посади"
            v-model="jobtitle"
            v-bind="jobtitleAttrs"
            class="input"
            type="text"
         />
         <Input 
            placeholder="Назва посади в родовому відм."
            v-model="jobtitleadd"
            v-bind="jobtitleaddAttrs"
            class="input"
            type="text"
         />
         <Input 
            placeholder="П І Б"
            v-model="name"
            v-bind="nameAttrs"
            class="input"
            type="text"
         />
         <Input 
            placeholder="П І Б в родовому відм."
            v-model="nameadd"
            v-bind="nameaddAttrs"
            class="input"
            type="text"
         />
         <Input 
            placeholder="Документ - підстава дії"
            v-model="document"
            v-bind="documentAttrs"
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