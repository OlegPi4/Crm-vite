import { useMutation } from "@tanstack/vue-query"
import { DB } from '@/lib/appwrite'
import { COLLECTION_COMMENTS, DB_ID } from "@/lib/app.constants"
import { v4 as uuid } from 'uuid'  
import { ref } from 'vue'             
import { useDealSlideStore } from '@/stores/deal-slide.store'


export function useCreateComment({ refetch }: { refetch: () => void}) {
   const store = useDealSlideStore()
   const commentRef = ref<string>()
   const plandataRef = ref<string>()


   const { mutate } = useMutation({
      mutationKey: ['add coments', commentRef.value],
      mutationFn: () => DB.createDocument(DB_ID, COLLECTION_COMMENTS, uuid(), {
         text: commentRef.value,
         deal: store.card?.id,
         plandata: plandataRef.value 
      }),
      onSuccess: () => {
         refetch()
         commentRef.value = ''
         plandataRef.value = ''
      },
   })

   const writeComment = () => {
      if (!commentRef.value || plandataRef.value == undefined ) {
         return
      } 
      mutate()
   }
   return {
      writeComment,
      commentRef,
      plandataRef,
   }
}