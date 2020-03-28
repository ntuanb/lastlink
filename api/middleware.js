var _ = require('lodash');
var self = this;

this.middlewares = [];

this.add = function(middleware) {
    self.middlewares.push(middleware);
}

this.get = function() {
    return self.middlewares;
}

module.exports = this;