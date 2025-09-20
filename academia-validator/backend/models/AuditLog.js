const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('AuditLog', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER },
  action: { type: DataTypes.STRING, allowNull: false },
  resource_type: { type: DataTypes.STRING, allowNull: false },
  resource_id: { type: DataTypes.INTEGER },
  details: { type: DataTypes.JSONB },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});