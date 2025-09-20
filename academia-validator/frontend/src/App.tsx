import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';
import { VerificationProvider } from './contexts/VerificationContext';
import AppRoutes from './routes';
import { getTheme } from './theme';

const App: React.FC = () => (
  <ThemeProvider>
    <ThemeContext.Consumer>
      {({ mode }) => (
        <MuiThemeProvider theme={getTheme(mode)}>
          <AuthProvider>
            <VerificationProvider>
              <AppRoutes />
            </VerificationProvider>
          </AuthProvider>
        </MuiThemeProvider>
      )}
    </ThemeContext.Consumer>
  </ThemeProvider>
);

export default App;