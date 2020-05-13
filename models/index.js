const sequelize = require('sequelize')
const authorsModel = require('./authors')
const novelsModel = require('./novels')
const genresModel = require('./genres')
const booktypesModel = require('./booktypes')

const connection = new sequelize('novels', 'Alexandre', 'DUM@s!', {
  host: 'localhost', dialect: 'mysql'
})

const authors = authorsModel(connection, sequelize)
const novels = novelsModel(connection, sequelize, authors)
const genres = genresModel(connection, sequelize)
const booktypes = booktypesModel(connection, sequelize, genres, novels)

novels.belongsTo(authors)
authors.hasMany(novels)

novels.belongsToMany(genres, { through: booktypes })
genres.belongsToMany(novels, { through: booktypes })

module.exports = { authors, novels, genres, booktypes }
