const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('VerificationLog', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  certificate_id: { type: DataTypes.INTEGER, allowNull: false },
  verifier_id: { type: DataTypes.INTEGER },
  verification_method: { type: DataTypes.ENUM('manual', 'file_upload'), allowNull: false },
  is_successful: { type: DataTypes.BOOLEAN, allowNull: false },
  verification_details: { type: DataTypes.JSONB },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});