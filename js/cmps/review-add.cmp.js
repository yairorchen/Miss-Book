import { utilService } from '../services/util-service.js'
import { bookService } from '../services/book-service.js'

export default {
  props: ['book'],
  template: `
    <section>
        
        <form class="review-window" @submit.prevent="addReview">
        <h2>Add Review</h2>
        <input class="input text"
        v-model = "review.fullName"
        type="text"
        placeholder="your full name?"/>

        <select v-model.number = "review.rate" name="rate">
            <option v-for="n in 5">{{n}}</option>    
        </select>

        <input type="date" 
         v-model="review.readAt">

        <textarea cols="30" rows="5" v-model = "review.freeTxt" placeholder="wright your review"></textarea>

        <button>send</button>
        </form>

        <p v-for="review in book.review">
            <div class="review">
                <button class="btn" @click="removeReview(review.id)">x</button>
            <h3>name:{{review.fullName}}</h3>
            <h3>rate:{{review.rate}}</h3>
            <h3>read at:{{review.readAt}}</h3>
            <h3>review:{{review.freeTxt}}</h3>
            </div>
        </p>
    </section>
    
    `,
  data() {
    return {
      review: {
        id: utilService.makeId(),
        fullName: 'Book Reader',
        rate: 3,
        readAt: '',
        freeTxt: '',
      },
    }
  },
  methods: {
    addReview() {
      console.log(this.review)
      if (!this.book.review) {
        this.book.review = []
      }
      this.book.review.push(this.review)

      bookService.save(this.book)
      this.review = {
        id: utilService.makeId(),
        fullName: '',
        rate: '',
        readAt: '',
        freeTxt: '',
      }
      console.log(this.book)
    },
    removeReview(reviewId) {
      const idx = this.book.review.findIndex((review) => review.id === reviewId)
      this.book.review.splice(idx, 1)
      bookService.save(this.book)
    },
  },
}
