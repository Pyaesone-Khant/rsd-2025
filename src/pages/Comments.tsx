import { useNavigate, useParams } from 'react-router-dom';

// types
import { CommentProps, PostProps } from '@typings/types';

// components
import { Alert, Box, Button, TextField } from '@mui/material';
import { Item } from '@src/components';

// context
import { queryClient, useApp } from '@src/ThemedApp';

// react-query
import { useMutation, useQuery } from 'react-query';

const api = import.meta.env.VITE_API

const Comments = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const { setAlert } = useApp();

    const { data: post, isLoading, error, isError } = useQuery<PostProps, Error>(
        "comments",
        async () => {
            const res = await fetch(`${api}/posts/${id}`);
            return res.json();
        }
    )

    const removePost = useMutation(
        async (id: number) => {
            await fetch(`${api}/posts/${id}`, {
                method: "DELETE"
            })
            navigate("/"),
                setAlert({ alertMsg: "Post Deleted", alertType: "success" })
        },
    );

    const removeComment = useMutation(
        async (id: number) => {
            await fetch(`${api}/comments/${id}`, {
                method: "DELETE"
            })
        },
        {
            onMutate: (id: number) => {
                queryClient.cancelQueries("comments");
                queryClient.setQueryData("comments", (old: PostProps | undefined) => {
                    if (old) {
                        old.comments = old.comments?.filter((comment) => comment.id !== id);
                        return old;
                    }
                    return undefined;
                })
                setAlert({ alertMsg: "Comment Deleted", alertType: "success" })
            }
        }
    )

    if (isError) {
        return <Box>
            <Alert severity='warning'> {error?.message} </Alert>
        </Box>
    }

    if (isLoading) {
        return <Box sx={{ textAlign: "center" }} >
            Loading . . .
        </Box>
    }


    return (
        <Box>
            <Item item={post!} onRemove={() => post?.id && removePost.mutate(post.id)} primary />
            {
                post?.comments?.map((comment: CommentProps) => <Item key={comment.id} item={comment} onRemove={() => removeComment.mutate(comment.id)} comment />)
            }
            <form>
                <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 3, }}>
                    <TextField multiline placeholder="Your Comment" />
                    <Button type="submit" variant="contained">Reply</Button>
                </Box>
            </form>
        </Box>
    )
}

export default Comments
