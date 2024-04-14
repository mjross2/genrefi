const mongoose = require("mongoose");

const fanSchema = new mongoose.Schema({
  name: String,
  contents: []
});

module.exports = mongoose.model("Folder", fanSchema);