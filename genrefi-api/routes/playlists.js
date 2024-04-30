const express = require('express');
const router = express.Router();
const Playlist = require('../models/playlist.js');

// get all
router.get('/', async (req, res) => {
    try {
        const playlists = await Playlist.find();
        res.json(playlists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// get playlist by FOLDER
router.get('/folder/:folder', getPlaylistByFolder, (req, res) => {
    res.json(res.playlist);
});

// // Endpoint to check if an folder already exists
// router.get('/check-folder/:folder', async (req, res) => {
//     const { folder } = req.query;
//     try {
//         const existingPlaylist = await Playlist.findOne({ folder: folder });
//         if (existingPlaylist) {
//             res.json({ exists: true });
//         } else {
//             res.json({ exists: false });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// create one
router.post('/', async (req, res) => {
    const playlist = new Playlist({
        folder: req.body.folder,
        youTubeId: req.body.youTubeId
    });

    try {
        const newPlaylist = await playlist.save();
        res.status(201).json(newPlaylist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// update one by mongo id
router.patch('/:id', getPlaylist, async (req, res) => {
    Object.assign(res.playlist, req.body);
    try {
        const updatedPlaylist = await res.playlist.save();
        res.status(201).json(updatedPlaylist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// update one by folder
router.patch('/folder/:folder', getPlaylistByFolder, async (req, res) => {
    Object.assign(res.playlist, req.body);
    try {
        const updatedPlaylist = await res.playlist.save();
        res.status(201).json(updatedPlaylist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// delete one
// TODO: not fully functional: "res.playlist.remove is not a function"
/*
router.delete('/:id', getPlaylist, async (req, res) => {
    try {
        await res.playlist.remove();
        res.json({ message: "Deleted playlist" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});*/

// Gets playlist by mongo ID
async function getPlaylist(req, res, next) {
    let playlist;
    try {
        playlist = await Playlist.findById(req.params.id);
        if (playlist == null) {
            return res.status(404).json({ message: 'Could not find playlist.' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.playlist = playlist;
    next();
}

async function getPlaylistByFolder(req, res, next) {
    let playlist;
    try {
        playlist = await Playlist.findOne({ folder: req.params.folder });
        if (playlist == null) {
            return res.status(404).json({ message: 'Could not find playlist.' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.playlist = playlist;
    next();
};

module.exports = router;