import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Box, TextField, Button } from '@mui/material';
import axios from 'axios';

const Login: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post('/api/auth/login', { email, password });
    login(res.data.user, res.data.token);
  };
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required sx={{ ml: 2 }} />
      <Button type="submit" variant="contained" sx={{ ml: 2 }}>Login</Button>
    </Box>
  );
};

export default Login;