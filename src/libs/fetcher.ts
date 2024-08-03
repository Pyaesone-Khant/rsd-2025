import { CreateUserProps } from "@typings/types";

const api = import.meta.env.VITE_API;

export async function register(data: CreateUserProps){
    const res = await fetch(`${api}/auth/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "Application/json",
        }
    });

    if(res.ok){
        return res.json();
    }

    throw new Error("Error: Check Network log!");
}


export async function login(payload: {username: string, password: string}) {
    const res = await fetch(`${api}/auth/login`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if(res.ok){
        return res.json();
    }

    throw new Error("Incorrect username or password!")
}

function getToken(){
    return localStorage.getItem("yaychaToken")
}

export async function fetchUser(id: string){
    const token = getToken();
    const res = await fetch(`${api}/users/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return res.json();
}

export async function fetchVerify(){
    const token = getToken();

    const res = await fetch(`${api}/users/verify`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if(res.ok){
        return res.json();
    }

    return false;
}

export async function postPost(content: string){
    const token = getToken();

    const res = await fetch(`${api}/posts`, {
        method: "POST",
        body: JSON.stringify({content}),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if(res.ok){
        return res.json();
    }

    throw new Error("Error: Check Network Log!")
}

export async function postComment(data: {content: string, postId: number}){
    const token = getToken();

    const res = await fetch(`${api}/comments`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })

    if(res.ok){
        return res.json();
    }

    throw new Error("Error: Check Network Log!")
}
