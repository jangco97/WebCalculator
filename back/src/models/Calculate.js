const { default: mongoose, Schema } = require('mongoose');

const calculateSchema = mongoose.Schema({
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
    default: '+'
  },
  secondinput: {
    type: Number,
    default: 0
  },
  result: {
    type: Number,
    default: 0
  }

});


const Calculate = mongoose.model('Calculate', calculateSchema);

module.exports = Calculate;
