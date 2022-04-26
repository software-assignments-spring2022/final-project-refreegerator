const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    expdatestr: {
        type: String,
        required: true,
      },
  },
  {
    timestamps: true,
  }
)

// create mongoose Model
const Item = mongoose.model('Item', itemSchema)

// export the model so other modules can import it
module.exports = {
  Item,
}