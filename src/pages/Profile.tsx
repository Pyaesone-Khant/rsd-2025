
// colors
import { pink } from '@mui/material/colors'

// components
import { Avatar, Box, Typography } from '@mui/material'
import { Item } from '@src/components'

const Profile = () => {

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
                <Box sx={{ textAlign: "center" }} >
                    <Typography>VNL</Typography>
                    <Typography sx={{ fontSize: "0.8em", color: "text.primary" }}>
                        VNL's profile bio content is here!
                    </Typography>
                </Box>
            </Box>
            <Item key={1} onRemove={() => { }} item={{
                id: 1,
                content: "Keep Smiling! Your smile makes all the darkness fade away!",
                name: "VNL"
            }} />
        </Box>
    )
}

export default Profile
