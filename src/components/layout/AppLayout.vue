<script lang="ts" setup>
import SideBar from '@/components/layout/SideBar.vue'
import { account } from "@/lib/appwrite";
import { useAuthStore, useIsLoadingStore } from '@/stores/auth.store'
import { useRouter } from 'vue-router';
import { onMounted } from 'vue'
import Loader from '@/components/layout/Loader.vue' 
import type {IAuthStore} from '@/stores/auth.store'

const isLoadingStore = useIsLoadingStore();
const auth = useAuthStore();
const router = useRouter();

onMounted( async () => {
   try {
      const user = await account.get()
      if(user) auth.set(user)
   } catch {
      router.push('/login');
   } finally {
      isLoadingStore.set(false);
   }
})   

</script>

<template>
   <Loader v-if="isLoadingStore.isLoading" />
   <section 
      v-else :class="{grid: auth.isAuth}" 
      style="min-height: 100vh">
      <SideBar 
         v-if="auth.isAuth"   
      />
      <div>
         <slot />				
      </div>
   </section>
</template>
<style  scoped>
.grid { 
   display: grid;
   grid-template-columns:  1fr 6fr;
}
@media screen and (max-width: 1024px) { 
   .grid {
      grid-template-columns:  1fr 4fr;
   }
}
.sidebar {
   background-color: #d1dada;
}
</style>
