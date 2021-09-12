const express = require('express')
const app = express()
const port = 7000
const createMR = require('./createmr.js')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/mr', createMR.createMR)
app.listen(port, () => {
  console.log(`Lit is listening at http://localhost:${port}`)
})