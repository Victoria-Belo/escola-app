const { DataTypes } = require('sequelize');
const sequelize = require('../databaseConfig');
  
const sequelizeStudent = sequelize.define('Estudante', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports =  {sequelizeStudent, sequelize };
