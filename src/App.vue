<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import  AppLayout  from '../src/components/layout/AppLayout.vue' 
import Main from '../src/pages/Main.vue'
import { Button } from '@/components/ui/button' 
</script>

<template>
  <AppLayout>
    
    <router-view></router-view>
   
  </AppLayout>
  
</template>

<style scoped>


</style>
