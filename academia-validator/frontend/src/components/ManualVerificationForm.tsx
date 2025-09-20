import React, { useState, useContext } from 'react';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { VerificationContext } from '../contexts/VerificationContext';

const ManualVerificationForm: React.FC = () => {
  const [institutionCode, setInstitutionCode] = useState('');
  const [certificateNumber, setCertificateNumber] = useState('');
  const { addResult } = useContext(VerificationContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post('/api/certificates/verify', { institution_code: institutionCode, certificate_number: certificateNumber });
    addResult(res.data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField label="Institution Code" value={institutionCode} onChange={e => setInstitutionCode(e.target.value)} required />
      <TextField label="Certificate Number" value={certificateNumber} onChange={e => setCertificateNumber(e.target.value)} required sx={{ ml: 2 }} />
      <Button type="submit" variant="contained" sx={{ ml: 2 }}>Verify</Button>
    </Box>
  );
};

export default ManualVerificationForm;