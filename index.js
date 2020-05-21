const express = require('express')
const { getAllAuthors, getAuthorById } = require('./controllers/authors')
const { getAllNovels, getNovelById } = require('./controllers/novels')
const { getAllGenres, getGenreById } = require('./controllers/genres')
const app = express()

app.get('/authors', getAllAuthors)

app.get('/authors/:identifier', getAuthorById)

app.get('/genres', getAllGenres)

app.get('/genres/:id', getGenreById)

app.get('/novels', getAllNovels)

app.get('/novels/:identifier', getNovelById)

app.all('*', (request, response) => {
  return response.status(404).send('No book for you.')
})

app.listen(1337, () => {
  console.log('Listening on port 1337...') // eslint-disable-line no-console
})
