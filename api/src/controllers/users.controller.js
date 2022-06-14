const UsersService = require('../services/users.service');

const usersService = new UsersService();

module.exports = {
    getUsers: function (req, res) {
        res.json(usersService.getUsers())
    },
    getUser: function (req, res) {
        res.json(usersService.getUser(req))
    },
    getStudents: function (req, res) {
        res.json(usersService.getStudents())
    },
    getPendingStudents: function (req, res) {
        res.json(usersService.getPendingStudents())
    },
    getTeachers: function (req, res) {
        res.json(usersService.getTeachers())
    },
    getPendingTeachers: function (req, res) {
        res.json(usersService.getPendingTeachers())
    },
    getAdmins: function (req, res) {
        res.json(usersService.getAdmins())
    },
    postUsers: function (req, res) {
        res.json(usersService.postUsers(req))
    },
    putUser: function (req, res) {
        res.json(usersService.putUser(req))
    },
    putUsers: function (req, res) {
        res.json(usersService.putUsers(req))
    }
}