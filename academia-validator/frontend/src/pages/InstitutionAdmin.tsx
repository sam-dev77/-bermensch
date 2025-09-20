import React, { useContext } from 'react';
import BulkUpload from '../components/BulkUpload';
import CertificateList from '../components/CertificateList';
import { AuthContext } from '../contexts/AuthContext';

const InstitutionAdmin: React.FC = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <BulkUpload />
      <CertificateList institutionId={user?.institution_id} />
    </>
  );
};

export default InstitutionAdmin;