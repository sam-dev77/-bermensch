import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, Typography } from '@mui/material';

const CertificateList: React.FC<{ institutionId: number }> = ({ institutionId }) => {
  const [certificates, setCertificates] = useState<any[]>([]);
  useEffect(() => {
    axios.get(`/api/certificates?institution_id=${institutionId}`)
      .then(res => setCertificates(res.data));
  }, [institutionId]);
  return (
    <List>
      {certificates.map(cert => (
        <ListItem key={cert.id}>
          <Typography>{cert.certificate_number} - {cert.student_name} ({cert.degree_name})</Typography>
        </ListItem>
      ))}
    </List>
  );
};
export default CertificateList;