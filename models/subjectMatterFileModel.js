const Sequelize = require('sequelize');
const db = require('../config/mysql');

const SubjectMatterFile = db.define('SubjectMatterFile', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  subject_matter_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING(50)
  },
  google_file_id: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  category: {
    type: Sequelize.ENUM('VIDEO', 'DOCUMENT'),
    defaultValue: 'DOCUMENT'
  },
  order_sequence: {
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
}, {
  tableName: 'subject_matter_files',
  timestamps: false
});

module.exports = SubjectMatterFile;