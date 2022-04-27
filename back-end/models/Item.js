const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema(
  {
    expdatestr: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    }
  }
)

// create mongoose Model
const Item = mongoose.model('Item', itemSchema)

// export the model so other modules can import it
module.exports = {
  Item,
}