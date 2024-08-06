import { queryClient, useApp } from "@src/ThemedApp";
import { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

interface JsonMessage{
    event: string;
    [key: string]: unknown
}

const AppSocket = () => {

    const {auth} = useApp();

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<JsonMessage>(import.meta.env.VITE_WS)

    useEffect(() => {
        if(auth && readyState === ReadyState.OPEN){
            sendJsonMessage({
                token: localStorage.getItem("yaychaToken")
            })
        }
    }, [
        readyState, auth, sendJsonMessage
    ]);

    useEffect(() => {
        console.log("WS: new message received!");
        if(lastJsonMessage && lastJsonMessage.event){
            queryClient.invalidateQueries(lastJsonMessage.event);
        }
    }, [
        lastJsonMessage
    ])

  return <></>
}

export default AppSocket
