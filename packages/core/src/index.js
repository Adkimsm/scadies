const express = require('express')
const home = require("./pages/home")
const app = express()
const port = 3000

app.get('/', home)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})