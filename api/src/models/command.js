const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const commandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  script: {
    type: String,
    required: true,
  },
  creator: {
    type: ObjectId,
    ref: 'User',
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
});


mongoose.model('Command', commandSchema);

