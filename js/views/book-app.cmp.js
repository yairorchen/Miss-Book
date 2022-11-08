import { bookService } from '../services/book-service.js'

import bookFilter from '../cmps/book-filter.cmp.js'
import bookList from '../cmps/book-list.cmp.js'

export default {
  template: `
  <section>
    <book-filter @filter="filter"/>
    
    <book-list
    v-if="books"
     @selected="selectBook"
     
     :books="booksToShow"/>

     <book-details 
    @close="selectedBook = null"
    v-if="selectedBook" 
    :book="selectedBook"/>
    </section>
    `,
  created() {
    bookService.query().then((books) => {
      this.books = books
    })
  },
  data() {
    return {
      books: null,
      // selectedBook: null,
      filterBy: {},
    }
  },
  methods: {
    // selectBook(book) {
    //   this.selectedBook = book
    //   console.log(book)
    // },
    filter(filterBy) {
      this.filterBy = filterBy
    },
    removeBook(bookId) {
      bookService.remove(bookId).then(() => {
        const idx = this.books.findIndex((book) => book.id === bookId)
        this.books.splice(idx, 1)

        // const msg = {
        //   txt: `Book ${bookId} deleted...`,
        //   type: 'success',
        // }
        // eventBus.emit('user-msg', msg)
      })
    },
  },
  computed: {
    booksToShow() {
      const regex = new RegExp(this.filterBy.title, 'i')
      if (!this.filterBy.maxPrice && !this.filterBy.minPrice) {
        return this.books.filter(({ title, listPrice: { amount } }) =>
          regex.test(title)
        )
      }
      return this.books.filter(
        ({ title, listPrice: { amount } }) =>
          regex.test(title) &&
          this.filterBy.maxPrice >= amount &&
          this.filterBy.minPrice <= amount
      )
    },
  },

  components: {
    bookList,
    bookFilter,
  },
}
