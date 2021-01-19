var dbJSON = require('../Data/db.json');
var path = require('path');
const fs = require('fs');

//function to create note id
function createNoteId() {

    let data = fs.readFileSync(path.resolve('App/Data', 'db.json'), "utf8");

    var allNotes = JSON.parse(data);
    console.log(allNotes);

    let id = +allNotes.idCounter + 1;

    return id;
}

module.exports = function (app) {

    app.get('/api/notes', function (req, res) {
        createNoteId();
        res.json(dbJSON.notes);
    });

    app.post('/api/notes', function (req, res) {
        let id = createNoteId();
        let note = req.body;
        note.id = id;
        
        dbJSON.notes.push(note);
        dbJSON.idCounter = id; 

        fs.writeFileSync(path.resolve('App/Data', 'db.json'), JSON.stringify(dbJSON), "utf8");
    });
}
