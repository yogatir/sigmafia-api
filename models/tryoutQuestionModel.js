const Sequelize = require('sequelize');
const db = require('../config/mysql');

const TryoutQuestion = db.define('TryoutQuestion', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tryout_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  question: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  first_option: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  second_option: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  third_option: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  fourth_option: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  fifth_option: {
    type: Sequelize.TEXT
  },
  correct_option: {
    type: Sequelize.ENUM('FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH'),
    allowNull: false
  },
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 1
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
  tableName: 'tryout_questions',
  timestamps: false
});

module.exports = TryoutQuestion;