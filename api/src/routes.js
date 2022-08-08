const usersController = require('./controllers/users.controller')
const mapController = require('./controllers/map.controller')

module.exports = function (app) {
  // get
  app.get('/users', usersController.getUsers);
  app.get('/users/:id', usersController.getUser);
  app.get('/users/students', usersController.getStudents);
  // app.get('/users/students/pending', usersController.getPendingStudents);
  app.get('/users/teachers', usersController.getTeachers);
  // app.get('/users/teachers/pending', usersController.getPendingTeachers);
  app.get('/users/admins', usersController.getAdmins);
  // app.get('/map', mapController.getMap);
  app.get('/map/markers', mapController.getMarkers);
  
  // post
  app.post('/map/markers', mapController.addMarker);
  app.post('/users/signup', usersController.signUpUser);
  app.post('/users/signin', usersController.signInUser);
  
  // put
  app.put('/users/:id', usersController.updateUser);
  app.put('/map/markers/:id', mapController.updateMarker);
  
  // delete
  app.delete('/users/:id', usersController.deleteUser);
  app.delete('/map/markers/:id', mapController.deleteMarker);
};