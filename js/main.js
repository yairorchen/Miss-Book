const { createApp } = Vue

import { router } from './routes.js'

import appHeader from './cmps/header.cmp.js'
import appFooter from './cmps/footer.cmp.js'

const options = {
  template: `
        <section>
          <app-header/>
            <router-view/>
        
            <app-footer/>
        </section>
        
    `,
  components: {
    appHeader,
    appFooter,
  },
}

const app = createApp(options)

app.use(router)
app.mount('#app')
