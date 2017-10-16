const Sequelize = require('sequelize');
const db = require('../index');

const campus = db.define('campuses',{
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type:Sequelize.STRING,
  },
})


module.exports = campus;
