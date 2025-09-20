const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');

const source = fs.readFileSync('./contracts/AcademicCertificateRegistry.sol', 'utf8');
const input = {
  language: 'Solidity',
  sources: { 'AcademicCertificateRegistry.sol': { content: source } },
  settings: { outputSelection: { '*': { '*': ['*'] } } }
};
const output = JSON.parse(solc.compile(JSON.stringify(input)));
const abi = output.contracts['AcademicCertificateRegistry.sol']['AcademicCertificateRegistry'].abi;
const bytecode = output.contracts['AcademicCertificateRegistry.sol']['AcademicCertificateRegistry'].evm.bytecode.object;

const web3 = new Web3('http://localhost:8545');
(async () => {
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(abi);
  const deployed = await contract.deploy({ data: '0x' + bytecode }).send({ from: accounts[0], gas: 4000000 });
  console.log('Contract deployed at:', deployed.options.address);
  fs.writeFileSync('./contracts/AcademicCertificateRegistry.json', JSON.stringify({ abi, address: deployed.options.address }));
})();