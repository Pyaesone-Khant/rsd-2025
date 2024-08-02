import { FormEvent, useRef } from 'react';

// components
import { Box, Button, TextField } from '@mui/material';

type PropsType = {
    add: (args: { content: string, name: string }) => void
}

const Form = ({ add }: PropsType) => {

    const contentRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const content = contentRef.current?.value;
        const name = "VNL"

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
    }}>
        <Box sx={{ mb: 4, textAlign: 'right' }} >
            <TextField inputRef={contentRef} type='text' placeholder='Content' fullWidth multiline sx={{ mb: 1 }} />
            {/* <TextField inputRef={nameRef} type='text' placeholder='Name' fullWidth multiline sx={{ mb: 1 }} /> */}
            <Button variant='contained' type='submit' >
                Post
            </Button>
        </Box>
    </form>
}

export default Form
