<script lang="ts" setup >   
import { Button } from '@/components/ui/button' 
import { MENU_DATA } from './menu.data';
import { useAuthStore, useIsLoadingStore } from '@/stores/auth.store'
import { account } from '@/lib/appwrite';
import { useRouter } from 'vue-router';
import TooltipBlock from '@/components/layout/TooltipBlock.vue';
import { reactive } from 'vue';

const menuRef = reactive(MENU_DATA) 

const button = {
   exit: 'logout_90894.svg',
   exit1: 'exit'
}

const auth = useAuthStore();
const isLoadingStore = useIsLoadingStore();
const router = useRouter();

const logout = async() => {
   isLoadingStore.set(true);
   await account.deleteSession('current');
   auth.clear();
   await router.push('/login')
   isLoadingStore.set(false);
}
</script>

<template>
   <aside class="px-5 py-8 bg-sidebar bg-gray-300 h-full relative w-full" > 
      <div >
         <button  @click="logout"
         class="absolute right-2 top-2 transition-colors  hover:text-secondary">
            <TooltipBlock :src=button.exit :name=button.exit1 />
         </button>
      </div>
      <div class="mb-10 mt-5 block" >                    
         <img src="/Logo2.svg" alt="logotype" width="150px" class="mx-auto logo-img "  /> 
      </div>
      <div v-for="item in menuRef"
         :key="item.name"
         class="flex flex-col mb-2 items-start">
         <RouterLink    
         :to="item.url"
         class="mb-2 " >
            <Button class="btn flex justify-start ">
               <div>
                  <img :src="item.icon"  width="25px" class="mx-auto "  />    
               </div>
               <div>
                  <span class="ml-2"> {{ item.name }}</span>   
               </div>
           </Button>		   
         </RouterLink>
      </div>
   </aside>
</template>

<style  scoped>
.btn-exit:hover {
   width: 30px;
   height: 30px;   
}
.logo-img {
    border-radius: 50%;
    border: 1px solid #9b910c
}
.btn {
   background-color: inherit;
   color: #777;
   font-size: 1.1rem;
   width: 160px;
}
.btn:hover {
   background-color: #dff1f7;
}
</style>
