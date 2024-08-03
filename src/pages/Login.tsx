import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// types
import { UserProps } from '@typings/types';

// components
import { Alert, Box, Button, TextField, Typography } from '@mui/material';

// context
import { useApp } from '@src/ThemedApp';

// api
import { login } from '@src/libs/fetcher';

// react-query
import { useMutation } from 'react-query';

const Login = () => {

    const usernameInput = useRef<HTMLInputElement>();
    const passwordInput = useRef<HTMLInputElement>();

    const [error, setError] = useState<string | null>(null);

    const { setAuth, setAlert } = useApp();
    const navigate = useNavigate();

    const onFinish = (e: FormEvent) => {
        e.preventDefault();

        const username = usernameInput.current && usernameInput.current.value;
        const password = passwordInput.current && passwordInput.current.value;

        if(!username || !password){
            setError("Username and password is required!")
            return false;
        }
        onLogin.mutate({username, password})
    }

    const onLogin = useMutation(async (data: {username: string, password: string}) => login(data), {
        onError: async () => {
            setError("Incorrect username or password!")
        },
        onSuccess: async (result: {token: string, user: UserProps}) => {
            setAuth(result.user);
            localStorage.setItem("yaychaToken", result.token)
            navigate("/")
            setAlert({alertMsg: "Login Successful!", alertType: "success"})
        }
    })

    return (
        <Box>
            <Typography variant="h3" >Login</Typography>
            {
                error && <Alert severity='warning' sx={{ mt: 2 }} > {error} </Alert>
            }

            <form onSubmit={onFinish} >
                <Box sx={{ display: 'flex', flexDirection: "column", gap: 2, mt: 2 }} >
                    <TextField inputRef={usernameInput} placeholder='Username' fullWidth />
                    <TextField inputRef={passwordInput} placeholder='Password' type='password' fullWidth />
                    <Button type='submit' variant='contained' size='large' fullWidth >
                        Login
                    </Button>
                </Box>
            </form>

        </Box>
    )
}

export default Login
