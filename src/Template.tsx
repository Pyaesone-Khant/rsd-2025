
// components
import { Alert, AlertColor, Box, Container, Snackbar } from '@mui/material';
import { AppDrawer, Header } from '@src/components';
import { Outlet } from 'react-router-dom';

// context
import { useApp } from './ThemedApp';

const Template = () => {

    const { alert, setAlert } = useApp();

    return (
        <Box>
            <Header />
            <AppDrawer />
            <Snackbar
                open={Boolean(alert)}
                onClose={() => setAlert(null)}
                autoHideDuration={3000}
                anchorOrigin={{
                    horizontal: 'center',
                    vertical: 'top'
                }}>
                <Alert severity={alert?.alertType as AlertColor} >
                    {alert?.alertMsg}
                </Alert>
            </Snackbar>

            <Container maxWidth="sm" sx={{ my: 4 }} >
                <Outlet />
            </Container>
        </Box>
    )
}

export default Template
