import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// types
import { CreateUserProps } from '@typings/types';

// components
import { Alert, Box, Button, TextField, Typography } from '@mui/material';

// context
import { useApp } from '@src/ThemedApp';

// api
import { register } from '@src/libs/fetcher';

// react-query
import { useMutation } from 'react-query';


const Register = () => {

    const {setAlert} = useApp();

    const nameInput = useRef<HTMLInputElement>();
    const usernameInput = useRef<HTMLInputElement>();
    const passwordInput = useRef<HTMLInputElement>();
    const bioInput = useRef<HTMLInputElement>();

    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const onFinish = (e: FormEvent) => {
        e.preventDefault();
        const name = nameInput.current && nameInput.current.value;
        const username = usernameInput.current && usernameInput.current.value;
        const password = passwordInput.current && passwordInput.current.value;
        const bio = bioInput.current && bioInput.current.value;

        if(!name || !username || !password){
            setError('All fields required!');
            return false;
        }

        onRegister.mutate({name, username, bio, password})
    }

    const onRegister = useMutation(async (data: CreateUserProps) => register(data), {
        onError: async () => {
            setError("Cannot create account!");
        },
        onSuccess: async () => {
            setAlert({alertMsg: "Account created!", alertType: "success"});
            navigate('/login');
        }
    })

    return (
        <Box>
            <Typography variant="h3" >Register</Typography>

        {error && 
            <Alert severity='warning' sx={{ mt: 2 }} > {error} </Alert>
        }

            <form onSubmit={onFinish} >
                <Box sx={{ display: 'flex', flexDirection: "column", gap: 2, mt: 2 }} >
                    <TextField inputRef={nameInput} placeholder='Name' fullWidth />
                    <TextField inputRef={usernameInput} placeholder='Username' fullWidth />
                    <TextField inputRef={passwordInput} placeholder='Password' type='password' fullWidth />
                    <TextField inputRef={bioInput} placeholder='Bio' fullWidth />
                    <Button type='submit' variant='contained' size="large" fullWidth >
                        Register
                    </Button>
                </Box>
            </form>

        </Box>
    )
}

export default Register
