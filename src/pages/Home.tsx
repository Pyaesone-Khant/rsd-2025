import React, { useState } from 'react'

// components
import { Box } from '@mui/material'
import { Form, Item } from '../components'

// context
import { useApp } from '../ThemedApp'

const Home = () => {

    const { showForm, setShowForm, setAlert } = useApp()

    const [data, setData] = useState([
        { id: 1, content: "Hello, World!", name: "Alice" },
        { id: 2, content: "React is fun.", name: "Chris" },
        { id: 3, content: "Yay, interesting.", name: "Evan" },
    ])

    const addItem = ({ content, name }: { content: string, name: string }) => {
        const id = data?.length ? data[data.length - 1].id + 1 : 1;
        setData([...data, { id, content, name }]);
        setAlert({ alertType: "success", alertMsg: "Item added successfully." });
        setShowForm(false)
    }

    const removeItem = (id: number) => {
        setData(data.filter(item => item.id !== id))
        setAlert({ alertType: "success", alertMsg: "Item removed successfully." })
    }


    return (
        <Box>
            {
                showForm && <Form add={addItem} />
            }

            {
                data.map(item => <Item key={item.id} item={item} onRemove={removeItem} />)
            }
        </Box>
    )
}

export default Home
