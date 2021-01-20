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
        const data = JSON.parse(fs.readFileSync(path.resolve('App/Data', 'db.json'), "utf8"));
        res.json(data.notes);
    });

    app.post('/api/notes', function (req, res) {
        const id = createNoteId();
        let note = req.body;
        note.id = id;

        const data = JSON.parse(fs.readFileSync(path.resolve('App/Data', 'db.json'), "utf8"));

        data.notes.push(note);
        data.idCounter = id;

        fs.writeFileSync(path.resolve('App/Data', 'db.json'), JSON.stringify(data), "utf8");

        res.json(data)
    });

    app.delete('/api/notes/:id', function (req, res) {

        let data = fs.readFileSync(path.resolve('App/Data', 'db.json'), "utf8");

        var parsedData = JSON.parse(data);

        var allNotes = parsedData.notes;

        var chosenNote = req.params.id;

        var newArray = allNotes.filter(note => {
            return note.id !== +chosenNote;
        });

        parsedData.notes = newArray;

        fs.writeFileSync(path.resolve('App/Data', 'db.json'), JSON.stringify(parsedData), "utf8", function (err) {
            if (err) return console.log(err);
            res.json(fs.readFileSync(path.resolve('App/Data', 'db.json'), "utf8"));
        });

        res.json(parsedData)

    })
}
