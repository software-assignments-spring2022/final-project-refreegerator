require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require('express') // CommonJS import style!
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors') 

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
app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      success: true,
      user: {
        id: req.user.id,
        username: req.user.username,
      },
      message:
        "Congratulations: you have accessed this route because you have a valid JWT token!",
    })
  }
)
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
    const user = userData[_.findIndex(userData, { username: username1 })]
    if (!user) {
      // no user found with this name... send an error
      res
        //.status(401)
        .json({ success: false, message: `user not found: ${username1}.` })
    }
    else if(data.password==user.password){
      const payload = {id : user.id}
      const token = jwt.sign(payload, jwtOptions.secretOrKey) // create a signed token
    res.json({ success: true, username: user.username, token: token }) // send the token to the client to store
      } else {
        // the password did not match
        res
        //.status(401)
        .json({ success: false, message: "passwords did not match" })
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


module.exports = app
