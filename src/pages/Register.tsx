import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import { Alert, Box, Button, TextField, Typography } from '@mui/material';


const Register = () => {

    const navigate = useNavigate();

    const onFinish = (e: FormEvent) => {
        e.preventDefault();
        navigate('/login');
    }

    return (
        <Box>
            <Typography variant="h3" >Register</Typography>
            <Alert severity='warning' sx={{ mt: 2 }} > All fields required! </Alert>
            <form onSubmit={onFinish} >
                <Box sx={{ display: 'flex', flexDirection: "column", gap: 2, mt: 2 }} >
                    <TextField placeholder='Name' fullWidth />
                    <TextField placeholder='Username' fullWidth />
                    <TextField placeholder='Bio' fullWidth />
                    <TextField placeholder='Password' type='password' fullWidth />
                    <Button type='submit' variant='contained' size="large" fullWidth >
                        Register
                    </Button>
                </Box>
            </form>

        </Box>
    )
}

export default Register
