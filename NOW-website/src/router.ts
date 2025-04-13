import Landing from './components/Landing.vue'
import AboutServer from './components/AboutServer.vue'
import Players from './components/Players.vue'
import Projects from './components/Projects.vue'
import MerchShop from './components/MerchShop.vue'
import Account from './components/Account.vue'
import PageNotFound from './components/PageNotFound.vue'
import CatalogCategory from './CatalogCategory.vue'
import { createWebHistory, createRouter} from 'vue-router'

const router = createRouter({
  routes: [
    {path:'/', component: Landing},
    {path:'/aboutserver', component: AboutServer},
    {path:'/players', component: Players},
    {path:'/projects', component: Projects},
    {path:'/shop', component: MerchShop},
    {path:'/catalog/:category', component: CatalogCategory},
    {path:'/account', component: Account},
    {path: '/:pathMatch(.*)*', component: PageNotFound},
  ],
  history: createWebHistory(),
  scrollBehavior(_to, _from, _savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
})

// Обработка переходов по адресу, введенному вручную
router.beforeEach((to, _from, next) => {
  const { matched } = to;
  if (matched.length === 0) {
    next('/');  // Перенаправить на главную страницу, если маршрут не найден
  } else {
    next();
  }
});

export default router