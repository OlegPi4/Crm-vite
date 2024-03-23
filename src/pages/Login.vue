<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { useIsLoadingStore, useAuthStore } from '@/stores/auth.store'
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { v4 as uuid} from 'uuid'
import { account } from "@/lib/appwrite";   
import { Button } from '@/components/ui/button';
import  ModalOk  from '@/components/layout/ModalOk.vue'


const emailRef = ref('');  
const password = ref('');
const name = ref('');

const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();
const showMod2 = ref(false)
const message = ref()


const login = async () => {
   isLoadingStore.set(true);
   try {
      await account.createEmailSession(emailRef.value, password.value);
      const response = await account.get()   
            
      if(response) {
         authStore.set({
            email: response.email,
            name: response.name,
            status: response.status,
                  
         })
      }
      emailRef.value = '';
      password.value = '';
      name.value = '';

      await router.push('/');
      isLoadingStore.set(false);
   } catch(error) {
      isLoadingStore.set(false);
      message.value = 'Введіть вірно данні або зареєструйтесь'
      showMod2.value = true;
      
   } finally {
      emailRef.value = '';
      password.value = '';
      name.value = '';
   }
}

const registr = async () => {
   await account.create(uuid(), emailRef.value, password.value, name.value,);
   message.value = 'Очікуйте підтвердження на email'
   showMod2.value = true;
   emailRef.value = '';
   password.value = '';
   name.value = '';
}

function closMod() {
   showMod2.value = false
}

</script>
<template>
   <div class="flex item-centre justify-center min-h-60 w-full mt-60 ">
      <div class="rounder bg-sidebar w-1/2 p-5 ">
         <h1 class="text-center mb-5"
         style="font-size: 36px;
         font-weight: 700;"
         >Login</h1>
      <form>
         <Input placeholder="Email" type="email" class="mb-3"    
         style="color: rgb(44, 51, 58);"
         v-model="emailRef" />
         <Input placeholder="Password" type="password" class="mb-3"
         style="color: rgb(44, 51, 58);"
         v-model="password" />
         <Input placeholder="Name" type="name" class="mb-3"
         style="color: rgb(44, 51, 58);"
         v-model="name" />   
         <div class="flex items-center justify-center gap-5">
            <Button type="button" @click="login">Login</Button>		
            <Button type="button" @click="registr">Register</Button>
         </div>
      </form>
      </div>
      <ModalOk v-if="showMod2" @closeM="closMod" > {{ message }} </ModalOk>
   </div>
</template>

<style scoped>
Button:hover  {
   opacity: 0.8;
}
</style>