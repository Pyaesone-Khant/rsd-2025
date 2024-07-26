import React, { FormEvent, useContext, useRef } from 'react';
import { AppContext } from '../ThemedApp';

const Form = ({ add }) => {

    const { mode } = useContext(AppContext)

    const contentRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const content = contentRef.current?.value;
        const name = nameRef.current?.value;

        if (!content || !name) {
            alert('Please fill all fields');
            return;
        }
        add({ content, name });
        (e.currentTarget as HTMLFormElement).reset();
    }

    return <form onSubmit={handleSubmit} style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: 10,
        borderRadius: 4,
        marginBottom: 20,
        background: mode === "dark" ? "#333" : "#def",
    }}>
        <input ref={contentRef} type="text" placeholder='Content' style={{ padding: 5 }} />
        <input ref={nameRef} type='text' placeholder='Name' style={{ padding: 5 }} />
        <button type='submit' style={{
            padding: 8,
            background: "#0d6efd",
            color: "white",
            border: "0 none"
        }} >
            Post
        </button>
    </form>
}

export default Form
