const AccessCode = require("../models/AccessCode");

class AccessCodesService {
  constructor() { }
  async getAccessCodes() {
    return await AccessCode.find();
  }
  async getAccessCodeInfo(accessCode) {
    return await AccessCode.findOne({ code: accessCode });
  }
  async addAccessCode(accessCodeInfo) {
    /* create 2 access codes
    1 for students
    1 for teachers
    make sure the access codes are unique
    and return an accessCodes object {students: , teachers: }
    */
    const generateAccessCode = () => {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() *
          characters.length));
      }
      return result;
    }

    let studentsAccessCode = {
      centreDeServicesScolaire: accessCodeInfo.centreDeServicesScolaire,
      ecole: accessCodeInfo.ecole,
      niveauScolaire: accessCodeInfo.niveauScolaire,
      role: "Élève"
    }
    let teacherAccessCode = {
      centreDeServicesScolaire: accessCodeInfo.centreDeServicesScolaire,
      ecole: accessCodeInfo.ecole,
      niveauScolaire: accessCodeInfo.niveauScolaire,
      role: "Enseignant"
    }

    do { studentsAccessCode.code = generateAccessCode(); }
    // Make sure it's unique
    while (await AccessCode.findOne({ code: studentsAccessCode.code }))

    do { teacherAccessCode.code = generateAccessCode(); }
    // Make sure it's unique
    while (await AccessCode.findOne({ code: teacherAccessCode.code }))

    studentsAccessCode = await AccessCode.create(studentsAccessCode)
    teacherAccessCode = await AccessCode.create(teacherAccessCode)
    return { students: studentsAccessCode.code, teacher: teacherAccessCode.code };
  }
}

module.exports = AccessCodesService