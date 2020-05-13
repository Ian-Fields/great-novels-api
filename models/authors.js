const authors = (connection, sequelize) => {
  return connection.define('authors', {
    id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    nameFirst: { type: sequelize.STRING, allowNull: false },
    nameLast: { type: sequelize.STRING, allowNull: false },
  }, { defaultScope: { attributes: { exclude: ['deletedAt'] } } }, { paranoid: true })
}

module.exports = authors
