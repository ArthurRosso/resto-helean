const express = require('express')
const app = express()
const port = 8084

const fs = require('fs')

app.get('/api/', (req, res) => {
    fs.readFile('./data/db.json', (err, json) => {
        let obj = JSON.parse(json)
        res.json(obj)
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})