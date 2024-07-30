import { Add as AddIcon, DarkMode as DarkModeIcon, LightMode as LightModeIcon, Menu as MenuIcon } from '@mui/icons-material';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useApp } from '../ThemedApp';

const Header = () => {

    const { showForm, setShowForm, mode, setMode, setShowDrawer } = useApp();

    const toggleMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light')
    }

    return (
        <AppBar position='sticky' >
            <Toolbar>
                <IconButton color='inherit' edge='start' onClick={() => setShowDrawer(true)} >
                    <MenuIcon />
                </IconButton>
                <Typography sx={{ flexGrow: 1, ml: 2 }} >Yaycha</Typography>
                <Box>
                    <IconButton
                        color='inherit'
                        onClick={() => setShowForm(!showForm)} >
                        <AddIcon />
                    </IconButton>
                    <IconButton color='inherit' edge='end' onClick={toggleMode} >
                        {
                            mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />
                        }
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
