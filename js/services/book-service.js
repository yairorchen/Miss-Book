import { utilService } from './util-service.js'
import { storageService } from './async-storage.service.js'

import booksJson from './../../data/books.json' assert { type: 'json' }

console.log(booksJson)
const BOOKS_KEY = 'books'
const booksData = booksJson
_createBooks()
export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
}

function query() {
  console.log('query')
  return storageService.query(BOOKS_KEY)
}

function get(bookId) {
  return storageService.get(BOOKS_KEY, bookId)
}

function remove(bookId) {
  return storageService.remove(BOOKS_KEY, bookId)
}

function save(book) {
  if (book.id) {
    console.log('save')
    return storageService.put(BOOKS_KEY, book)
  } else {
    return storageService.post(BOOKS_KEY, book)
  }
}

function getEmptyBook() {
  return {
    id: '',
    title: '',
    subtitle: 'mi est eros convallis auctor arcu dapibus himenaeos',
    authors: ['Lorem Ipsum'],
    publishedDate: 1999,
    description:
      'placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse',
    pageCount: 713,
    categories: ['Computers', 'Hack'],
    thumbnail: 'http://coding-academy.org/books-photos/20.jpg',
    language: 'en',
    listPrice: {
      amount: 109,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  }
}

function _createBooks() {
  const books = utilService.loadFromStorage(BOOKS_KEY)
  if (!books || !books.length) {
    utilService.saveToStorage(BOOKS_KEY, booksData)
  }
}

const API_BOOK_KEY = 'bookDB'
let gBooksCache = utilService.loadFromStorage(API_BOOK_KEY) || {}

getAPIbooks()

function getAPIbooks(keyword = 'javascript') {
  if (gBooksCache[keyword]) {
    console.log('Getting from cache')
    return Promise.resolve(gBooksCache[keyword])
  }
  const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%20${keyword}`

  return axios
    .get(url)
    .then(({ data }) => {
      const booksApi = data.items.map((results) => ({
        id: results.id,
        title: results.volumeInfo.title,
        authors: results.volumeInfo.authors,
        description: results.volumeInfo.description,
        subtitles: results.volumeInfo.subtitles,
        pageCount: results.volumeInfo.pageCount,
        categories: results.volumeInfo.categories,
        thumbnail: results.volumeInfo.imageLinks.thumbnail,
        language: results.volumeInfo.language,
        language: results.volumeInfo.language,
      }))
      return booksApi
    })
    .then((results) => {
      gBooksCache[keyword] = results
      utilService.saveToStorage(API_BOOK_KEY, gBooksCache)
      return results
    })
}
