import { eventBus } from '../services/event-bus.service.js'

export default {
  template: `
        <section class="about-page">
            <h1>About page</h1>

        </section>
    `,
  methods: {
    // emit() {
    //   eventBus.emit('user-msg', { num: 1234, txt: 'baba' })
    // },
  },
}
