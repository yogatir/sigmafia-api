const Sequelize = require('sequelize');
const db = require('../config/mysql');

const RoleAccessCode = db.define('role_access_code', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.STRING(100)
  },
  class_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  subject_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  school_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  curriculum_id: {
    type: Sequelize.INTEGER,
    allowNull: false
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

module.exports = RoleAccessCode;