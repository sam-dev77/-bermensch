const sequelize = require('../config/db');
const Institution = require('./Institution')(sequelize);
const User = require('./User')(sequelize);
const Certificate = require('./Certificate')(sequelize);
const VerificationLog = require('./VerificationLog')(sequelize);
const AuditLog = require('./AuditLog')(sequelize);

// Associations
Institution.hasMany(User, { foreignKey: 'institution_id' });
User.belongsTo(Institution, { foreignKey: 'institution_id' });

Institution.hasMany(Certificate, { foreignKey: 'institution_id' });
Certificate.belongsTo(Institution, { foreignKey: 'institution_id' });

Certificate.hasMany(VerificationLog, { foreignKey: 'certificate_id' });
VerificationLog.belongsTo(Certificate, { foreignKey: 'certificate_id' });

User.hasMany(VerificationLog, { foreignKey: 'verifier_id' });
VerificationLog.belongsTo(User, { foreignKey: 'verifier_id' });

User.hasMany(AuditLog, { foreignKey: 'user_id' });
AuditLog.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  Institution,
  User,
  Certificate,
  VerificationLog,
  AuditLog
};