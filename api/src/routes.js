const usersController = require('./controllers/users.controller')
const mapController = require('./controllers/map.controller')
const accessCodesController = require('./controllers/accessCodes.controller')

module.exports = function (app) {
  // get
  app.get('/users', usersController.getUsers);
  app.get('/users/:id', usersController.getUser);
  app.get('/users/teachers', usersController.getTeachers);
  app.get('/users/admins', usersController.getAdmins);
  app.get('/map/markers', mapController.getMarkers);
  app.get('/accesscodes', accessCodesController.getAccessCodes);
  
  // post
  app.post('/map/markers', mapController.addMarker);
  app.post('/map/markers/results', mapController.addResults);
  app.post('/users/signup', usersController.signUpUser);
  app.post('/users/signin', usersController.signInUser);
  app.post('/users/students', usersController.getStudents);
  app.post('/accesscodes', accessCodesController.addAccessCode);

  // put
  app.put('/users/:id', usersController.updateUser);
  app.put('/map/markers/:id', mapController.updateMarker);
  
  // delete
  app.delete('/users/:id', usersController.deleteUser);
  app.delete('/map/markers/:id', mapController.deleteMarker);
  app.delete('/accesscodes/:id', accessCodesController.deleteAccessCode);
};
