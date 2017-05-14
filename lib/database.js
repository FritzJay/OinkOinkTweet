var db = require('./db')

module.exports.getNames = function (callback) {
  db.query('SELECT INITCAP (screen_name) from public.searches')
    .then((result) => {
      console.log('From getNames-- ')
      console.log(result.rows)
      let names = result.rows.map(name => { return name.initcap })
      callback(null, names)
    })
    .catch((err) => {
      callback(err, '')
    })
}

module.exports.addName = function (twitterHandle, callback) {
  var upperTwitterHandle = String(twitterHandle).toUpperCase()
  var params = [upperTwitterHandle]
  db.query('SELECT * FROM public.searches WHERE UPPER (screen_name)=$1', params)
    .then((res) => {
      if (res.rows.length === 0) {
        console.log('no one found by that name in the database, time to insert it')
        db.query('INSERT INTO public.searches (id, screen_name) VALUES (DEFAULT, $1)', params)
          .catch((err) => {
            console.error(err)
          })
        return
      } else {
        return 'That name is already saved'
      }
    })
    .catch((err) => {
      console.error(err)
    })
}
