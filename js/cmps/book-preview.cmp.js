export default {
  props: ['book'],
  template: `
        <section class="preview-content"> 
                <h3>{{book.title}}</h3>
                <!-- <p>{{formatNum}}</p> -->
                <p>{{book.listPrice.amount}} {{book.listPrice.currencyCode}}</p>
                <img :src="book.thumbnail" alt="">
        </section>
    `,
  computed: {
    formatNum() {
      const {
        language,
        listPrice: { amount, currencyCode },
      } = this.book
      return new Intl.NumberFormat(language, {
        style: 'currency',
        currencyCode,
      }).format(amount)
    },
  },
}
