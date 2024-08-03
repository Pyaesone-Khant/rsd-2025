export interface PostProps {
    id: number;
    content: string;
    name: string;
    userId: number
    user: UserProps
    comments?: CommentProps[]
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
}

export interface CreateUserProps{
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
}