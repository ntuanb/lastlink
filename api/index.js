const db            = require('./db');
const server        = require('./server');
const auth        = require('./auth');
const search          = require('./components/search');

auth.init();
search.init();

db.init()
    .then(function() {
        return server.init();
    })
    .then(function() {
        
    })
    .catch(function(err) {
        console.error(err);
    });