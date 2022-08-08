const UsersService = require('../services/users.service');

const usersService = new UsersService();

module.exports = {
  getUsers: function (req, res) {
    res.json(usersService.getUsers(req, res))
  },
  getUser: function (req, res) {
    res.json(usersService.getUser(req, res))
  },
  getStudents: function (req, res) {
    res.json(usersService.getStudents(req, res))
  },
  // getPendingStudents: function (req, res) {
  //   res.json(usersService.getPendingStudents())
  // },
  getTeachers: function (req, res) {
    res.json(usersService.getTeachers(req, res))
  },
  // getPendingTeachers: function (req, res) {
  //   res.json(usersService.getPendingTeachers())
  // },
  getAdmins: function (req, res) {
    res.json(usersService.getAdmins(req, res))
  },
  signUpUser: function (req, res) {
    res.json(usersService.signupUser(req, res))
  },
  signInUser: function (req, res) {
    res.json(usersService.signinUser(req, res))
  },
  updateUser: function (req, res) {
    res.json(usersService.updateUser(req, res))
  },
  deleteUser: function (req, res) {
    res.json(usersService.deleteUser(req, res))
  },
}