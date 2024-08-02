import { useNavigate } from "react-router-dom"

// icons
import { Delete as DeleteIcon, Alarm as TimeIcon, AccountCircle as UserIcon } from "@mui/icons-material"

// colors
import { green } from "@mui/material/colors"

// types
import { CommentProps, PostProps } from "@typings/types"

// components
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material"

// thrid-party
import { formatRelative } from "date-fns"


type PropsType = {
    item: PostProps | CommentProps
    onRemove: (id: number) => void,
    primary?: boolean,
    comment?: boolean
}

const Item = ({ item, onRemove, primary, comment }: PropsType) => {

    const { id, user, content, created } = item;
    const navigate = useNavigate();

    return (
        <Card sx={{ mb: 2 }} >
            {primary && <Box sx={{ height: 50, bgcolor: green[500] }} />}
            <CardContent onClick={() => {
                if (comment) return false;
                navigate(`/comments/${id}`)
            }} sx={{ cursor: comment ? "auto" : "pointer" }} >
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
                            {formatRelative(created, new Date())}
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
