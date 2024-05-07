import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

export const theme = createTheme({
    palette: {
        mode: 'dark',
        teal: {
            main: '#16d3d3',
            contrastText: grey[900],
        },
    },
});

declare module '@mui/material/styles' {
    interface Palette {
        teal: Palette['primary'];
    }

    interface PaletteOptions {
        teal?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        teal: true;
    }
}
