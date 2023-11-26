const Sequelize = require('sequelize');
const db = require('../config/mysql');

const UserRoleAccess = db.define('user_role_access', {
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  role_access_code_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'user_role_access',
  timestamps: false, // Disable default timestamps
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'role_access_code_id']
    }
  ]
});

module.exports = UserRoleAccess;