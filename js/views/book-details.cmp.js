import { bookService } from '../services/book-service.js'
import reviewAdd from '../cmps/review-add.cmp.js'

export default {
  template: `
  <div class="book-details-container">
    <section  v-if="book"  class="book-details">
      <router-link to="/book">Back</router-link>

      <h1>{{book.title}}</h1>
      <h4 v-for="author in book.authors">by:{{author}}</h4>
      <h4>{{publishDate}} </h4>
      <h4>categories:</h4>
      <p v-for="category in book.categories">{{category}}</p>
      <p>
        <h4>description </h4>
        {{book.description}}
      </p>
      <img class="sale" v-if="book.listPrice.isOnSale" src="../../img/sale.png" alt="">
      <h4 v-bind:class="priceClass">
        {{book.listPrice.amount}} {{book.listPrice.currencyCode}}
      </h4>
      <h4>{{pageCount}}</h4>
      <img :src="book.thumbnail" alt="">
      <button @click="addReview">Add review</button>
    </section>
    <h3 v-else>Loading...</h3>

    <review-add v-if="isReview" :book="book"/>
    
    </div>
    `,
  created() {
    const id = this.$route.params.id
    bookService.get(id).then((book) => (this.book = book))
  },
  data() {
    return {
      book: null,
      isReview: false,
      // isReadMore: false,
    }
  },
  methods: {
    addReview() {
      this.isReview = !this.isReview
    },
  },
  computed: {
    imgUrl() {
      return `../../img/1.jpg`
    },
    pageCount() {
      if (this.book.pageCount >= 500) return 'Long reading'
      if (this.book.pageCount >= 200) return 'Decent Reading'
      return 'Light Reading'
    },

    publishDate() {
      if (new Date().getFullYear() - this.book.publishedDate >= 10)
        return 'Veteran Book'
      if (new Date().getFullYear() - this.book.publishedDate <= 1) return 'New!'
    },
    priceClass() {
      if (this.book.listPrice.amount >= 100) return 'red'
      else return 'green'
    },
    description() {
      if (this.isReadMore) {
        return this.book.description
      }
    },
  },
  components: {
    reviewAdd,
  },
}
