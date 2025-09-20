import React, { useRef, useState, useContext } from 'react';
import { Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { VerificationContext } from '../contexts/VerificationContext';

const FileUpload: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { addResult } = useContext(VerificationContext);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('/api/certificates/upload-verify', formData);
      addResult(res.data);
    }
  };

  return (
    <Box>
      <Button variant="contained" onClick={() => inputRef.current?.click()} aria-label="Upload certificate file">
        Upload Certificate
      </Button>
      <input ref={inputRef} type="file" accept=".pdf,.jpg,.png" style={{ display: 'none' }} onChange={handleFile} />
      {preview && <img src={preview} alt="Preview" style={{ maxWidth: 300, marginTop: 16 }} />}
    </Box>
  );
};

export default FileUpload;