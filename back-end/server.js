#!/usr/bin/env node
const assert = require('chai').assert;
const { expect } = require('chai');
const server = require('./app')
require('dotenv').config({ silent: true }) 


const port = process.env.PORT || 3001

const listener = server.listen(port, function () {
  console.log(`Server running on port: ${port}`)
})

const close = () => {
  listener.close()
}

module.exports = {
  close: close,
}