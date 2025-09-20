const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('Certificate', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  institution_id: { type: DataTypes.INTEGER, allowNull: false },
  certificate_number: { type: DataTypes.STRING, allowNull: false },
  student_name: { type: DataTypes.STRING, allowNull: false },
  degree_name: { type: DataTypes.STRING, allowNull: false },
  issue_date: { type: DataTypes.DATE, allowNull: false },
  grades: { type: DataTypes.JSONB },
  hash_value: { type: DataTypes.STRING, allowNull: false },
  blockchain_tx_hash: { type: DataTypes.STRING }
});