import Landing from './components/Landing.vue'
import AboutServer from './components/AboutServer.vue'
import Players from './components/Players.vue'
import Player from './components/Player.vue'
import Projects from './components/Projects.vue'
import MerchShop from './components/MerchShop.vue'
import Account from './components/Account.vue'
import PageNotFound from './components/PageNotFound.vue'
import CatalogCategory from './components/CatalogCategory.vue'
import Product from './components/Product.vue'
import { createWebHistory, createRouter} from 'vue-router'
import AllNews from './components/AllNews.vue'
import Cart from './components/Cart.vue'

const router = createRouter({
  routes: [
    {path:'/', component: Landing},
    {path:'/news', component: AllNews},
    {path:'/aboutserver', component: AboutServer},
    {path:'/players', component: Players},
    {path:'/players/:player_id', name: 'Player', component: Player},
    {path:'/projects', component: Projects},
    {path:'/catalog', component: MerchShop},
    {path:'/catalog/:category_id', component: CatalogCategory},
    {path:'/catalog/:category_id/:product_id', name: 'Product', component: Product},
    {path:'/account', component: Account},
    {path: '/:pathMatch(.*)*', component: PageNotFound},
    {path: '/cart', component: Cart}
  ],
  history: createWebHistory(),
  scrollBehavior(_to, _from, _savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
})

router.beforeEach((to, _from, next) => {
  const { matched } = to;
  if (matched.length === 0) {
    next('/');
  } else {
    next();
  }
});

export default router