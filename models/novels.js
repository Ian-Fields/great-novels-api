const novels = (connection, sequelize, authors) => {
  return connection.define('novels', {
    id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: sequelize.STRING, allowNull: false },
    authorId: { type: sequelize.INTEGER, references: { model: authors, key: 'id' } },
  }, { defaultScope: { attributes: { exclude: ['deletedAt'] } } }, { paranoid: true })
}

module.exports = novels

