const Sequelize = require('sequelize'); 

const sequelize = new Sequelize('management', 'root', 'Pratik@123', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize; 