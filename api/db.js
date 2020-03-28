var mongoose = require('mongoose');
var Q = require('q');
var self = this;

this.connection = null;

this.init = function() {
    var q = Q.defer();
    mongoose.connect('mongodb://localhost/lastLink');
    mongoose.Promise = global.Promise;
    self.connection = mongoose.connection;

    self.connection.on('error', function(err) {
        console.log(err);
        console.log('Error.');
        q.reject(err);
    });

    self.connection.once('open', function() {
        console.log('DB connected.');
        q.resolve();
    });

    return q.promise;
}

module.exports = this;