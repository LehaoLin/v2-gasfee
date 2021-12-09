const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')

app.use(express.static(__dirname+'/stat.html'))

// respond with "hello world" when a GET request is made to the homepage
app.post('/data', cors(), function (req, res) {

  var data = JSON.parse(fs.readFileSync('./data.json'))

  res.json({data})
})

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/stat.html')
})


app.listen(3000, function () {
    console.log('app is running at port 3000.')
})