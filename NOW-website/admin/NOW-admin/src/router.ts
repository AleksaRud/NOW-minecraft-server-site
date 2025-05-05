import { createWebHistory, createRouter} from 'vue-router'
import PageNotFound from './components/PageNotFound.vue'
import News from './components/News.vue'
const router = createRouter({
  routes: [
    {path:'/', component: News},
    {path: '/news', component: News},
    {path: '/:pathMatch(.*)*', component: PageNotFound},
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