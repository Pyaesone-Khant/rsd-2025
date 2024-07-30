import React from 'react'

// components
import { Box, Button, TextField } from '@mui/material'
import Item from '../components/Item'

const Comments = () => {

    const comments = [
        { id: 1, content: 'Initail Post from PK', name: 'PK', primary: true },
        { id: 2, content: 'This is a comment from Alice', name: 'Alice' },
        { id: 3, content: 'This is a reply from VNL', name: 'VNL' },
    ]

    return (
        <Box>
            {
                comments?.map(comment => <Item key={comment.id} item={comment} onRemove={() => { }} />)
            }
            <form>
                <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 3, }}>
                    <TextField multiline placeholder="Your Comment" />
                    <Button type="submit" variant="contained">Reply</Button>
                </Box>
            </form>
        </Box>
    )
}

export default Comments
