require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env
const passportJWT = require("passport-jwt")
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy
const _ = require("lodash") // the lodash module has some convenience functions for arrays that we use to sift through our mock user data... you don't need this if using a real database with user info
const mongoose = require('mongoose')

// set up some JWT authentication options
let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt") // look for the Authorization request header
jwtOptions.secretOrKey = process.env.JWT_SECRET // an arbitrary string used during encryption - see the .env file
// console.log(jwtOptions) // debug to make sure the secret from the .env file is loaded correctly
// passport can work with many authentication systems... here we are setting some middleware code for using JWT that we'll pass to passport to use
mongoose
.connect(`${process.env.DB_CONNECTION_STRING}`)
.then(data => console.log(`Connected to MongoDB`))
.catch(err => console.error(`Failed to connect to MongoDB: ${err}`))
const jwtStrategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  // console.log("JWT payload received", jwt_payload) // debugging

  const {User} = require('./models/User')

 const retrieve = async() => {
  const user = await User.findById(jwt_payload.id)
  if (user) {
    // we found the user... keep going
    next(null, user)
  } else {
    // we didn't find the user... fail!
    next(null, false)
  }
}
retrieve();
  
})

module.exports = {
  jwtOptions,
  jwtStrategy,
}