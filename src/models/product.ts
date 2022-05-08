import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  },
  contain_articles: [{ amount_of: {
    type: Number, 
    default: 0
  }, article: {type:mongoose.Schema.Types.ObjectId, ref:'Inventory'} }]
})

const Product = mongoose.model('Product', productSchema)


export { Product }
