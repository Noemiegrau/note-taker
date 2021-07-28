const router = require('express').Router();
const notes = require('../db/notes.js');
// The following API routes should be created:

// GET /api/notes should read the db.json file and return all saved notes as JSON.
router.get('/notes', (req, res) => {
    notes.getNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(400).json(err));
});
 
// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
router.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    notes.addNotes(req.body)
    .then(notes => res.json(notes))
    .catch(err => res.status(400).send('No new notes.').json(err));
});

router.delete("/notes/:id", function(req, res){
    notes.removeNote(req.params.id)
    .then(() => res.json({ok: true}))
    .catch(err => res.status(400).json(err));
});

module.exports = router;