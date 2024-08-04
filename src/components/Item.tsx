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
import { useApp } from "@src/ThemedApp"
import { formatRelative } from "date-fns"
import React from "react"
import LikeButton from "./LikeButton"


type PropsType = {
    item: PostProps | CommentProps
    onRemove: (id: number) => void,
    primary?: boolean,
    comment?: boolean
}

const Item = ({ item, onRemove, primary, comment }: PropsType) => {

    const {auth} = useApp()
    const { id, user, content, created } = item;
    const navigate = useNavigate();

    const isAuthor = user.id == auth?.id

    return (
        <Card sx={{ mb: 2 }} >
            {primary && <Box sx={{ height: 50, bgcolor: green[500] }} />}
            <CardContent onClick={() => {
                if (comment) return false;
                navigate(`/comments/${id}`)
            }} sx={{ cursor: comment ? "auto" : "pointer", bgcolor: "banner" }} >
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
                    {
                        isAuthor && <IconButton size="small" onClick={(e: React.MouseEvent<HTMLButtonElement | MouseEvent>) => {
                            onRemove(id)
                            e.stopPropagation()
                        }} >
                            <DeleteIcon fontSize="inherit" color="error" />
                        </IconButton>
                    }
                </Box>
                <Typography sx={{ my: 3 }} >
                    {content}
                </Typography>
               <Box sx={{
                     display: "flex",
                     flexDirection: "row",
                     justifyContent: "space-between",
                     alignItems: "center"
               }} >
               <Box
                onClick={(e: React.MouseEvent) => {
                    navigate(`/profile/${user.id}`);
                    e.stopPropagation();
                }}
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
                <LikeButton item={item} comment={comment} />
               </Box>
            </CardContent>
        </Card>
    )
}

export default Item
