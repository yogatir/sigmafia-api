const Sequelize = require('sequelize');
const db = require('../config/mysql');

const Tryout = db.define('Tryout', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  role_access_code_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  code: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  description: {
    type: Sequelize.STRING(100)
  },
  calculation_type: {
    type: Sequelize.ENUM('PARENT', 'CHILD'),
    defaultValue: 'PARENT'
  },
  start_date: {
    type: Sequelize.DATE
  },
  end_date: {
    type: Sequelize.DATE
  },
  time_limit: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  category: {
    type: Sequelize.ENUM('TRYOUT', 'TRAINING'),
    defaultValue: 'TRYOUT'
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
  tableName: 'tryouts',
  timestamps: false
});

module.exports = Tryout;