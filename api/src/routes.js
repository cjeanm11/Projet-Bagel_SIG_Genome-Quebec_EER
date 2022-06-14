const usersController = require('./controllers/users.controller')
const mapController = require('./controllers/map.controller')

module.exports = function (app) {
    // get
    app.get('/users', usersController.getUsers);
    app.get('/users/:id', usersController.getUser);
    app.get('/users/students', usersController.getStudents);
    app.get('/users/students/pending', usersController.getPendingStudents);
    app.get('/users/teachers', usersController.getTeachers);
    app.get('/users/teachers/pending', usersController.getPendingTeachers);
    app.get('/users/admins', usersController.getAdmins);
    app.get('/map', mapController.getMap);
    app.get('/map/markers', mapController.getMarkers);
    // post
    app.post('/map/markers', mapController.postMarkers);
    app.post('/users', usersController.postUsers);
    // put
    app.put('/users/:id', usersController.putUser);
    app.put('/users', usersController.putUsers);
    app.put('/map/markers/:id', mapController.putMarkers);
};

