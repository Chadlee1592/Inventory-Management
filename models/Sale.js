const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SaleSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  purchaseDate: {
    type: Date
  },
  soldDate: {
    type: Date
  },
  oppName: {
    type: String
  },
  cost: {
    type: Number
  },
  price: {
    type: Number
  },
  margin: {
    type: Number
  },
  marginPercent: {
    type: Number
  },
  status: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String
  }
});

module.exports = Sale = mongoose.model('sale', SaleSchema);
