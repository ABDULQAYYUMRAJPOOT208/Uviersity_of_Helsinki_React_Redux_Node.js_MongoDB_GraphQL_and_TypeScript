const mongoose = require("mongoose");

const phoneModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("phones", phoneModel);
