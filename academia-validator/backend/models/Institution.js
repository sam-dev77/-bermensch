const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('Institution', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  code: { type: DataTypes.STRING, unique: true, allowNull: false },
  contact_email: { type: DataTypes.STRING, allowNull: false },
  public_key: { type: DataTypes.TEXT },
  is_verified: { type: DataTypes.BOOLEAN, defaultValue: false }
});