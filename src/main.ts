import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'
import {
   QueryClient,
   VueQueryPlugin,
   hydrate,
   dehydrate,
 } from '@tanstack/vue-query'
//import viteSSR from 'vite-ssr'

const app = createApp(App)

// export default viteSSR(App, { routes: [] }, ({ app, initialState }) => {
//    const queryClient = new QueryClient()
 
//    if (import.meta.env.SSR) {
//      initialState.vueQueryState = { toJSON: () => dehydrate(queryClient) }
//    } else {
//      hydrate(queryClient, initialState.vueQueryState)
//    }
//    app.use(VueQueryPlugin, { queryClient })
//  })

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)

app.mount('#app')
