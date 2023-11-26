const Sequelize = require('sequelize');
const db = require('../config/mysql');

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(75),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  school: {
    type: Sequelize.STRING(75)
  },
  major: {
    type: Sequelize.STRING(50)
  },
  gender: {
    type: Sequelize.ENUM('MALE', 'FEMALE')
  },
  user_level: {
    type: Sequelize.ENUM('STUDENT', 'TEACHER', 'ADMIN')
  },
  created_date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updated_date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
  }
});

module.exports = User;