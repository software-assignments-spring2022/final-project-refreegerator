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

module.exports = app


