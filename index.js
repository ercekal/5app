const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser')
const express = require('express')
const app = new express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/', (req, res) => {
  const list = req.body.payload.filter(o => o.count > 0)
  const response = list.map(i => {
    let thumbnail
    i.logos.map(l => {
      if (l.size !== '16x16' && l.size !== '128x128') {
        thumbnail = l.url
      }
    })
    return { name: i.name, count: i.count, thumbnail}
  })
  res.send({response})
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})