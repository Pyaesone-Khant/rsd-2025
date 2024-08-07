import { useParams } from "react-router-dom";
// icons

// types
import { UserProps } from "@typings/types";

// components
import { Alert, Box } from "@mui/material";
import { UserList } from "@src/components";

// context
import { useApp } from "@src/ThemedApp";

// apis
import { fetchFollowing, fetchUser } from "@src/libs/fetcher";

// react-query
import { QueryKey, useQuery } from "react-query";

const Following = () => {

    const { id } = useParams();
    const { auth } = useApp();
    const { data, isLoading, isError, error } = useQuery<unknown, Error, UserProps[], QueryKey>("following", async () => fetchFollowing(id as string));

    const { data: user } = useQuery<unknown, Error, UserProps, QueryKey>("user", () => fetchUser(id as string));
    const isMe = auth?.id == id;
    const title = isMe ? "Your Following" : `${user?.username}'s Following`;

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
            <UserList title={title} data={data as UserProps[]} />
        </Box>
    )
}

export default Following
