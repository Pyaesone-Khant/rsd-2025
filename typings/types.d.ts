export interface PostProps {
    id: number;
    content: string;
    name: string;
    userId: number
    user: UserProps
    comments?: CommentProps[]
    likes: PostLikeProps[]
    created: string
}

export interface UserProps {
    id: number
    name: string
    username: string
    password?: string
    bio?: string
    posts?: PostProps[]
    comments?: CommentProps[]
    postLikes: PostLikeProps[]
    commentLikes: CommentLikeProps[]
    followers?: FollowProps[]
    following?: FollowProps[]
}

export interface CreateUserProps {
    name: string
    username: string
    password: string
    bio?: string
}

export interface CommentProps {
    id: number
    content: string
    userId: number
    postId: number
    user: UserProps
    post?: PostProps
    created: string
    likes: CommentLikeProps[]
}

export interface PostLikeProps {
    id: number
    userId: number
    postId: number
    user: UserProps
    post: PostProps
    created: string
}

export interface CommentLikeProps {
    id: number
    userId: number
    commentId: number
    user: UserProps
    comment: CommentProps
    created: string
}

export interface FollowProps {
    id: number
    followers: UserProps
    followerId: number
    following: UserProps
    followingId: number
}