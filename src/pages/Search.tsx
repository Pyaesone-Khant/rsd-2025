import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// types
import { UserProps } from '@typings/types';

// components
import { Alert, Avatar, Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText, TextField } from '@mui/material';
import FollowButton from '@src/components/FollowButton';

// apis
import { fetchSearch } from '@src/libs/fetcher';

// hooks
import { useDebounce } from '@uidotdev/usehooks';

// react-query
import { QueryKey, useQuery } from 'react-query';

const Search = () => {

    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 500);

    const navigate = useNavigate();

    const { data, isLoading, isError, error } = useQuery<unknown, Error, UserProps[], QueryKey[]>(["search", debouncedQuery], () => {
        return fetchSearch(debouncedQuery)
    });

    if (isError) {
        return <Box>
            <Alert severity="warning" > {error.message} </Alert>
        </Box>
    }

    return (
        <Box>
            <TextField fullWidth variant="outlined" placeholder="Search User"
                onKeyUp={(e: React.KeyboardEvent) => {
                    setQuery((e.target as HTMLInputElement).value)
                }} />
            {
                isLoading ? (
                    <Box sx={{ textAlign: "center", mt: 4 }}>Loading...</Box>
                ) : (
                    <List>
                        {
                            data?.map((user: UserProps) => (
                                <ListItem key={user.id}>
                                    <ListItemButton onClick={() => navigate(`/profile/${user.id}`)} >
                                        <ListItemAvatar>
                                            <Avatar />
                                        </ListItemAvatar>
                                        <ListItemText primary={user.name}
                                            secondary={user.bio} />
                                        <ListItemSecondaryAction>
                                            <FollowButton user={user} />
                                        </ListItemSecondaryAction>
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </List>
                )
            }
        </Box>
    )
}

export default Search
