require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require('express') // CommonJS import style!
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors') 
const mongoose = require('mongoose')
const jsonData = require('./recipes.json')
const bcrypt = require('bcryptjs');

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
const _ = require("lodash") // the lodash module has some convenience functions for arrays that we use to sift through our mock user data... you don't need this if using a real database with user info
const jwt = require("jsonwebtoken")
const passport = require("passport")
app.use(passport.initialize())

const { jwtOptions, jwtStrategy } = require("./jwt-config.js") // import setup options for using JWT in passport
passport.use(jwtStrategy)

mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then(data => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

const {User} = require('./models/User')

app.post('/save', async (req, res)=>{
    const data = {
        username: req.body.name,
        password: req.body.pass
    }
    if (!data.username || !data.password){
      res
        .status(401)
        .json({ success: false, message: `no username or password supplied.` })
    }
    const username1 = data.username
    /*
    const user = User.find({ username: username1 })*/
    const retrieve = async() => {
      const user = await User.findOne({username: username1})
      //console.log(user)
      if (!user) {
        res
          //.status(401)
          .json({ success: false, message: `user not found: ${username1}.` })
      }
      else if (user){
        bcrypt.compare(data.password, user.password, (err, passwordMatch)=>{
          console.log(user.password)
          if (err){
            console.log(err)
          }
          else if(passwordMatch){
            const payload = {id : user.id}
            const token = jwt.sign(payload, jwtOptions.secretOrKey) // create a signed token
            res.json({ success: true, username: user.username, token: token }) // send the token to the client to store
          }
        })
      }
      else {
        // the password did not match
        res
        //.status(401)
        .json({ success: false, message: "passwords did not match" })
      }
    }
    retrieve();

})

app.post('/create/save', async (req, res)=>{
    const data = {
        username: req.body.name,
        password: req.body.pass,
    }
    try{
      const user= await User.findOne({username: data.username})
      console.log(user)
      if (user){
        return res.status(401).json({
          success: false,
          message: 'username already exists'
        })
      }
      let token;
      bcrypt.hash(data.password, 10, function(err,hash){
        if (err){
          console.log(err);
        }
        else{
          const newUser = User.create({
            username: data.username,
            password: hash,
            preferences: {
              notification: "0",
              suggest: true,
              auto: true
            }
          })
          const payload = {id : newUser.id}
          token = jwt.sign(payload, jwtOptions.secretOrKey)
          return res.json({
            success: true,
            username: data.username,
            token: token
          })
        }
      })
    
    }
    catch(err){
      console.error(err)
    }
})

app.get('/userlist', passport.authenticate("jwt", { session: false }), async (req, res)=>{
    const d = itemData;
    console.log(d);
    res.json({
      d_: d,
      success: true});
})

app.get('/profileform', async(req,res)=>{
    const username = req.query.username;
    console.log(username);
    const retrieve = async() => {
      const user = await User.findOne({username: username})
      console.log(user)
      console.log(user.preferences)
      res.json({
        preferences: user.preferences
      })
    }
    retrieve();

})


app.post('/profile/save', async (req, res) => {
  const data = {
    days: req.body.days,
    suggest: req.body.suggest,
    zipcode: req.body.zipcode,
    auto: req.body.auto,
    username: req.body.username
  }
  const update = {
    $set: {
      preferences: {
        notification: data.days,
        suggest: data.suggest,
        zipcode: data.zipcode,
        auto: data.auto
      }
    },
  }
  await User.updateOne({username: req.body.username}, update)
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
    //console.log(itemData);
  res.json(data)
})
app.post('/edit/save', async (req, res) => {
  const data = {
    inputs: req.body.inputs
  }
  //console.log(data)
  res.json(data)
})

app.get("/logout", function (req, res) {
  res.json({
    success: true,
    message:
      "logged out",
  })
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
app.get('/UserList/rec', function(req, res) {
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
  console.log("Greg!");
  res.json(result);
  
});
module.exports = app
