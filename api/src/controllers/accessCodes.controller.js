const AccessCodesService = require('../services/accessCodes.service');

const accessCodesService = new AccessCodesService()

module.exports = {

  getAccessCodes: async function (req, res) {
    try {
      const accessCodes = await accessCodesService.getAccessCodes();
      res.status(200).send({ status: 200, accessCodes: accessCodes });
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ status: 400, message: error.message });
    }
  },
  addAccessCode: async function (req, res) {
    try {
      const accessCodes = await accessCodesService.addAccessCode(req.body.accessCodeInfo);
      res.status(200).send({ status: 200, accessCodes: accessCodes });
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ status: 400, message: error.message });
    }
  }
}