import Landing from './components/Landing.vue'
import AboutServer from './components/AboutServer.vue'
import Players from './components/Players.vue'
import Projects from './components/Projects.vue'
import MerchShop from './components/MerchShop.vue'
import Account from './components/Account.vue'
import PageNotFound from './components/PageNotFound.vue'

import { createWebHistory, createRouter } from 'vue-router'

const router = createRouter({
  routes: [
    {path:'/', component: Landing},
    {path:'/aboutserver', component: AboutServer},
    {path:'/players', component: Players},
    {path:'/projects', component: Projects},
    {path:'/shop', component: MerchShop},
    {path:'/account', component: Account},
    {path: '/:pathMatch(.*)*', component: PageNotFound},
  ],
  history: createWebHistory(),
  
})

export default router