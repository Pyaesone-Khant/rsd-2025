import { useNavigate } from 'react-router-dom';

// icons
import { ArrowLeftOutlined } from '@mui/icons-material';

// types
import { UserProps } from '@typings/types';

// components
import { Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';
import FollowButton from './FollowButton';

const UserList = ({ title, data }: { title: string, data: UserProps[] }) => {

    const navigate = useNavigate();

    return (
        <Box>
            <Button size='small' variant='text' onClick={() => navigate(-1)} sx={{ mb: 2 }}  >
                <ArrowLeftOutlined /> Back
            </Button>
            <Typography variant='h4' sx={{ textAlign: "center" }}>{title}</Typography>
            <List>
                {
                    data?.map(user => {
                        return (
                            <ListItem key={user.id} >
                                <ListItemButton onClick={() => navigate(`/profile/${user.id}`)} >
                                    <ListItemAvatar>
                                        <Avatar />
                                    </ListItemAvatar>
                                    <ListItemText primary={user.name}
                                        secondary={user?.bio} />
                                    <ListItemSecondaryAction>
                                        <FollowButton user={user} />
                                    </ListItemSecondaryAction>
                                </ListItemButton>
                            </ListItem>
                        )
                    })
                }
            </List>
        </Box>
    )
}

export default UserList
