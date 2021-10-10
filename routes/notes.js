const router = require('express').Router();
const { readFromFile, readAndAppend, deleteFromFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
router.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for submitting a note
router.post('/', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid()
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in posting note');
    }
});

// DELETE Route for a specific note
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    deleteFromFile(id, './db/db.json');

    const response = {
        status: 'success'
    };

    res.json(response);
});


module.exports = router;