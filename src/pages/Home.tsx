import { useState } from 'react'
// types
import { PostProps } from '@typings/types'

// components
import { Alert, Box, Button, Typography } from '@mui/material'
import { Form, Item } from '@src/components'

// context
import { queryClient, useApp } from '@src/ThemedApp'

// apis
import { fetchFollowingPosts, fetchPosts, postPost } from '@src/libs/fetcher'

// react-query
import { QueryKey, useMutation, useQuery } from 'react-query'

const api = import.meta.env.VITE_API

const Home = () => {

    const [showLatest, setShowLatest] = useState(true);
    const { showForm, setAlert, auth } = useApp()

    // all posts
    const { data, isLoading, error, isError } = useQuery<unknown, Error, PostProps[], QueryKey>(["posts", showLatest], () => {
        if (showLatest) return fetchPosts();
        else return fetchFollowingPosts();
    })

    const addItem = useMutation(async (content: string) => postPost(content), {
        onSuccess: async (post: PostProps) => {
            await queryClient.cancelQueries("posts");
            await queryClient.setQueryData(["posts", showLatest], old => [post, ...old]);
            setAlert({ alertMsg: "Post added successfully!", alertType: "success" })
        }
    })

    const removePost = useMutation(async (id: number) => {
        const res = await fetch(`${api}/posts/${id}`, { method: "DELETE" });
        return res.json();
    },
        {
            onMutate: id => {
                queryClient.cancelQueries("posts");
                queryClient.setQueryData("posts", (old: unknown[] | undefined) => (old || []).filter((item) => item?.id !== id));
                setAlert({ alertType: "success", alertMsg: "Post deleted!" })
            }
        }
    )

    if (isError) return (
        <Box>
            <Alert severity="warning">Error Fetching Data! || {error?.message}</Alert>
        </Box>
    )

    if (isLoading) return (
        <Box sx={{ textAlign: "center" }} >
            Loading...
        </Box>
    )

    return (
        <Box>
            {
                showForm && <Form add={addItem.mutate} />
            }

            {
                auth && (<Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 1
                }} >
                    <Button
                        disabled={showLatest}
                        onClick={() => setShowLatest(true)}
                    >
                        Latest
                    </Button>
                    <Typography sx={{
                        color: "text.fade",
                        fontSize: 15
                    }} >
                        |
                    </Typography>
                    <Button
                        disabled={!showLatest}
                        onClick={() => setShowLatest(false)}
                    >
                        Following
                    </Button>
                </Box>)
            }

            {
                data?.length === 0 ? <Alert severity="info" sx={{ textAlign: "center" }}>No Posts Found!</Alert> : data?.map((item: PostProps) => <Item key={item.id} item={item} onRemove={removePost.mutate} />)
            }
        </Box>
    )
}

export default Home
