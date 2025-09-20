const { Institution, Certificate, VerificationLog, AuditLog, User } = require('../models');
const { Op } = require('sequelize');

// Analytics Dashboard
exports.analytics = async (req, res, next) => {
  try {
    const totalVerifications = await VerificationLog.count();
    const fraudAttempts = await VerificationLog.count({ where: { is_successful: false } });
    const successRate = totalVerifications === 0 ? 0 : Math.round(100 * (totalVerifications - fraudAttempts) / totalVerifications);
    const institutions = await Institution.count();
    res.json({ totalVerifications, fraudAttempts, successRate, institutions });
  } catch (err) { next(err); }
};

// Manage Institutions
exports.addInstitution = async (req, res, next) => {
  try {
    const { name, code, contact_email } = req.body;
    const institution = await Institution.create({ name, code, contact_email, is_verified: true });
    res.json({ success: true, institution });
  } catch (err) { next(err); }
};