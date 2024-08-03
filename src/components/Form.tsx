import { FormEvent, useRef } from 'react';

// components
import { Box, Button, TextField } from '@mui/material';

type PropsType = {
    add: (content: string) => void
}

const Form = ({ add }: PropsType) => {

    const contentRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const content = contentRef.current?.value;

        if (!content) {
            alert('Content is required!');
            return;
        }
        add(content);
        (e.currentTarget as HTMLFormElement).reset();
    }

    return <form onSubmit={handleSubmit} style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
    }}>
        <Box sx={{ mb: 4, textAlign: 'right' }} >
            <TextField inputRef={contentRef} type='text' placeholder='Content' fullWidth multiline sx={{ mb: 1 }} />
            <Button variant='contained' type='submit' >
                Post
            </Button>
        </Box>
    </form>
}

export default Form
