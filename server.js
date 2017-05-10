const express = require('express')
const app = express()

var path = require('path')

// Enable CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Controle-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(express.static(path.join(__dirname, '/dist')))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
})

app.listen(process.env.PORT || 8080)
