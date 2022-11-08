import bookPreview from './book-preview.cmp.js'

export default {
  props: ['books'],
  template: `
    <section>
        <ul class="books-list">
         
            <li class="book-preview" v-for="book in books":key="book.id">
               <!-- <button @click.stop="remove(book.id)">x</button> -->
                <router-link :to="'/book/' + book.id">Details</router-link> |
                
                <book-preview :book="book" />
            </li>
        </ul>

    
    </section>
`,
  methods: {
    showDetails(book) {
      this.$emit('selected', book)
    },
    remove(bookId) {
      this.$emit('remove', bookId)
    },
  },
  components: {
    bookPreview,
  },
}
