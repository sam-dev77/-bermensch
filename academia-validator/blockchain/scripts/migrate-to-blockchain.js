const { Certificate } = require('../../backend/models');
const blockchainService = require('../../backend/services/blockchainService');

(async () => {
  const certificates = await Certificate.findAll();
  for (const cert of certificates) {
    const hash = blockchainService.generateCertificateHash(cert);
    await blockchainService.registerCertificateHash(cert.certificate_number, hash);
    cert.hash_value = hash;
    // Optionally update blockchain_tx_hash if possible
    await cert.save();
    console.log(`Migrated certificate ${cert.certificate_number} to blockchain.`);
  }
})();