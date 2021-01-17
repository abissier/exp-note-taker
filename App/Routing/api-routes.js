var dbJSON = require('../db/db.json');

module.exports = function (app) {

    app.get('/api/notes', function(req, res) {
        rest.json(dbJSON);
    });

    app.post('/api/notes', function(req, res) {
        dbJSON.push(req.body);
    });

    // app.delete('/api/notes/:id', function(req, res) {
     
    // });
}