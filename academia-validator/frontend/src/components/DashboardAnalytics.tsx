import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

const DashboardAnalytics: React.FC = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    axios.get('/api/admin/analytics', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(res => setData(res.data));
  }, []);
  if (!data) return <Typography>Loading analytics...</Typography>;
  return (
    <Box>
      <Typography>Total Verifications: {data.totalVerifications}</Typography>
      <Typography>Fraud Attempts: {data.fraudAttempts}</Typography>
      <Typography>Success Rate: {data.successRate}%</Typography>
      <Typography>Total Institutions: {data.institutions}</Typography>
    </Box>
  );
};

export default DashboardAnalytics;