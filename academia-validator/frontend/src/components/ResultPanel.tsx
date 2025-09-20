import React, { useContext } from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';
import { VerificationContext } from '../contexts/VerificationContext';

const ResultPanel: React.FC = () => {
  const { history } = useContext(VerificationContext);
  if (history.length === 0) return <Typography>No verifications yet.</Typography>;
  const { success, certificate, anomalies } = history[0];
  return (
    <Box sx={{ mt: 2, p: 2, border: '1px solid', borderColor: success ? 'green' : 'red', borderRadius: 2 }}>
      <Typography variant="h6" color={success ? "green" : "red"}>
        {success ? "✅ Certificate Verified" : "❌ Suspicious Certificate Detected"}
      </Typography>
      <Typography>Student: {certificate.student_name}</Typography>
      <Typography>Degree: {certificate.degree_name}</Typography>
      <List>
        {anomalies.map((a: string, i: number) => <ListItem key={i}>{a}</ListItem>)}
      </List>
    </Box>
  );
};

export default ResultPanel;