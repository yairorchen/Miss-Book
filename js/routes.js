import bookApp from './views/book-app.cmp.js'
import homePage from './views/home-page.cmp.js'
import aboutPage from './views/about-page.cmp.js'
import bookDetails from './views/book-details.cmp.js'
import bookEditCmp from './views/book-edit.cmp.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: homePage,
    },
    {
      path: '/book',
      component: bookApp,
    },
    {
      path: '/book/:id',
      component: bookDetails,
    },
    {
      path: '/book/edit/:id?',
      component: bookEditCmp,
    },
    {
      path: '/about',
      component: aboutPage,
    },
  ],
}

export const router = createRouter(routerOptions)
