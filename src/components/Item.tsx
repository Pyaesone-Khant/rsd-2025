import { useNavigate } from "react-router-dom"

// icons
import { Delete as DeleteIcon, Alarm as TimeIcon, AccountCircle as UserIcon } from "@mui/icons-material"

// colors
import { green } from "@mui/material/colors"

// components
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material"
import { PostProps } from "@types/types"


type PropsType = {
    item: PostProps
    onRemove: (id: number) => void,
}

const Item = ({ item, onRemove }: PropsType) => {

    const { id, user, content, primary } = item;
    const navigate = useNavigate();

    return (
        <Card sx={{ mb: 2 }} >
            {primary && <Box sx={{ height: 50, bgcolor: green[500] }} />}
            <CardContent onClick={() => navigate(`/comments/${id}`)} >
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1,
                    }} >
                        <TimeIcon fontSize="small" color="success" />
                        <Typography variant="caption" sx={{ color: green[500] }} >
                            A few second ago
                        </Typography>
                    </Box>
                    <IconButton size="small" onClick={(e) => {
                        onRemove(id)
                        e.stopPropagation()
                    }} >
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Box>
                <Typography sx={{ my: 3 }} >
                    {content}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1,
                    }}>
                    <UserIcon
                        fontSize="medium"
                        color="info"
                    />
                    <Typography variant="body1">{user.name}</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default Item
