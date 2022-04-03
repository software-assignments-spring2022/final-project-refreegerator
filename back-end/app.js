const express = require("express") 
const app = express()
const bodyParser = require("body-parser")

app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

/*
app.post('/Profile',(req, res) => {
  const data = {
    days: req.body.days,
    suggest: req.body.suggest,
    auto:req.body.auto
  }
  console.log(data)
  res.json(data)
})*/
app.post('/Add', (req, res)=>{
  const data = {
    name: req.body.name,
    quantity: req.body.quantity,
    category: req.body.category,
    info: req.body.info,
    ex_date:req.body.ex_date,
    enableAlerts: req.body.enableAlerts,
    notif: req.body.notif
  }
  console.log(data)
  res.json(data)
})
module.exports = app

