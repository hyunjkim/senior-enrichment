const Sequelize = require('sequelize');
const db = require('../index');

const students = db.define('students',{
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type : Sequelize.STRING,
    allowNull: false,
    isEmail: true,
  },
  info: {
    type : Sequelize.STRING,
  }
})

module.exports = students;
