import { Button } from "@mui/material";
import { deleteFollow, postFollow } from "@src/libs/fetcher";
import { queryClient, useApp } from "@src/ThemedApp";
import { UserProps } from "@typings/types";
import React from "react";
import { useMutation } from "react-query";

const FollowButton = ({ user }: { user: UserProps }) => {

    const { auth } = useApp();

    const onFollow = useMutation((id: number) => postFollow(id), {
        onSuccess: async () => {
            await queryClient.refetchQueries("users")
            await queryClient.refetchQueries("user")
            await queryClient.refetchQueries("search")
        }
    })

    const onUnfollow = useMutation((id: number) => deleteFollow(id), {
        onSuccess: async () => {
            await queryClient.refetchQueries("users")
            await queryClient.refetchQueries("user")
            await queryClient.refetchQueries("search")
        }
    })

    function isFollowing() {
        return user.following?.find(item => item.followerId == auth?.id)
    }

    const variant = isFollowing() ? "outlined" : "contained";
    const content = isFollowing() ? "Following" : "Follow";

    const handleClick = (e: React.MouseEvent) => {
        if (isFollowing()) {
            onUnfollow.mutate(user.id)
        } else {
            onFollow.mutate(user.id)
        }
        e.stopPropagation();
    }

    if (!auth) return <></>;

    return auth.id == user.id ? (<></>) : (
        <Button size="small" variant={variant} sx={{ borderRadius: 5 }} onClick={handleClick} >
            {content}
        </Button>
    )
}

export default FollowButton
