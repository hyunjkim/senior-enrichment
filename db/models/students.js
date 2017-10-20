const Sequelize = require('sequelize');
const db = require('../index');

const Students = db.define('students',{
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type : Sequelize.STRING,
    validate:{
      isEmail: true,
    }
  },
  info: {
    type : Sequelize.STRING,
  }
})

module.exports = Students;
