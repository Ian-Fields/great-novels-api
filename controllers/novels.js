const models = require('../models')

const getAllNovels = async (request, response) => {
  try {
    const novels = await models.novels.findAll({
      include: [{ model: models.authors }, { model: models.genres }]
    })

    return response.send(novels)
  } catch (error) {
    return response.status(500).send('Unable to retrieve the novel, try again')
  }
}

const getNovelById = async (request, response) => {
  try {
    const { identifier } = request.params
    const novelMatch = await models.novels.findAll({
      include: [{
        model: models.authors,
      },
      {
        model: models.genres,
      }],
      where: {
        [models.Op.or]: [
          { id: { [models.Op.like]: identifier } },
          { title: { [models.Op.like]: `%${identifier.toLowerCase()}%` } }
        ]
      }
    })

    return novelMatch.length
      ? response.send(novelMatch)
      : response.status(404).send(`Unable to find a novel with a matching: ${identifier}`)
  } catch (error) {
    return response.status(500).send('Unable to retrieve the novel, try again')
  }
}

module.exports = { getAllNovels, getNovelById }
