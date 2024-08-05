import { useNavigate } from 'react-router-dom';

// types
import { CommentLikeProps, PostLikeProps } from '@typings/types';

// components
import { ArrowLeftOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';
import FollowButton from './FollowButton';

const UserList = ({ title, data }: { title: string, data: PostLikeProps[] | CommentLikeProps[] }) => {

    const navigate = useNavigate();

    return (
        <Box>
            <Button size='small' variant='text' onClick={() => navigate(-1)} sx={{ mb: 2 }}  >
                <ArrowLeftOutlined /> Back
            </Button>
            <Typography variant='h4' sx={{ textAlign: "center" }}>{title}</Typography>
            <List>
                {
                    data?.map(item => {
                        return (
                            <ListItem key={item.id} >
                                <ListItemButton onClick={() => navigate(`/profile/${item.userId}`)} >

                                    <ListItemAvatar>
                                        <Avatar />
                                    </ListItemAvatar>
                                    <ListItemText primary={item.user.name}
                                        secondary={item.user?.bio} />
                                    <ListItemSecondaryAction>
                                        <FollowButton user={item.user} />
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
