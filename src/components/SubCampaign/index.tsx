import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { ISubCampaign, useApp } from '../../context';
import { ScCard, ScCardAdd } from './ScCard';
import { useState } from 'react';
import { TextFieldAw } from '../TextField';
import { DEFAULT_ERROR_MSG } from '../../commons/constant';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export const SubCampaign = () => {
    const { subCampaigns, setSubCampaigns, submited, errors } = useApp();
    const [activeSc, setActiveSc] = useState(0);
    const [selectedRows, setSelectedRows] = useState([]);

    const addSubCampaign = () => {
        setSubCampaigns((prev: any) => [
            ...prev,
            {
                name: `Chiến dịch con ${prev.length + 1}`,
                status: true,
                ads: [
                    {
                        name: 'Quảng cáo 1',
                        quantity: 0,
                    },
                ],
            },
        ]);
    };

    const addAd = (idx: number) => () => {
        setSubCampaigns((prev: any) => {
            const sc = { ...prev[idx] };
            sc.ads = [
                ...sc.ads,
                {
                    name: `Quảng cáo ${sc.ads.length + 1}`,
                    quantity: 0,
                },
            ];

            return prev.toSpliced(idx, 1, sc);
        });
    };

    const rmSubCampaign = (idx: number) => () => {
        setSubCampaigns((prev: any) => {
            if (subCampaigns.length === 1) return prev;
            if (activeSc >= idx && activeSc !== 0) setActiveSc(activeSc - 1);
            return prev.toSpliced(idx, 1);
        });
    };

    const rmAd = (scIdx: number, ids: Array<number>) => () => {
        setSubCampaigns((prev: any) => {
            const sc = { ...prev[scIdx] };
            sc.ads = sc.ads.filter((_: any, i: number) => !ids.includes(i));

            return prev.toSpliced(scIdx, 1, sc);
        });
        setSelectedRows([]);
    };

    const handleChangeSc =
        (idx: number, field: 'name' | 'status') => (value: string | boolean) =>
            setSubCampaigns((prev: any) =>
                prev.toSpliced(idx, 1, { ...prev[idx], [field]: value })
            );

    const handleChangeAd =
        (scIdx: number, idx: number, field: 'name' | 'quantity') =>
        (value: string) =>
            setSubCampaigns((prev: any) => {
                const sc = { ...prev[scIdx] };
                sc.ads = sc.ads.toSpliced(idx, 1, {
                    ...sc.ads[idx],
                    [field]:
                        field === 'quantity'
                            ? +value < 0
                                ? 0
                                : +value
                            : value,
                });

                return prev.toSpliced(scIdx, 1, sc);
            });

    const cols: GridColDef[] = [
        {
            field: 'nameInput',
            headerName: 'Tên quảng cáo*',
            flex: 1,
            renderCell(params) {
                return (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <TextFieldAw
                            value={params.row.name}
                            onChange={handleChangeAd(
                                activeSc,
                                +params.id,
                                'name'
                            )}
                            error={submited && !params.row.name}
                        />
                    </Box>
                );
            },
        },
        {
            field: 'quantityInput',
            headerName: 'Số lượng*',
            flex: 1,
            renderCell(params) {
                return (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <TextFieldAw
                            value={params.row.quantity}
                            type="number"
                            onChange={handleChangeAd(
                                activeSc,
                                +params.id,
                                'quantity'
                            )}
                            error={submited && !params.row.quantity}
                        />
                    </Box>
                );
            },
        },
        {
            field: '',
            renderHeader: () =>
                selectedRows.length ? (
                    <Button
                        variant="outlined"
                        color="teal"
                        startIcon={
                            <RemoveRoundedIcon sx={{ marginRight: '-5px' }} />
                        }
                        onClick={rmAd(activeSc, selectedRows)}
                    >
                        Xóa
                    </Button>
                ) : (
                    <Button
                        variant="outlined"
                        color="teal"
                        startIcon={
                            <AddRoundedIcon sx={{ marginRight: '-5px' }} />
                        }
                        onClick={addAd(activeSc)}
                    >
                        Thêm
                    </Button>
                ),
            renderCell(params) {
                return (
                    <Box
                        sx={{
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <IconButton onClick={rmAd(activeSc, [+params.id])}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                );
            },
        },
    ];
    const rows = subCampaigns[activeSc].ads.map((ad: any, id: number) => ({
        ...ad,
        id,
    }));

    return (
        <Box
            sx={{
                '& > *': {
                    padding: 2,
                    borderBottom: '1px solid',
                    borderColor: 'grey.700',
                },
            }}
        >
            <Box
                sx={{
                    paddingTop: '30px',
                }}
            >
                <Stack direction={'row'} flexWrap={'wrap'} gap={2}>
                    {subCampaigns.map((sc: ISubCampaign, idx: number) => (
                        <ScCard
                            onSelect={() => setActiveSc(idx)}
                            onRemove={rmSubCampaign(idx)}
                            sc={sc}
                            selected={idx === activeSc}
                            error={errors[`subCampaigns.${idx}`]}
                        />
                    ))}
                    <ScCardAdd onClick={addSubCampaign} />
                </Stack>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                    <TextFieldAw
                        label="Tên chiến dịch con*"
                        value={subCampaigns[activeSc].name}
                        onChange={handleChangeSc(activeSc, 'name')}
                        error={submited && !subCampaigns[activeSc].name}
                        helperText={
                            submited &&
                            !subCampaigns[activeSc].name &&
                            DEFAULT_ERROR_MSG
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={4} textAlign={'center'}>
                    <FormControlLabel
                        control={<Checkbox />}
                        checked={subCampaigns[activeSc].status}
                        onChange={(_, checked) =>
                            handleChangeSc(activeSc, 'status')(checked)
                        }
                        label="Đang hoạt động"
                    />
                </Grid>
            </Grid>
            <Box>
                <Typography variant="h6">DANH SÁCH QUẢNG CÁO</Typography>
                <DataGrid
                    rows={rows}
                    columns={cols}
                    checkboxSelection
                    disableRowSelectionOnClick
                    disableColumnSelector
                    disableColumnMenu
                    disableColumnSorting
                    hideFooter
                    autoHeight
                    sx={{
                        'div[role="row"], div[role="columnheader"]': {
                            background: 'unset !important',
                        },
                    }}
                    onRowSelectionModelChange={(rows) => {
                        setSelectedRows(rows as any);
                    }}
                    rowSelectionModel={selectedRows}
                />
            </Box>
        </Box>
    );
};
