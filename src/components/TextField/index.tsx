import { SxProps, TextField, TextFieldProps } from '@mui/material';
import { useState } from 'react';

export type TextFieldAwProps = Pick<
    TextFieldProps,
    'label' | 'value' | 'error' | 'helperText' | 'type'
>;

export const TextFieldAw = (
    props: TextFieldAwProps & { onChange: (value: string) => void }
) => {
    const [isFocus, setIsFocus] = useState(false);

    return (
        <TextField
            {...props}
            onChange={(e) => props.onChange(e.currentTarget.value)}
            onKeyDown={(e) => {
                e.stopPropagation();
            }}
            sx={sx}
            focused={isFocus || !!props.value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            fullWidth
        />
    );
};

const sx: SxProps = {
    input: {
        padding: '8px 16px',
        backgroundColor: 'grey.800',
        borderRadius: 1,
    },
    '.MuiInputLabel-root': {
        transform: 'translate(14px, 8px) scale(1)',
        color: 'grey.500',
    },
    '.MuiInputLabel-root.Mui-focused': {
        transform: 'translate(14px, -9px) scale(0.75)',
        color: 'teal.main',
    },
    '.Mui-focused fieldset.MuiOutlinedInput-notchedOutline': {
        borderColor: 'teal.main',
    },
};
