import { useNavigate, useParams } from 'react-router-dom'

// colors
import { pink } from '@mui/material/colors'

// types
import { PostProps, UserProps } from '@typings/types'

// components
import { Alert, Avatar, Box, Button, Typography } from '@mui/material'
import { Item } from '@src/components'
import FollowButton from '@src/components/FollowButton'

// apis
import { fetchUser } from '@src/libs/fetcher'

// react-query
import { QueryKey, useQuery } from 'react-query'

const Profile = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: user, isLoading, isError, error } = useQuery<UserProps, Error, UserProps, QueryKey>(["user", id], async () => fetchUser(id as string));

    if (isError) {
        return <Box>
            <Alert severity="warning" >{error.message}</Alert>
        </Box>
    }

    if (isLoading) {
        return <Box sx={{ textAlign: "center" }} >Loading . . .</Box>
    }

    return (
        <Box>
            <Box sx={{ bgcolor: "banner", height: 150, borderRadius: 4 }} />
            <Box sx={{
                mb: 4,
                marginTop: "-60px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
            }}>
                <Avatar sx={{ width: 100, height: 100, bgcolor: pink[500] }} />
                <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 1 }} >
                    <Typography variant='h6'>{user?.name}</Typography>
                    <Typography sx={{ fontSize: "0.8em", color: "text.primary" }}>
                        {user?.bio}
                    </Typography>
                    <FollowButton user={user!} />
                </Box>

                <Box sx={{
                    display: "flex",
                    alignItems: "stretch",
                    justifyContent: "center",
                    gap: 1
                }} >
                    <Button sx={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: 120
                    }} >
                        <Typography variant='h6'> {user?.posts?.length || 0} </Typography>
                        <Typography variant="overline" > Posts </Typography>
                    </Button>
                    <Button sx={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: 120
                    }} onClick={() => navigate(`/profile/${user?.id}/followers`)}  >
                        <Typography variant='h6'> {user?.followers?.length || 0} </Typography>
                        <Typography variant="overline" > Followers </Typography>
                    </Button>
                    <Button sx={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: 120
                    }} onClick={() => navigate(`/profile/${user?.id}/following`)} >
                        <Typography variant='h6'> {user?.following?.length || 0} </Typography>
                        <Typography variant="overline" > Following </Typography>
                    </Button>
                </Box>

            </Box>
            {
                user?.posts?.map((post: PostProps) => <Item key={post.id} item={post} onRemove={() => { }} />)
            }
        </Box>
    )
}

export default Profile
