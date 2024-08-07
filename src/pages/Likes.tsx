import { useParams } from 'react-router-dom';

// types
import { CommentLikeProps, PostLikeProps, UserProps } from '@typings/types';

// components
import { Alert, Box } from '@mui/material';
import { UserList } from '@src/components';

// apis
import { fetchCommentLikes, fetchPostLikes } from '@src/libs/fetcher';

// react-query
import { QueryKey, useQuery } from 'react-query';

const Likes = () => {

    const { id, type } = useParams();

    const { data, isLoading, isError, error } = useQuery<unknown, Error, PostLikeProps[] | CommentLikeProps[], QueryKey>(["users", id, type], () => {
        if (type == "comment") {
            return fetchCommentLikes(id as string);
        } else {
            return fetchPostLikes(id as string);
        }
    })

    const users = data?.map(item => item.user);

    if (isError) {
        return (
            <Box>
                <Alert severity='warning' >{error.message}</Alert>
            </Box>
        )
    }

    if (isLoading) {
        return <Box sx={{ textAlign: "center" }}> Loading . . . </Box>
    }

    return (
        <Box>
            <UserList title='Likes' data={users as UserProps[]} />
        </Box>
    )
}

export default Likes
