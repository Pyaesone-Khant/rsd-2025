// types
import { PostProps } from '@typings/types'

// components
import { Alert, Box } from '@mui/material'
import { Form, Item } from '@src/components'

// context
import { queryClient, useApp } from '@src/ThemedApp'

// react-query
import { postPost } from '@src/libs/fetcher'
import { QueryKey, useMutation, useQuery } from 'react-query'

const api = import.meta.env.VITE_API

const Home = () => {

    const { showForm, setShowForm, setAlert } = useApp()

    const { data, isLoading, error, isError } = useQuery<unknown, Error, PostProps[], QueryKey[]>({
        queryKey: ["posts"],
        queryFn: async () => {
            const res = await fetch(`${api}/posts`);
            return res.json();
        }
    })

    const addItem = useMutation(async (content: string) => postPost(content), {
        onSuccess: async (post: PostProps) => {
            await queryClient.cancelQueries("posts");
            await queryClient.setQueryData("posts", old => [post, ...old]);
            setAlert({alertMsg: "Post added successfully!", alertType: "success"})
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
                data?.map((item: PostProps) => <Item key={item.id} item={item} onRemove={removePost.mutate} />)
            }
        </Box>
    )
}

export default Home
