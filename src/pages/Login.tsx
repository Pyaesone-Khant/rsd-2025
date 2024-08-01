import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import { Alert, Box, Button, TextField, Typography } from '@mui/material';

// context
import { useApp } from '@src/ThemedApp';

const Login = () => {

    const { setAuth, setAlert } = useApp();
    const navigate = useNavigate();

    const onFinish = (e: FormEvent) => {
        e.preventDefault();
        setAuth(true);
        setAlert({ alertType: "success", alertMsg: "Login success!" })
        navigate('/');
    }

    return (
        <Box>
            <Typography variant="h3" >Login</Typography>
            <Alert severity='warning' sx={{ mt: 2 }} > All fields required! </Alert>

            <form onSubmit={onFinish} >
                <Box sx={{ display: 'flex', flexDirection: "column", gap: 2, mt: 2 }} >
                    <TextField placeholder='Username' fullWidth />
                    <TextField placeholder='Password' type='password' fullWidth />
                    <Button type='submit' variant='contained' size='large' fullWidth >
                        Login
                    </Button>
                </Box>
            </form>

        </Box>
    )
}

export default Login
