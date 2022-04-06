const express = require("express");
require('dotenv').config({ silent: true });

const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) 
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/save', async (req, res)=>{
    const data = {
        username: req.body.name,
        password: req.body.pass
    }
    res.json(data);
    console.log(data);
    // res.json({loggedin: true, message: 'loggedin'});
})

app.post('/create/save', async (req, res)=>{
    const data = {
        username: req.body.name,
        password: req.body.pass
    }
    res.json(data);
    console.log(data);
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
    console.log(data, 0);
})

module.exports = app







/*
require('./db');
const path = require("path")
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const session = require('express-session');
app.use(session({
    secret: 'refreegerator',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

passport.use(new LocalStrategy(
    User.authenticate()
));

passport.serializeUser(function(user, done) {
    done(null, user.username);
});
  
passport.deserializeUser(function(username, done) {
    User.findOne({username: username}, function (err, user) {
        done(err, user);
    });
});




function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
}
app.use(passport.initialize());
app.use(passport.session());
*/
// passport.authenticate('local',{ failureRedirect: '/login' }, ()=> {console.log('hi')}),