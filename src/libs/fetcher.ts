import { CreateUserProps } from "@typings/types";

const api = import.meta.env.VITE_API;

export async function register(data: CreateUserProps) {
    const res = await fetch(`${api}/auth/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "Application/json",
        }
    });

    if (res.ok) {
        return res.json();
    }

    throw new Error("Error: Check Network log!");
}


export async function login(payload: { username: string, password: string }) {
    const res = await fetch(`${api}/auth/login`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json"
        }
    });

    if (res.ok) {
        return res.json();
    }

    throw new Error("Incorrect username or password!")
}

function getToken() {
    return localStorage.getItem("yaychaToken")
}

export async function fetchUser(id: string) {
    const token = getToken();
    const res = await fetch(`${api}/users/${id}`, {
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Authorization": `Bearer ${token}`
        }
    })

    return res.json();
}

export async function fetchVerify() {
    const token = getToken();

    const res = await fetch(`${api}/users/verify`, {
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Authorization": `Bearer ${token}`
        }
    })

    if (res.ok) {
        return res.json();
    }

    return false;
}

export async function fetchPosts() {
    const res = await fetch(`${api}/posts`, {
        headers: {
            "ngrok-skip-browser-warning": "69420",
        }
    });
    return res.json();
}

export async function fetchPost(id: number) {
    const res = await fetch(`${api}/posts/${id}`, {
        headers: {
            "ngrok-skip-browser-warning": "69420",
        }
    }
    );
    return res.json();
}

export async function postPost(content: string) {
    const token = getToken();

    const res = await fetch(`${api}/posts`, {
        method: "POST",
        body: JSON.stringify({ content }),
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if (res.ok) {
        return res.json();
    }

    throw new Error("Error: Check Network Log!")
}

export async function deletePost(id: number) {
    const token = getToken();

    const res = await fetch(`${api}/posts/${id}`, {
        method: "DELETE",
        headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${token}`
        }
    });

    return res.json()
}

export async function postComment(data: { content: string, postId: number }) {
    const token = getToken();

    const res = await fetch(`${api}/comments`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })

    if (res.ok) {
        return res.json();
    }

    throw new Error("Error: Check Network Log!")
}

export async function deleteComment(id: number) {
    const token = getToken();

    const res = await fetch(`${api}/comments/${id}`, {
        method: "DELETE",
        headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${token}`
        }
    });

    return res.json();
}

export async function postPostLike(id: number) {
    const token = getToken();

    const res = await fetch(`${api}/posts/${id}/like`, {
        method: "POST",
        headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${token}`
        }
    })
    return res.json()
}

export async function postCommentLike(id: number) {
    const token = getToken();

    const res = await fetch(`${api}/comments/${id}/like`, {
        method: "POST",
        headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${token}`
        }
    });

    return res.json();
}

export async function deletePostLike(id: number) {
    const token = getToken();

    const res = await fetch(`${api}/posts/${id}/unlike`, {
        method: "DELETE",
        headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${token}`
        }
    })

    return res.json();
}

export async function deleteCommentLike(id: number) {
    const token = getToken();

    const res = await fetch(`${api}/comments/${id}/unlike`, {
        method: "DELETE",
        headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${token}`
        }
    })

    return res.json();
}

export async function fetchPostLikes(postId: string) {
    const res = await fetch(`${api}/posts/${postId}/likes`, {
        headers: {
            "ngrok-skip-browser-warning": "69420",
        }
    });
    return res.json();
}

export async function fetchCommentLikes(commentId: string) {
    const res = await fetch(`${api}/comments/${commentId}/likes`, {
        headers: {
            "ngrok-skip-browser-warning": "69420",
        }
    });
    return res.json();
}

export async function postFollow(id: number) {
    const token = getToken();

    const res = await fetch(`${api}/users/${id}/follow`, {
        method: "POST",
        headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${token}`
        }
    });

    return res.json();
}

export async function deleteFollow(id: number) {
    const token = getToken();

    const res = await fetch(`${api}/users/${id}/unfollow`, {
        method: "DELETE",
        headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${token}`
        }
    });

    return res.json();
}

export async function fetchSearch(q: string) {
    const res = await fetch(`${api}/search?q=${q}`, {
        headers: {
            "ngrok-skip-browser-warning": "69420",
        }
    });
    return res.json();
}

export async function fetchFollowingPosts() {
    const token = getToken();
    const res = await fetch(`${api}/users/following/posts`, {
        headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${token}`
        }
    });

    return res.json();
}

export async function fetchFollowers(id: string) {
    const res = await fetch(`${api}/users/${id}/followers`, {
        headers: {
            "ngrok-skip-browser-warning": "69420",
        }
    });
    return res.json();
}

export async function fetchFollowing(id: string) {
    const res = await fetch(`${api}/users/${id}/following`, {
        headers: {
            "ngrok-skip-browser-warning": "69420",
        }
    });
    return res.json();
}

export async function fetchNotis() {
    const token = getToken();
    const res = await fetch(`${api}/notis`, {
        headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${token}`
        }
    });

    return res.json();
}

export async function putAllNotisRead() {
    const token = getToken();

    const res = await fetch(`${api}/notis/read`, {
        method: "PUT",
        headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${token}`
        }
    });

    return res.json();
}

export async function putNotiRead(id: number) {
    const token = getToken();

    const res = await fetch(`${api}/notis/${id}/read`, {
        method: "PUT",
        headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${token}`
        }
    })

    return res.json();
}