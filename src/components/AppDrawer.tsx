import React, { ReactNode } from 'react';

import { Home as HomeIcon, Login as LoginIcon, Logout as LogoutIcon, Person as ProfileIcon, PersonAdd as RegisterIcon } from '@mui/icons-material';
import { Avatar, Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useApp } from '../ThemedApp';

const AppDrawer = () => {

    const { showDrawer, setShowDrawer, auth, setAuth } = useApp();

    return (
        <div>
            <Drawer open={showDrawer} onClose={() => setShowDrawer(false)} >
                <Box
                    sx={{
                        mb: 6,
                        width: 300,
                        height: 140,
                        bgcolor: "banner",
                        position: "relative",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 2,
                            alignItems: "center",
                            position: "absolute",
                            left: 20,
                            bottom: -30,
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 94,
                                height: 94,
                                color: "white",
                                background: deepPurple[500],
                            }}
                        />
                        <Typography sx={{ fontWeight: "bold" }} >
                            VNL
                        </Typography>
                    </Box>
                </Box>
                <List>
                    <MenuItem icon={<HomeIcon />} label='Home' />
                    <Divider />
                    {
                        auth && <>
                            <MenuItem icon={<ProfileIcon />} label='Profile' />
                            <MenuItem icon={<LogoutIcon color='error' />} label='Logout' event={() => setAuth(false)} />
                        </>
                    }
                    {
                        !auth && <>
                            <MenuItem icon={<RegisterIcon />} label='Register' />
                            <MenuItem icon={<LoginIcon />} label='Login' event={() => setAuth(true)} />
                        </>
                    }
                </List>
            </Drawer>
        </div>
    )
}

const MenuItem = ({ icon, label, event }: { icon: ReactNode, label: string, event?: () => void }) => {
    return <ListItem>
        <ListItemButton onClick={event} >
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText>
                {label}
            </ListItemText>
        </ListItemButton>
    </ListItem>
}

export default AppDrawer
