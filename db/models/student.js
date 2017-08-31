const Sequelize = require('sequelize');
const db = require('../index');

module.exports = db.define('student', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  image: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  birthday: {
    type: Sequelize.STRING
  }
});
