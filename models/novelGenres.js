const novelGenres = (connection, sequelize, genres, novels) => {
  return connection.define('novelGenres', {
    novelId: { type: sequelize.INTEGER, references: { model: novels, key: 'id' } },
    genreId: { type: sequelize.INTEGER, references: { model: genres, key: 'id' } },
  }, { defaultScope: { attributes: { exclude: ['deletedAt'] } } }, { paranoid: true })
}

module.exports = novelGenres
