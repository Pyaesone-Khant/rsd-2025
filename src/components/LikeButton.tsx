import React from "react";
import { useNavigate } from "react-router-dom";

// icons
import { Favorite as LikedIcon, FavoriteBorder as LikeIcon } from "@mui/icons-material";

// types
import { CommentProps, PostProps } from "@typings/types";

// components
import { Button, ButtonGroup, IconButton } from "@mui/material";

// apis
import { deleteCommentLike, deletePostLike, postCommentLike, postPostLike } from "@src/libs/fetcher";

// context
import { queryClient, useApp } from "@src/ThemedApp";

// react-query
import { useMutation } from "react-query";


const LikeButton = ({ item, comment }: { item: PostProps | CommentProps, comment?: boolean }) => {

    const navigate = useNavigate();
    const { auth, setAlert } = useApp();

    function isLike() {
        if (!auth) return false;
        if (!item?.likes) return false;

        return item.likes.find(like => like.userId == auth.id)
    }

    const likePost = useMutation((id: number) => postPostLike(id), {
        onSuccess: async () => {
            await queryClient.refetchQueries("posts");
            await queryClient.refetchQueries("post");
            await queryClient.refetchQueries("comments");
            setAlert({ alertMsg: "Post liked!", alertType: "success" })

        }
    })

    const likeComment = useMutation((id: number) => postCommentLike(id), {
        onSuccess:  async () => {
            await queryClient.refetchQueries("comments")
            setAlert({ alertMsg: "Comment liked!", alertType: "success" })
        }
    })

    const unlikePost = useMutation((id: number) => deletePostLike(id), {
        onSuccess: async (data: { message: string }) => {
            await queryClient.refetchQueries("posts");
            await queryClient.refetchQueries("post");
            await queryClient.refetchQueries("comments");
            setAlert({ alertMsg: data.message, alertType: "success" })
        }
    })

    const unlikeComment = useMutation((id: number) => deleteCommentLike(id), {
        onSuccess: async (data: { message: string }) => {
            await queryClient.refetchQueries("comments")
            setAlert({ alertMsg: data.message, alertType: "success" })
        }
    })

    const onLike = (e: React.MouseEvent) => {
        if (comment) {
            likeComment.mutate(item.id)
        } else {
            likePost.mutate(item.id)
        }
        e.stopPropagation();
    }

    const onUnlike = (e: React.MouseEvent) => {
        if (comment) {
            unlikeComment.mutate(item.id)
        } else {
            unlikePost.mutate(item.id)
        }
        e.stopPropagation()
    }

    const onNavigate = (e: React.MouseEvent) => {
        if (comment) {
            navigate(`/likes/${item.id}/comment`)
        } else {
            navigate(`/likes/${item.id}/post`)
        }
        e.stopPropagation();
    }

    return (
        <>
            <ButtonGroup>
                {
                    isLike() ? (
                        <IconButton size="small" onClick={onUnlike} >
                            <LikedIcon fontSize="small" color="error" />
                        </IconButton>
                    ) : (
                        <IconButton size="small" onClick={onLike} >
                            <LikeIcon fontSize="small" color="error" />
                        </IconButton>
                    )
                }
                <Button onClick={onNavigate} sx={{ color: "text.fade" }} variant="text" size="small" >
                    {item.likes ? item.likes.length : 0}
                </Button>
            </ButtonGroup>
        </>
    )
}

export default LikeButton
