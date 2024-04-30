// imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
import { DATABASE_URL } from '../config';

// server app setup
const app = express();
const PORT = process.env.PORT || 5000; // Main app usually runs on 3000

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI|| DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
const foldersRouter = require("./routes/folders");
app.use('/folders', foldersRouter);
const playlistsRouter = require("./routes/playlists");
app.use('/playlists', playlistsRouter);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));