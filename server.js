const express = require('express')
const app = express()

// Set things up for development
const env = process.env.NODE_ENV
if (env !== 'production') {
  console.log('running in development mode')
  // Get env variables
  require('dotenv').config()
  console.log('Env variables:')
  console.log(process.env.user)
  console.log(process.env.database)
  console.log(process.env.password)
  console.log(process.env.host)
  console.log(process.env.port)

  // Set to allow CORS
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })
}

const twitterApi = require('./lib/twitter')
const dbApi = require('./lib/database')

var path = require('path')

app.use(express.static(path.join(__dirname, '/dist')))

// TWITTER
app.get('/twitter/:twitterHandle', function (req, res) {
  // Get data back from request
  let callback = function (err, data) {
    if (err) {
      console.error('From app.get/twitter.callback()--')
      console.log(err)
    } else {
      // Add name to list of searched names
      dbApi.addName([twitterHandle], function (err) {
        if (err) {
          console.error('From app.get/twitter.callback()')
          console.log(err)
        } else {
          console.log('successfully added to db')
        }
      })
    }

    // Send results
    if (data) {
      res.send(data)
    } else {
      res.send({ text: 'No user was found' })
    }
  }
  // If a twitterHandle exists
  if (req.params.twitterHandle) {
    // If the twitterHandle contains invalid characters, send back an error
    regexp = new RegExp(/^@?(\w){1,15}$/)
    if (!regexp.test(req.params.twitterHandle))
    var twitterHandle = req.params.twitterHandle.replace(/ /g, '_')
    // Get last 3 tweets from twitterHandle
    twitterApi.queryTwitter(twitterHandle, callback)
  } else {
    console.log('no handle')
    res.send({})
  }
})

// DATABASE
app.get('/db/', function (req, res) {
  dbApi.getNames(function (err, result) {
    if (err) {
      console.error(err)
      res.send('From app.get/db-- There was an error retrieving names from the database.')
    } else {
      res.send(result)
    }
  })
})

app.get('/*', function (req, res) {
  res.redirect(path.join(__dirname, '/dist/index.html'))
})

const port = (env === 'production') ? process.env.PORT || 3000 : 3000
app.listen(port, function () {
  console.log(`Api server now listening on ${port}`)
})
