const Web3 = require('web3');
const contractABI = require('../../blockchain/contracts/AcademicCertificateRegistry.json').abi;
const contractAddress = process.env.CONTRACT_ADDRESS;

const web3 = new Web3(process.env.ETH_NODE_URL);

const contract = new web3.eth.Contract(contractABI, contractAddress);

exports.generateCertificateHash = (certData) => {
  // Simple hash: SHA256
  const str = JSON.stringify(certData);
  return web3.utils.sha3(str);
};

exports.registerCertificateHash = async (certificateNumber, hashValue) => {
  const account = process.env.ETH_ADMIN_ADDRESS;
  const tx = await contract.methods.registerCertificate(certificateNumber, hashValue)
    .send({ from: account, gas: 200000 });
  return tx.transactionHash;
};

exports.getCertificateHash = async (certificateNumber) => {
  return await contract.methods.getCertificateHash(certificateNumber).call();
};