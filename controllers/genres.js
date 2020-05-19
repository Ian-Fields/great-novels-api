const models = require('../models')

const getAllGenres = async (request, response) => {
  try {
    const genres = await models.genres.findAll()

    return response.send(genres)
  } catch (error) {
    return response.status(500).send('Unable to find the genres, try again.')
  }
}

const getGenreById = async (request, response) => {
  try {
    const { id } = request.params
    const genreMatch = await models.genres.findOne({
      where: { id },
      include: [{ include: [{ model: models.authors }], model: models.novels }],
    })

    return genreMatch
      ? response.send(genreMatch)
      : response.status(404).send(`Unable to find a genre with a matching id of ${id}`)
  } catch (error) {
    return response.status(500).send('Unable to find the genre, try again')
  }
}

module.exports = { getAllGenres, getGenreById }
