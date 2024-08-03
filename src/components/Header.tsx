import { useNavigate } from 'react-router-dom';

// icons
import { Add as AddIcon, CloseOutlined as CloseIcon, DarkMode as DarkModeIcon, LightMode as LightModeIcon, Menu as MenuIcon } from '@mui/icons-material';

// components
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';

// context
import { useApp } from '../ThemedApp';

const Header = () => {

    const { showForm, setShowForm, mode, setMode, setShowDrawer } = useApp();
    const navigate = useNavigate();

    const toggleMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light')
    }

    return (
        <AppBar position='sticky' >
            <Toolbar>
                <IconButton color='inherit' edge='start' onClick={() => setShowDrawer(true)} >
                    <MenuIcon />
                </IconButton>
                <Typography sx={{ flexGrow: 1, ml: 2, cursor: "pointer" }} onClick={() => navigate("/")} >Yaycha</Typography>
                <Box>
                    <IconButton
                        color='inherit'
                        onClick={() => setShowForm(!showForm)} >
                        { showForm ? <CloseIcon/> : <AddIcon/> }
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
