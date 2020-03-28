var self = this;

this.routes = [];

this.add = function(route) {
    self.routes.push(route);
}

this.get = function() {
    return self.routes;
}

module.exports = this;