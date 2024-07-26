import { Delete as DeleteIcon, Alarm as TimeIcon, AccountCircle as UserIcon } from "@mui/icons-material"
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material"
import React from "react"

import { green } from "@mui/material/colors"

type PropsType = {
    item: {
        id: number
        content: string
        name: string
    }
    onRemove
}

const Item = ({ item, onRemove }: PropsType) => {

    const { id, name, content } = item;

    return (
        <Card sx={{ mb: 2 }} >
            <CardContent>
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
                    <IconButton size="small" onClick={() => onRemove(id)} >
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
                    <Typography variant="body1">{name}</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default Item
