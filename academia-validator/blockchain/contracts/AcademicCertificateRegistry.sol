// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AcademicCertificateRegistry {
    address public admin;
    mapping(string => bytes32) public certificateHashes;

    event CertificateRegistered(string certificateNumber, bytes32 hash);

    constructor() {
        admin = msg.sender;
    }

    function registerCertificate(string memory certificateNumber, bytes32 hash) public {
        require(msg.sender == admin, "Only admin");
        certificateHashes[certificateNumber] = hash;
        emit CertificateRegistered(certificateNumber, hash);
    }

    function getCertificateHash(string memory certificateNumber) public view returns (bytes32) {
        return certificateHashes[certificateNumber];
    }
}