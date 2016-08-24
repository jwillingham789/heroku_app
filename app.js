// Setup
var port = 8000

var fileSystem = require('fs')
var momentDate = require('moment')
var passportAuth = require('passport')
var knexConfig = require('./knexfile.js')
var knexDatabase = require('knex')(knexConfig)
var bookshelfModel = require('bookshelf')(knexDatabase)
var expressWebServer = require('express')
var multerFormInput = require('multer')
var multerFileUpload = multerFormInput({ dest: 'public/images/' })
var app = expressWebServer()
var cors = require('cors')

// Routes
app.get('/api/v1/portfolio', cors(), function(req, res){
  knexDatabase
    .select()
    .from('portfolio')
    .then(function(data){
      res.json(data)
    })
})

app.post('/save', multerFileUpload.single('image'), function (req, res) {
  fileSystem.rename(req.file.path, req.file.destination + '/' + req.file.originalname)
  req.body.image = 'images/' + req.file.originalname
  knexDatabase
    .insert(req.body)
    .into('portfolio')
    .then(function(){
      res.send('Saved')
    })
})

// Start
app.use(expressWebServer.static('public'))
app.listen(process.env.PORT || port, function () {
  console.log('Web server on http://localhost:' + port)
  console.log('Press Ctrl+C to stop.')
})
