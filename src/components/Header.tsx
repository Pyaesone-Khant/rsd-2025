import { Add as AddIcon, LightMode as LightModeIcon, Menu as MenuIcon } from '@mui/icons-material';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useApp } from '../ThemedApp';

const Header = () => {

    const { showForm, setShowForm } = useApp();

    return (
        <AppBar position='static' >
            <Toolbar>
                <IconButton color='inherit' edge='start' >
                    <MenuIcon />
                </IconButton>
                <Typography sx={{ flexGrow: 1, ml: 2 }} >Yaycha</Typography>
                <Box>
                    <IconButton
                        color='inherit'
                        onClick={() => setShowForm(!showForm)} >
                        <AddIcon />
                    </IconButton>
                    <IconButton color='inherit' edge='end' >
                        <LightModeIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
