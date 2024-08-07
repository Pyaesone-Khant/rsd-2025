import { useNavigate } from "react-router-dom";

// icons
import { ArrowLeftOutlined, Comment as CommentIcon, Favorite as FavoriteIcon } from "@mui/icons-material";

// types
import { NotiProps } from "@typings/types";

// components
import { Alert, Avatar, Box, Button, Card, CardActionArea, CardContent, Typography } from "@mui/material";

// apis
import { fetchNotis, putAllNotisRead, putNotiRead } from "@src/libs/fetcher";

// context
import { queryClient, useApp } from "@src/ThemedApp";

// react-query
import { QueryKey, useMutation, useQuery } from "react-query";

// thrid-party
import { format } from "date-fns";

const Notis = () => {

    const navigate = useNavigate();
    const { auth } = useApp();

    const { data, isLoading, isError, error } = useQuery<unknown, Error, NotiProps[], QueryKey[]>(["notis", auth?.toString() ?? ""], fetchNotis)

    const readAllNotis = useMutation(putAllNotisRead, {
        onMutate: async () => {
            await queryClient.cancelQueries(["notis", auth?.toString() ?? ""])
            await queryClient.setQueryData(["notis", auth?.toString() ?? ""], old => {
                return old.map(noti => {
                    noti.read = true;
                    return noti;
                })
            })
        }
    })

    const readNoti = useMutation((id: number) => putNotiRead(id), {
        onMutate: async (id: number) => {
            console.log(id)
            await queryClient.cancelQueries(["notis", auth?.toString() ?? ""])
            await queryClient.setQueryData(["notis", auth?.toString() ?? ""], old => {
                return old.map(noti => {
                    if (noti.id == id) {
                        noti.read = true;
                    }
                    return noti;
                })
            })
        }
    })

    const noData = !isLoading && !isError && !data?.length;

    if (isError) {
        return <Box>
            <Alert>{error.message}</Alert>
        </Box>
    }

    if (isLoading) {
        return <Box sx={{ textAlign: "center" }}>
            Loading . . .
        </Box>
    }

    return (
        <Box>
            <Box sx={{ display: "flex", mb: 2, alignItems: "center", justifyContent: "space-between" }}>
                <Button size="small" variant="text" onClick={() => navigate(-1)} >
                    <ArrowLeftOutlined /> Back
                </Button>
                <Button size="small" variant="outlined" sx={{ borderRadius: 5 }} onClick={() => readAllNotis.mutate()}  >
                    Mark all as read
                </Button>
            </Box>

            {
                noData ? <Alert severity="info"> No notifications found! </Alert> : data?.map(noti => (<Card sx={{
                    mb: 2, opacity: noti.read ? 0.3 : 1
                }} key={noti.id} >
                    <CardActionArea onClick={() => {
                        readNoti.mutate(noti.id);
                        navigate(`/comments/${noti.postId}`)
                    }} >

                        <CardContent sx={{
                            display: "flex",
                            opacity: 1
                        }}>
                            {
                                noti.type === "comment" ? <CommentIcon color="success" /> : <FavoriteIcon color="error" />
                            }
                            <Box sx={{ ml: 3 }} >
                                <Avatar />
                                <Box sx={{ mt: 1 }} >
                                    <Typography component="span" sx={{ mr: 0.5 }} >
                                        <b> {noti.user.name} </b>
                                    </Typography>
                                    <Typography component="span" sx={{ mr: 0.5, color: "text.secondary" }} >
                                        {noti.content}
                                    </Typography>
                                    <Typography component="span" color="primary" >
                                        <small> {format(noti.created, "MMM dd, yyyy")} </small>
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>))
            }
        </Box>
    )
}

export default Notis
