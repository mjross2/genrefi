const express = require('express');
const router = express.Router();
const Folder = require('../models/folder.js');

// get all
router.get('/', async (req, res) => {
    try {
        const folders = await Folder.find();
        res.json(folders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// get folder by NAME
router.get('/name/:name', getFolderByName, (req, res) => {
    res.json(res.folder);
});

// // Endpoint to check if an name already exists
// router.get('/check-name/:name', async (req, res) => {
//     const { name } = req.query;
//     try {
//         const existingFolder = await Folder.findOne({ name: name });
//         if (existingFolder) {
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
    const folder = new Folder({
        name: req.body.name,
        contents: []
    });

    try {
        const newFolder = await folder.save();
        res.status(201).json(newFolder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// update one
router.patch('/:id', getFolder, async (req, res) => {
    Object.assign(res.folder, req.body);
    try {
        const updatedFolder = await res.folder.save();
        res.status(201).json(updatedFolder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// delete one
// TODO: not fully functional: "res.folder.remove is not a function"
router.delete('/:id', getFolder, async (req, res) => {
    try {
        await res.folder.remove();
        res.json({ message: "Deleted folder" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Gets folder by ID
async function getFolder(req, res, next) {
    let folder;
    try {
        folder = await Folder.findById(req.params.id);
        if (folder == null) {
            return res.status(404).json({ message: 'Could not find folder.' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.folder = folder;
    next();
}

async function getFolderByName(req, res, next) {
    let folder;
    try {
        folder = await Folder.findOne({ name: req.params.name });
        if (folder == null) {
            return res.status(404).json({ message: 'Could not find folder.' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.folder = folder;
    next();
};

module.exports = router;