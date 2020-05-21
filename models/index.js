const sequelize = require('sequelize')
const authorsModel = require('./authors')
const novelsModel = require('./novels')
const genresModel = require('./genres')
const novelGenresModel = require('./novelGenres')

const connection = new sequelize('novels', 'Alexandre', 'DUM@s!', {
  host: 'localhost', dialect: 'mysql'
})

const authors = authorsModel(connection, sequelize)
const novels = novelsModel(connection, sequelize, authors)
const genres = genresModel(connection, sequelize)
const novelGenres = novelGenresModel(connection, sequelize, genres, novels)

novels.belongsTo(authors)
authors.hasMany(novels)

novels.belongsToMany(genres, { through: novelGenres })
genres.belongsToMany(novels, { through: novelGenres })

module.exports = {
  authors, novels, genres, novelGenres, Op: sequelize.Op
}
