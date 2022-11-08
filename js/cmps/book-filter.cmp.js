export default {
  template: `
    <section class="book-filter">
        <input class="input text"
            @input="filter"
            v-model = "filterBy.title"
            type="text"
            placeholder="Search book by title"/>
        <div>
            <input class="min-price input"
                 @input="filter"
                title="min price"
                v-model = "filterBy.minPrice"
                type="range"
                min="0" max="300"/>
        
            <input class="max-price input"
                 @input="filter"
                title="max price"
                v-model = "filterBy.maxPrice"
                type="range"
                 min="0" max="300"/>
        </div>
        
    </section>
    `,
  data() {
    return {
      filterBy: {
        title: '',
        minPrice: 0,
        maxPrice: 300,
      },
    }
  },
  methods: {
    filter() {
      this.$emit('filter', { ...this.filterBy })
    },
  },
}
