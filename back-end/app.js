require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require('express') // CommonJS import style!
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors') 
const jsonData = require('./recipes.json')

var chai = require('chai'), chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = express() // instantiate an Express object
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors()) // allow cross-origin resource sharing

app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
const userData= require('./temp_data/user.json'); 
const itemData= require('./temp_data/items.json'); 
const fs = require('fs');
app.post('/save', async (req, res)=>{
    const data = {
        username: req.body.name,
        password: req.body.pass
    }
    let b = 0;
    userData.map(user => {
        if(user.username === data.username && user.password === data.password){
            b = 1;
        }
    });
    if(b === 1){
        res.json(true)
    }
    else{
        res.json(false)
    }
})

app.post('/create/save', async (req, res)=>{
    const data = {
        username: req.body.name,
        password: req.body.pass
    }
    userData.push(data);
    console.log(userData);
    fs.writeFile('./temp_data/user.json', JSON.stringify(userData), function(err) {
        if (err) {
            console.log(err);
        }
    });
    res.json(userData);
})

app.get('/userlist', (req, res)=>{
    const d = itemData;
    console.log(d);
    res.json(d);
})





app.post('/profile/save', async (req, res) => {
  const data = {
    days: req.body.days,
    suggest: req.body.suggest,
    auto: req.body.auto
  }
  console.log(data)
  res.json(data)
})
app.post('/add/save', async (req, res) => {
  const data = {
    inputs: req.body.inputs
  }
  itemData.push(req.body.inputs);
    fs.writeFile('./temp_data/items.json', JSON.stringify(itemData), function(err) {
        if (err) {
            console.log(err);
        }
    });
    console.log(itemData);
  res.json(data)
})
app.post('/edit/save', async (req, res) => {
  const data = {
    inputs: req.body.inputs
  }
  console.log(data)
  res.json(data)
})
// app.post('/recipes', async(req, res) => {
//   const data = {
//     inputs: req.body.inputs
//   }
//   const itemName = inputs.itemName;
//   result = jsonData.filter(
//     function(data){ return data.itemName == itemName }
//   )
//   res.json(result)
// })
app.get('/UserList', function(req, res) {
  // const data = {
  //   inputs: req.body.inputs
  // }
  
  const foodName = req.query.itemName;
  console.log(`itemName: ${foodName}`);
  // console.log(req);
  result = jsonData.filter(
    function(data){ return data.itemName == foodName } 
  )
  // console.log(req);
  res.json(result);
  
});
module.exports = app
