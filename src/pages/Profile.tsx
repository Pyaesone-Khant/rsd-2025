
// colors
import { pink } from '@mui/material/colors'

// components
import { Alert, Avatar, Box, Typography } from '@mui/material'
import { Item } from '@src/components'
import FollowButton from '@src/components/FollowButton'
import { fetchUser } from '@src/libs/fetcher'
import { PostProps, UserProps } from '@typings/types'
import { QueryKey, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

const Profile = () => {
    const { id } = useParams();
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
                gap: 1,
            }}>
                <Avatar sx={{ width: 100, height: 100, bgcolor: pink[500] }} />
                <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 1 }} >
                    <Typography variant='h6'>{user?.name}</Typography>
                    <Typography sx={{ fontSize: "0.8em", color: "text.primary" }}>
                        {user?.bio}
                    </Typography>
                    <FollowButton user={user!} />
                </Box>
            </Box>
            {
                user?.posts?.map((post: PostProps) => <Item key={post.id} item={post} onRemove={() => { }} />)
            }
        </Box>
    )
}

export default Profile
