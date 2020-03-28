var middleware = require('./middleware');
var boom = require('boom');
var config = require('./config');
var _ = require('lodash');


this.init = function() {

    middleware.add(function(request, reply) {
        if (!request.headers.key) return boom.unauthorized();
        if (request.headers.key !== config.key) return boom.unauthorized();
        return _.noop();
    });

}

module.exports = this;