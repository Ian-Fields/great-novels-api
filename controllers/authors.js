const models = require('../models')

const getAllAuthors = async (request, response) => {
  try {
    const authors = await models.authors.findAll()

    return response.send(authors)
  } catch (error) {
    return response.status(500).send('Unable to retrieve authors, try again')
  }
}

const getAuthorById = async (request, response) => {
  try {
    const { identifier } = request.params
    const authorMatch = await models.authors.findAll({
      include: [{
        include: [{ model: models.genres }],
        model: models.novels
      }],
      where: {
        [models.Op.or]: [
          { id: { [models.Op.like]: identifier } },
          { nameLast: { [models.Op.like]: `%${identifier.toLowerCase()}%` } }
        ]
      }
    })

    return authorMatch.length
      ? response.send(authorMatch)
      : response.status(404).send(`Unable to find an author matching: ${identifier}`)
  } catch (error) {
    return response.status(500).send('Unable to retrieve author, try again')
  }
}

module.exports = { getAllAuthors, getAuthorById }
