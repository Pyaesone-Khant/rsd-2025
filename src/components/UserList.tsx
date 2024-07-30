import React from 'react'

// components
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'

const UserList = ({ title }: { title: string }) => {
    return (
        <Box>
            <Typography variant='h4'>{title}</Typography>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar />
                    </ListItemAvatar>
                    <ListItemText primary="VNL @mario"
                        secondary="VNL's profile bio" />
                </ListItem>
            </List>
        </Box>
    )
}

export default UserList
