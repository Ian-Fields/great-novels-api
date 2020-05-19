module.exports = {
  up: async (queryInterface, sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.createTable('authors', {
      id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      nameFirst: { type: sequelize.STRING, allowNull: false },
      nameLast: { type: sequelize.STRING, allowNull: false }
    })
    await queryInterface.createTable('novels', {
      id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: sequelize.STRING, allowNull: false },
      authorId: { type: sequelize.INTEGER, references: { model: 'authors', key: 'id' } }
    })
    await queryInterface.createTable('genres', {
      id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      genre: { type: sequelize.STRING, allowNull: false }
    })

    return queryInterface.createTable('novelGenres', {
      novelId: { type: sequelize.INTEGER, references: { model: 'novels', key: 'id' } },
      genreId: { type: sequelize.INTEGER, references: { model: 'genres', key: 'id' } }
    })
  },

  down: async (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('authors')

    await queryInterface.dropTable('novels')

    await queryInterface.dropTable('genres')

    return queryInterface.dropTable('novelGenres')
  }
}
