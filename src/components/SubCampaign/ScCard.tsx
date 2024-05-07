import { Box, Button, Typography } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { PaperAw } from '../Paper';
import { useMemo } from 'react';
import { ISubCampaign, useApp } from '../../context';

export const ScCard = ({
    sc,
    selected,
    onRemove,
    onSelect,
    error,
}: {
    sc: ISubCampaign;
    selected?: boolean;
    onRemove: () => void;
    onSelect: () => void;
    error?: boolean;
}) => {
    const { submited } = useApp();

    const totalAds = useMemo(() => {
        return sc.ads.reduce((a, b) => a + b.quantity, 0);
    }, [sc.ads]);

    const selfError = useMemo(
        () => submited && (!totalAds || !sc.name || error),
        [sc, totalAds, submited, error]
    );

    return (
        <Box
            sx={{
                opacity: selected ? 1 : 0.6,
                width: 214,
                height: 152,
                transition: 'all 0.3s',
                '&:hover': {
                    opacity: 1,
                },
            }}
        >
            <PaperAw
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box
                    onClick={onSelect}
                    sx={{
                        padding: 2,
                        cursor: 'pointer',
                        flex: 1,
                    }}
                >
                    <Typography
                        variant="body1"
                        component={'h3'}
                        sx={{
                            fontWeight: 'bold',
                            color: selfError ? 'error.main' : undefined,
                            marginBottom: 1,
                            wordBreak: 'break-all',
                            textAlign: 'center',
                        }}
                    >
                        {sc.name.length > 20
                            ? sc.name.slice(0, 20) + '...'
                            : sc.name}{' '}
                        <CheckCircleRoundedIcon
                            color={sc.status ? 'primary' : 'disabled'}
                            sx={{ marginBottom: '-4px', fontSize: '20px' }}
                        />
                    </Typography>
                    <Typography
                        variant="h6"
                        component={'p'}
                        textAlign={'center'}
                    >
                        {totalAds}
                    </Typography>
                </Box>
                <Button
                    color="error"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onClick={onRemove}
                >
                    <DeleteOutlinedIcon />
                </Button>
            </PaperAw>
        </Box>
    );
};

export const ScCardAdd = ({ onClick }: { onClick: () => void }) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                width: 214,
                height: 152,
                borderRadius: 1,
                border: '2px solid',
                borderColor: 'teal.main',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0.2,
                cursor: 'pointer',
                transition: 'all 0.3s',
                svg: {
                    color: 'teal.main',
                },

                '&:hover': {
                    opacity: 0.7,
                },
            }}
        >
            <AddRoundedIcon />
        </Box>
    );
};
