import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './context';
import { ThemeProvider } from '@mui/material';
import { theme } from './commons';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <AppProvider>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </AppProvider>
    </React.StrictMode>
);
