import React from "react";

type PropsType = {
    children: React.ReactNode
}

const List = ({ children }: PropsType) => {
    return (
        <ul style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            border: "1px solid #ddd",
            borderRadius: 8,
            overflow: "hidden",
        }}>
            {children}
        </ul>
    );
}
export default List
