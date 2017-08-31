const Sequelize = require('sequelize');
const db = require('../index');

module.exports = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  }
});
