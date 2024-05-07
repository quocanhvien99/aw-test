import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, GlobalStyles, SxProps, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { PaperAw } from './components/Paper';
import { Campaign } from './components/Campaign';
import { SubCampaign } from './components/SubCampaign';
import { useApp } from './context';

const globalStyles = (
    <GlobalStyles
        styles={(theme) => ({
            body: {
                backgroundColor: theme.palette.grey[900],
                padding: 24,
            },
        })}
    />
);

function App() {
    const [activeTab, setActiveTab] = useState(0);

    const { handleSubmit } = useApp();

    return (
        <>
            {globalStyles}
            <PaperAw>
                <Box sx={headerSx}>
                    <Tabs
                        value={activeTab}
                        onChange={(_, value) => setActiveTab(value)}
                        sx={tabSx}
                    >
                        <Tab label="Thông tin" value={0} disableRipple />
                        <Tab label="Chiến dịch con" value={1} disableRipple />
                    </Tabs>
                    <Button
                        variant="contained"
                        color="teal"
                        sx={submitSx}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Box>
                {!activeTab ? <Campaign /> : <SubCampaign />}
            </PaperAw>
        </>
    );
}

export default App;

const tabSx: SxProps = {
    minHeight: 'unset',
    alignSelf: 'flex-end',
    'button, .Mui-selected': {
        color: 'white !important',
        padding: '10px 16px',
        minHeight: 'unset',
    },
    '.MuiTabs-indicator': {
        backgroundColor: 'white',
    },
};

const headerSx: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid',
    borderColor: 'grey.700',
};

const submitSx: SxProps = {
    height: 30,
    margin: '8px 16px',
};
