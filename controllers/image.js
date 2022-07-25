const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai
const app = new Clarifai.App({
 apiKey: 'd5363dbdde6240b5969f333afdb1061c'
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        console.log(data)
      res.json(data);
    })
    .catch(err => {
        console.log(err)
        res.status(400).json('unable to work with API')
    })
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0].entries);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}