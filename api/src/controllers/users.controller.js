const UsersService = require('../services/users.service');

const usersService = new UsersService();

module.exports = {
  getUsers: async function (req, res) {
    try {
      const users = await usersService.getUsers();
      res.status(200).send({ status: 200, users: users });
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ status: 400, message: error.message });
    }
  },

  getUser: async function (req, res) {
    try {
      const user = await usersService.getUser(req.params.id);
      res.status(200).send({ status: 200, user: user });
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ status: 400, message: error.message });
    }
  },

  getStudents: async function (req, res) {
    try {
      const students = await usersService.getStudents(req.body.css, req.body.ecole, req.body.niveauScolaire);
      res.status(200).send({ status: 200, students: students });
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ status: 400, message: error.message });
    }
  },

  getTeachers: async function (req, res) {
    try {
      const teachers = await usersService.getTeachers();
      res.status(200).send({ status: 200, teachers: teachers });
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ status: 400, message: error.message });
    }
  },

  getAdmins: async function (req, res) {
    try {
      const admins = await usersService.getAdmins();
      res.status(200).send({ status: 200, admins: admins });
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ status: 400, message: error.message });
    }
  },

  signUpUser: async function (req, res) {
    try {
      const signedUpUser = await usersService.signUpUser(req.body.user, req.body.accessCode);
      res.status(200).send({ status: 200, user: signedUpUser });
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ status: 400, message: error.message });
    }
  },

  signInUser: async function (req, res) {
    try {
      const user = await usersService.signInUser(req.body.identifiant, req.body.motDePasse);
      res.status(200).send({ status: 200, user: user });
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ status: 400, message: error.message });
    }
  },

  updateUser: async function (req, res) {
    try {
      const updatedUser = await usersService.updateUser(req.body.userToUpdate);
      res.status(200).send({ status: 200, user: updatedUser });
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ status: 400, message: error.message });
    }
  },

  deleteUser: async function (req, res) {
    try {
      await usersService.deleteUser(req.params.id);
      res.status(200).send({ status: 200 });
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ status: 400, message: error.message });
    }
  }
}
