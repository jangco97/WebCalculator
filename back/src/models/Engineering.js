const { default: mongoose, Schema } = require('mongoose');

const engineeringSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  firstinput: {
    type: Number,
    default: 0
  },
  operator: {
    type: String,
    default: 'cos'
  },

  result: {
    type: Number,
    default: 0
  }

});


const Engineering = mongoose.model('Engineering', engineeringSchema);

module.exports = Engineering;
