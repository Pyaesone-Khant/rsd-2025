import React, { useState } from "react";
import { Form, Item, List } from "./components";


const App = () => {

    const [showForm, setShowForm] = useState(false);

    const [data, setData] = useState([
        { id: 1, content: "Hello, World!", name: "Alice" },
        { id: 2, content: "React is fun.", name: "Chris" },
        { id: 3, content: "Yay, interesting.", name: "Evan" },
    ])

    const toggleShowForm = () => setShowForm(prev => !prev)

    const addItem = ({ content, name }: { content: string, name: string }) => {
        const id = data[data.length - 1].id + 1;
        setData([...data, { id, content, name }])
    }

    const removeItem = (id: number) => {
        setData(data.filter(item => item.id !== id))
    }

    return (
        <div style={{ maxWidth: 600, margin: "20px auto" }}>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}>
                <h2>Yaycha</h2>
                <button onClick={toggleShowForm} style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor: showForm ? "#dc3545" : "#0d6efd",
                    color: "white",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                }} >
                    {showForm ? "x" : "+"}
                </button>
            </div>
            {showForm && <Form add={addItem} />}
            <List>
                {
                    data.map(item => <Item key={item.id} item={item} onRemove={removeItem} />)
                }
            </List>
        </div>
    )
}


export default App
