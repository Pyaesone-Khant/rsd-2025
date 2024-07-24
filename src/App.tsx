import React, { useState } from "react"
import { Item, List } from "./components"


const App = () => {


  const [data, setData] = useState([
    {id: 1, content: "Hello, World!", name: "Bob"},
    {id: 2, content: "React is fun.", name: "Stuart"},
    {id: 3, content: "Yay, interesting.", name: "Kevin"},
  ])

  const removeItem = (id: number) => {
    setData(data.filter(item => item.id !== id))
  }

  return (
    <div style={{maxWidth: 600, margin: "20px auto"}}>
      <h2>Yaycha</h2>
      <List>
        {
          data.map(item => <Item key={item.id} item={item} onRemove={removeItem} />)
        }
      </List>
    </div>
  )
}


export default App
