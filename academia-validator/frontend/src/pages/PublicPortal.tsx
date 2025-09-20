import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import ManualVerificationForm from '../components/ManualVerificationForm';
import FileUpload from '../components/FileUpload';
import ResultPanel from '../components/ResultPanel';

const PublicPortal: React.FC = () => {
  const [tab, setTab] = useState(0);
  return (
    <Box>
      <Tabs value={tab} onChange={(e, v) => setTab(v)} aria-label="Verification Tabs">
        <Tab label="Manual Verification" />
        <Tab label="File Upload" />
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {tab === 0 ? <ManualVerificationForm /> : <FileUpload />}
        <ResultPanel />
      </Box>
    </Box>
  );
};

export default PublicPortal;