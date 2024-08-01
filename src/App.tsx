import { Box, Container } from "@mui/material";
import { Form, Header, Item } from "@src/components";
import { useApp } from "@src/ThemedApp";
import { useState } from "react";


const App = () => {

    const { showForm, setAlert, setShowForm } = useApp();

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
            <Header />
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                {
                    showForm && <Form add={addItem} />
                }
                {
                    data.map(item => <Item key={item.id} item={item} onRemove={removeItem} />)
                }
            </Container>
        </Box>
    )
}


export default App
