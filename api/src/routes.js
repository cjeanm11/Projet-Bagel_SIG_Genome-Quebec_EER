const usersController = require('./controllers/users')
const mapController = require('./controllers/map')

module.exports = function (app) {
    app.get('/users', usersController.getUsers);
    app.get('/map', mapController.getMapData);
};

