export interface PostProps{
    id: number;
    content: string;
    name: string;
    userId: number
    user: UserProps
    comments?: CommentProps[]
    primary?: boolean
}

export interface UserProps{
    id: number
    name: string
    username: string
    bio?: string
    posts?: PostProps[]
    comments?: CommentProps[]
}

export interface CommentProps{
    id: number
    content: string
    userId: number
    postId: number
    user?: UserProps
    post?: PostProps
}