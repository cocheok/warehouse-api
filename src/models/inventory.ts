import mongoose from 'mongoose'


const inventorySchema = new mongoose.Schema({
  art_id: {
    type: Number,
    unique : true,
    index: true,
    required: true
  },
  name: {
    type: String, 
    required: true
  },
  stock: {
    type: Number, 
    required: true
  }
})

const Inventory = mongoose.model('Inventory', inventorySchema)


export { Inventory }
