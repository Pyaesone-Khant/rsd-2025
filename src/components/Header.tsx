import { useNavigate } from 'react-router-dom';

// icons
import { Add as AddIcon, CloseOutlined as CloseIcon, DarkMode as DarkModeIcon, LightMode as LightModeIcon, Menu as MenuIcon, Notifications as NotiIcon, Search as SearchIcon } from '@mui/icons-material';

// types
import { NotiProps } from '@typings/types';

// components
import { AppBar, Badge, Box, IconButton, Toolbar, Typography } from '@mui/material';

// context
import { useApp } from '@src/ThemedApp';

// apis
import { fetchNotis } from '@src/libs/fetcher';

// react-query
import { QueryKey, useQuery } from 'react-query';

const Header = () => {

    const { showForm, setShowForm, mode, setMode, setShowDrawer, auth } = useApp();
    const navigate = useNavigate();

    const toggleMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light')
    }

    const { data, isLoading, isError } = useQuery<unknown, Error, NotiProps[], QueryKey[]>(["notis", auth?.toString() ?? ""], fetchNotis)

    function notiCount() {
        if (!auth) return 0;
        if (isLoading || isError) return 0;
        return data?.filter(noti => !noti.read).length;
    }

    return (
        <AppBar position='sticky' >
            <Toolbar>
                <IconButton color='inherit' edge='start' onClick={() => setShowDrawer(true)} >
                    <MenuIcon />
                </IconButton>
                <Typography sx={{ flexGrow: 1, ml: 2, cursor: "pointer" }} onClick={() => navigate("/")} >Yaycha</Typography>
                <Box>
                    {
                        auth && <IconButton
                            color='inherit'
                            onClick={() => setShowForm(!showForm)} >
                            {showForm ? <CloseIcon /> : <AddIcon />}
                        </IconButton>
                    }
                    <IconButton color="inherit" onClick={() => navigate("/search")} >
                        <SearchIcon />
                    </IconButton>
                    {
                        auth && <IconButton color="inherit" onClick={() => navigate("/notis")} >
                            <Badge color="error" badgeContent={notiCount()}>
                                <NotiIcon />
                            </Badge>
                        </IconButton>
                    }
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
