const Hapi = require('hapi');
const _ = require('lodash');
const routes = require('./routes');
const middleware = require('./middleware');
const Q = require('q');
const config = require('./config');

var self = this;
var boom = require('boom');

this.server = _.noop();

this.init = function() {
    var q = Q.defer();

    self.server = new Hapi.Server();
    self.server.connection({
        port: 3000, 
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['key', 'cache-control', 'x-requested-with', 'Access-Control-Allow-Origin']
            }
        }
    });

    _.forEach(routes.get(), function(route) {
        console.log('Route', route.method, route.path, 'added.');
        self.server.route(route);
    });

    self.server.ext('onRequest', function (request, reply) {
        // Hacky solution to allow all options request
        if (request.method === 'options') return reply.continue();

        // Remove trailing slash
        request.path = request.path.replace(/\/$/, '');

        if (!middleware.get().length) return reply.continue();

        var middlewares = middleware.get();
        for (var i = 0; i < middlewares.length; i += 1) {
            var err = middlewares[i](request, reply);
            if (err) {
                return reply(err);
            }
        }
        return reply.continue();
    });
    
    self.server.start(function(err) {
        if (err) {
            console.error(err);
            q.reject(err);
        } else {
            console.log(`Server running at: ${self.server.info.uri}`);
            q.resolve();
        }
    });

    return q.promise;
}

module.exports = this;