const genres = (connection, sequelize) => {
  return connection.define('genres', {
    id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    genre: { type: sequelize.STRING, allowNull: false },
  }, { defaultScope: { attributes: { exclude: ['deletedAt'] } } }, { paranoid: true })
}

module.exports = genres

