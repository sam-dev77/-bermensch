const { Certificate, Institution, VerificationLog } = require('../models');
const { cacheGet, cacheSet } = require('../config/redis');
const blockchainService = require('../services/blockchainService');
const ocrService = require('../services/ocrService');
const { Op } = require('sequelize');

// Manual Verification
exports.verify = async (req, res, next) => {
  try {
    const { institution_code, certificate_number } = req.body;
    // Redis cache check
    const cacheKey = `verify:${institution_code}:${certificate_number}`;
    let cached = await cacheGet(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const institution = await Institution.findOne({ where: { code: institution_code } });
    if (!institution) throw { status: 404, message: 'Invalid institution code' };
    const certificate = await Certificate.findOne({
      where: { institution_id: institution.id, certificate_number }
    });
    if (!certificate) throw { status: 404, message: 'Certificate not found' };

    // Blockchain hash check
    const onChainHash = await blockchainService.getCertificateHash(certificate.certificate_number);
    let anomalies = [];
    if (onChainHash !== certificate.hash_value) anomalies.push('Hash mismatch');
    if (!institution.is_verified) anomalies.push('Institution not verified');

    const result = {
      success: anomalies.length === 0,
      certificate,
      anomalies
    };

    await VerificationLog.create({
      certificate_id: certificate.id,
      verifier_id: req.user ? req.user.id : null,
      verification_method: 'manual',
      is_successful: result.success,
      verification_details: { anomalies }
    });

    await cacheSet(cacheKey, JSON.stringify(result), { EX: 60 * 5 });
    res.json(result);
  } catch (err) { next(err); }
};

// File Upload Verification
exports.uploadVerify = async (req, res, next) => {
  try {
    if (!req.file) throw { status: 400, message: 'No file uploaded' };
    const extracted = await ocrService.extractText(req.file.path);
    // Parse certificate_number and institution_code from OCR (simplified for hackathon)
    const certificate_number = extracted.match(/Certificate Number:\s*(\w+)/)?.[1];
    const institution_code = extracted.match(/Institution Code:\s*(\w+)/)?.[1];
    if (!certificate_number || !institution_code) throw { status: 400, message: 'Could not extract required fields' };
    req.body = { institution_code, certificate_number };
    return exports.verify(req, res, next);
  } catch (err) { next(err); }
};

// Add Certificate
exports.addCertificate = async (req, res, next) => {
  try {
    const { institution_id, certificate_number, student_name, degree_name, issue_date, grades } = req.body;
    // Generate hash and store on blockchain
    const hash_value = blockchainService.generateCertificateHash({ certificate_number, student_name, degree_name, issue_date, grades });
    const blockchain_tx_hash = await blockchainService.registerCertificateHash(certificate_number, hash_value);

    const certificate = await Certificate.create({
      institution_id, certificate_number, student_name, degree_name, issue_date, grades, hash_value, blockchain_tx_hash
    });
    res.json({ success: true, certificate });
  } catch (err) { next(err); }
};