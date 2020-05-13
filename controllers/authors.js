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
    const { id } = request.params

    const author = await models.authors.findOne({
      where: { id },
      include: [{ model: models.novels, include: { model: models.genres } }]
    })

    return author
      ? response.send(author)
      : response.sendStatus(404).send(`Could not find an author with a matching id of ${id}`)
  } catch (error) {
    return response.status(500).send('Unable to retrieve author, try again')
  }
}

module.exports = { getAllAuthors, getAuthorById }
