import { Stack } from '@mui/material';
import { TextFieldAw } from '../TextField';
import { useApp } from '../../context';
import React from 'react';
import { DEFAULT_ERROR_MSG } from '../../commons/constant';

export const Campaign = () => {
    const { information, setInformation, submited } = useApp();

    const handleChange: (
        field: 'name' | 'describe'
    ) => (value: string) => void = (field) => (value) => {
        setInformation({ ...information, [field]: value });
    };

    return (
        <Stack gap={2} sx={{ padding: '30px 16px 16px' }}>
            <TextFieldAw
                label="Tên chiến dịch*"
                value={information.name}
                onChange={handleChange('name')}
                error={submited && !information.name}
                helperText={submited && !information.name && DEFAULT_ERROR_MSG}
            />
            <TextFieldAw
                label="Mô tả"
                value={information.describe}
                onChange={handleChange('describe')}
                error={submited && !information.describe}
                helperText={
                    submited && !information.describe && DEFAULT_ERROR_MSG
                }
            />
        </Stack>
    );
};
