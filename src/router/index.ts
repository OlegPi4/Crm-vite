import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/pages/Main.vue'
import Customers from '@/pages/Customers.vue'
import Settings from '@/pages/Settings.vue'
import Documents from '@/pages/Documents.vue'
import Products from '@/pages/Products.vue'
import Login from '@/pages/Login.vue'
import Storage from '@/pages/Stocks.vue'
import CustommerEdit from '@/pages/customers/CustommerEdit.vue'
import PersonEdit from '@/pages/pagesettings/edit/person/PersonEdit.vue'
import RekvizitEdit from '@/pages/pagesettings/edit/rekvizit/RekvizitEdit.vue'
import CompanyEdit from '@/pages/pagesettings/edit/company/CompanyEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/products',
      name: 'products',
      component: Products
    },
    {
      path: '/customers',
      name: 'customers',
      component: Customers
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/documents',
      name: 'documents',
      component: Documents
    },
    {
      path: '/storage',
      name: 'storage',
      component: Storage
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/customer/edit/:rid',
      name: '/customer/edit/:rid',
      component: CustommerEdit
    },
    {
      path: '/settings/edit/company/:rid',
      name: '/settings/edit/company/:rid',
      component: CompanyEdit
    },
    {
      path: '/settings/edit/person/:rid',
      name: '/settings/edit/person/:rid',
      component: PersonEdit
    },
    {
      path: '/settings/edit/rekvizit/:rid',
      name: '/settings/edit/rekvizit/:rid',
      component: RekvizitEdit
    },
  ]
})

export default router
