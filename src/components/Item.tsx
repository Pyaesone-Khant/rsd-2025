import React from "react"

type PropsType = {
    item: {
        id: number
        content: string
        name: string
    }
    onRemove
}

const Item = ({item, onRemove}: PropsType) => {

    const {id, name, content} = item;

    return (
        <li style={{padding: 10, borderBottom: "1px solid #ddd", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20
        }} > 
          <span>
          {content} - <b>{name}</b>
          </span>
          <button onClick={() => onRemove(id)} style={{
            backgroundColor: "crimson",
            padding: "8px 16px",
            borderRadius: 4,
            color: "white",
            border: "none",
            cursor: "pointer"
          }} >
            Remove
          </button>
           </li>
      )
}

export default Item
