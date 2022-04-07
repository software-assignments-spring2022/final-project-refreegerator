require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require('express') // CommonJS import style!
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors') 

const app = express() // instantiate an Express object
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors()) // allow cross-origin resource sharing

app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

app.post('/save', async (req, res)=>{
    const data = {
        username: req.body.name,
        password: req.body.pass
    }
    res.json(data);
})

app.post('/create/save', async (req, res)=>{
    const data = {
        username: req.body.name,
        password: req.body.pass
    }
    res.json(data);
})

app.get('/userlist', (req, res)=>{
    const data = [
        {category : "Dairy",
            name : "Cheese",
            expdatestr : "3000-05-25"
        },
        {category : "Grain",
                name: "Bread",
                expdatestr : "1031-01-29"
        },
        {category : "Basket",
                name :"Alphabetical",
                expdatestr :"2020-01-01" 
        }
    ]
    res.json(data);
})





app.post('/profile/save', async (req, res) => {
  const data = {
    days: req.body.days,
    suggest: req.body.suggest,
    auto: req.body.auto
  }
  res.json(data)
})
app.post('/add/save', async (req, res) => {
  const data = {
    inputs: req.body.inputs
  }
  res.json(data)
})
app.post('/edit/save', async (req, res) => {
  const data = {
    inputs: req.body.inputs
  }
  console.log(data)
  res.json(data)
})
module.exports = app
