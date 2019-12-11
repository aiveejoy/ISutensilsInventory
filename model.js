const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

//Define a schema
var Schema = mongoose.Schema;

var Shop = new Schema({
  item: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  inevQ: {
    type: Number,
    default: null
  },
  lacking: {
    type:Number,
    default: null
  },
  dateDeleted: {
    type:String,
    default: null
  }
});

// Compile model from schema
module.exports = mongoose.model('Item', Shop);