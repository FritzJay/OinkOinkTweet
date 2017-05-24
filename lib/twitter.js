var OAuth = require('oauth-1.0a')
var crypto = require('crypto')
var Request = require('request')

module.exports.queryTwitter = function (twitterHandle, callback) {
  var oauth = OAuth({
    consumer: {
      key: process.env.consumerKey,
      secret: process.env.consumerSecret
    },
    signature_method: 'HMAC-SHA1',
    hash_function: function (base_string, key) {
      return crypto.createHmac('sha1', key).update(base_string).digest('base64')
    }
  })

  var token = {
    key: process.env.accessToken,
    secret: process.env.accessSecret
  }

  var request = {
    url: `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${twitterHandle}&count=5`,
    method: 'GET'
  }

  Request({
    url: request.url,
    method: request.method,
    qs: oauth.authorize(request, token),
    json: true
  }, function (err, res, body) {
    if (err) {
      callback(err, null)
      return
    }

    if (body.error) {
      console.log(body.error)
      callback('Not Found', `[{ "id": "0", "text": "Sorry, but there is no twitter user with that screen name." }]`)
      return
    } else if (body.errors) {
      console.log(body.errors)
      callback('Not Found', `[{ "id": "0", "text": "Sorry, but there is no twitter user with that screen name." }]`)
      return
    }
    // Create empty tweets string
    let tweets = ''
    for (var i = 0; i < body.length; i++) {
      let pigText = translate(body[i].text.split(' '))
      // Add tweet to soon to be json string
      tweets += (`{ "id": "${i}", "text": "${pigText}" }`)
      if (i === body.length - 1) { break }
      tweets += ','
    }
    // Add all tweets to an array
    tweets = `[${tweets}]`
    // Send data through callback
    callback(null, tweets)

    // Translate to pig latin
    function translate (strArray) {
      let pigLatin = ''
      strArray.forEach(word => {
        var tag = ''
        var pos = word.search(/[aeiou]/i)
        if (pos === 0) { // First letter is a vowel.
          tag = 'way'
          pigLatin += word + tag + ' '
        } else if (pos > 0) { // Some letter (not the first) is a vowel.
          tag = word.slice(0, pos) // The string before the first vowel.
          pigLatin += word.slice(pos) + tag + 'ay' + ' '
        }
      })
      if (pigLatin.match(/[^_\W]+/g)) {
        return pigLatin.match(/[^_\W]+/g).join(' ')
      } else {
        return pigLatin
      }
    }
  })
}
