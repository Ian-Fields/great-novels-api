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
    const { id } = request.params

    const novel = await models.novels.findOne({
      where: { id },
      include: [{ model: models.authors }, { model: models.genres }]
    })

    return novel
      ? response.send(novel)
      : response.sendStatus(404).send(`Could not find a novel with a matching id of ${id}`)
  } catch (error) {
    return response.status(500).send('Unable to retrieve the novel, try again')
  }
}

module.exports = { getAllNovels, getNovelById }
