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
      nameLast: { type: sequelize.STRING, allowNull: false },
      createdAt: { type: sequelize.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: sequelize.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deletedAt: { type: sequelize.DATE },
    })
    await queryInterface.createTable('novels', {
      id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: sequelize.STRING, allowNull: false },
      authorId: { type: sequelize.INTEGER, references: { model: 'authors', key: 'id' } },
      createdAt: { type: sequelize.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: sequelize.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deletedAt: { type: sequelize.DATE },
    })
    await queryInterface.createTable('genres', {
      id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: sequelize.STRING, allowNull: false },
      createdAt: { type: sequelize.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: sequelize.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deletedAt: { type: sequelize.DATE },
    })

    return queryInterface.createTable('novelGenres', {
      novelId: { type: sequelize.INTEGER, references: { model: 'novels', key: 'id' } },
      genreId: { type: sequelize.INTEGER, references: { model: 'genres', key: 'id' } },
      createdAt: { type: sequelize.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: sequelize.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deletedAt: { type: sequelize.DATE },
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
