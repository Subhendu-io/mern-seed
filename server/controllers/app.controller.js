const bcrypt = require('bcryptjs');
const globalHelper = require('../helpers/global.helper');

module.exports.hello = async (req, res, next) => {
  try {
    return res.send({
      success : true,
      data    : 'Hello World!',
      title   : 'Welcome to MERN-Seed!',
      message : 'This is an MERN-Stack based nodejs app architecture.',
    });
  } catch (error) {
    return next(error);
  }
};
module.exports.test = async (req, res, next) => {
  try {
    bcrypt.genSalt(10, async (err, secrete) => {
      const password = 'subhendu@2020';
      const _encrypted = await globalHelper.encryptPassword(password, secrete);
      console.log(secrete, _encrypted);
      const _decrypt = await globalHelper.decryptPassword(_encrypted, secrete);
      console.log(secrete, _decrypt);
      return res.end();
    });
  } catch (error) {
    return next(error);
  }
};