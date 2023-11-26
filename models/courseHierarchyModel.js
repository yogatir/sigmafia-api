const Sequelize = require('sequelize');
const db = require('../config/mysql');

const CourseHierarchy = db.define('CourseHierarchy', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  category: {
    type: Sequelize.ENUM('CURRICULUM', 'CLASS', 'SUBJECT', 'SCHOOL'),
    allowNull: false
  },
  order_hierarchy: {
    type: Sequelize.ENUM('1', '2', '3', '4'),
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
}, {
  tableName: 'course_hierarchies',
  timestamps: false
});

module.exports = CourseHierarchy;