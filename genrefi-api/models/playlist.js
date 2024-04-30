const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  folder: String,
  youTubeId: String
});

module.exports = mongoose.model("Playlist", playlistSchema);