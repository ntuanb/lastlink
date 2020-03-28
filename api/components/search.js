var mongoose = require('mongoose');
var _ = require('lodash');
var routes = require('../routes');
var boom = require('boom');
var Q = require('q');
var self = this;

var searchSchema = mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: true
    },
    device: {},
    lucky: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

var Search = mongoose.model('Search', searchSchema);

this.makeUrl = function(text, lucky) {
    var url = 'http://www.google.com/search?q=';
    if (text) url += text;
    if (lucky) url += '&btnI';
    return url;
}

this.makeSearchResponse = function(search) {
    var o = {
        _id: search._id,
        __v: search.__v,
        url: self.makeUrl(search.text, search.lucky),
        safe: self.makeUrl(search.text, false),
        createdAt: search.createdAt,
        updatedAt: search.updatedAt,
        lucky: search.lucky,
        text: search.text
    }
    return o;
}

this.find = function(id) {
    var q = Q.defer();
    Search.find({_id: id}, function(err, searches) {
        if (err) { 
            q.reject(err);
        } else if (searches.length === 0) {
            q.resolve(_.noop());
        } else if (searches.length === 1) {
            q.resolve(self.makeSearchResponse(searches[0]));
        }
    });

    return q.promise;
}

this.create = function(text, lucky, device) {
    var q = Q.defer();
    var search = new Search({
        text: text
    });

    if (lucky) search.lucky = lucky;
    if (device) search.device = device;

    search.save(function(err) {
        if (err) q.reject(_.noop());
        else q.resolve(search);
    });
    
    return q.promise;
}

this.get = function() {
    var q = Q.defer();

    Search.find({}).sort('-createdAt').limit(10).exec(function(err, searches) {
        if (err) {
            q.reject(err);
        } else {
            var list = [];
            _.forEach(searches, function(search) {
                list.push(self.makeSearchResponse(search));
            });
            q.resolve(list);
        }
    });

    return q.promise;
}

this.getSecondLatest = function() {
    var q = Q.defer();

    Search.find()
        .sort({
            createdAt: -1
        })
        .limit(5)
        .exec(function(err, search) {
            if (search.length) {
                q.resolve(search[1]);
            } else {
                q.reject(err);
            }
        })
        .catch(function(err) {
            q.reject(err);
        });

    return q.promise;
}

this.addRoutes = function() {
    routes.add({
        method: 'GET',
        path: '/search/{id}',
        handler: function (request, reply) {
            var id = _.noop();

            if (!_.has(request, 'params.id')) return reply(boom.notFound());
            if (_.has(request, 'params.id')) id = request.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)) return reply(boom.badRequest())

            self.find(id)
                .then(function(search) {
                    if (!search) return reply(boom.notFound());
                    return reply(search);
                })
                .catch(function(err) {
                    if (err.name)
                    return reply(boom.badImplementation());
                })
        }
    });

    routes.add({
        method: 'GET',
        path: '/search',
        handler: function (request, reply) {
            self.get()
                .then(function(searches) {
                    return reply(searches);
                })
                .catch(function(err) {
                    return reply(boom.badImplementation());
                })
        }
    });
    
    routes.add({
        method: 'POST',
        path: '/search',
        handler: function (request, reply) {
            var text = _.noop();
            var device = _.noop();
            var lucky = _.noop();

            if (
                !_.has(request, 'payload.text') ||
                request.payload.text.length === 0
            ) {
                return reply(boom.badRequest('Invalid form'));
            }

            if (_.has(request, 'payload.text')) text = request.payload.text;
            if (_.has(request, 'payload.lucky')) lucky = request.payload.lucky;
            if (_.has(request, 'payload.device')) device = request.payload.device;

            self.create(text, lucky, device)
                .then(function(res) {
                    if (res) return self.getSecondLatest();
                })
                .then(function(search) {
                    return reply(self.makeSearchResponse(search));
                })
                .catch(function(err) {
                    return reply(boom.badImplementation());
                });
            
        }
    });

}

this.init = function() {
    self.addRoutes();
}

module.exports = this;