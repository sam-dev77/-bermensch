import React, { useRef } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

const BulkUpload: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('csv', file);
      await axios.post('/api/certificates/bulk', formData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      alert('Bulk upload successful!');
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => inputRef.current?.click()}>Bulk Upload CSV</Button>
      <input ref={inputRef} type="file" accept=".csv" style={{ display: 'none' }} onChange={handleFile} />
    </>
  );
};

export default BulkUpload;