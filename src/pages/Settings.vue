<script lang="ts" setup>
import TabLider from '@/pages/pagesettings/TabLider.vue'
import TabCompany from '@/pages/pagesettings/TabCompany.vue'
import TabRekvizits from '@/pages/pagesettings/TabRekvizit.vue'



</script>
<template>
   <div class="p-5">
      <h1 class="font-semibold italic text-xl mb-5">Налаштування власної компанії</h1>
      <div class="company name">
         <h2  class="company__title">  Назва та юридична адресса </h2>
         <div class="wrapper">
            <TabCompany>
            </TabCompany>
         </div>
      </div>
      <div class="company chif">
         <h2  class="company__title"> Посадові особи </h2>
         <div class="wrapper">
            <TabLider>
            </TabLider>
         </div>
      </div>
      <div class="company rekvizit">
         <h2  class="company__title">  Банківські реквізити </h2>
         <div class="wrapper">
            <TabRekvizits>
            </TabRekvizits>
         </div>
      </div>
   </div>
</template>

<style lang="sass" scoped>
.company
   border: 2px solid #aaa
   border-radius: 10px 
   margin-bottom: 10px

.company__title
   margin-left: 40px
   padding: 6px 2px 0px
   font-size: 18px
   font-weight: 600
</style>