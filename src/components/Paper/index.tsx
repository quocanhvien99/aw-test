import { Paper, SxProps } from '@mui/material';
import { ReactNode } from 'react';

export const PaperAw = (props: { children: ReactNode; sx?: SxProps }) => {
    const sx: SxProps = {
        backgroundColor: 'grey.900',
        overflow: 'hidden',
        ...props.sx,
    };

    return (
        <Paper elevation={3} sx={sx}>
            {props.children}
        </Paper>
    );
};
