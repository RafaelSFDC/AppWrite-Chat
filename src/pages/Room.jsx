import { appwriteConfig, databases } from "../api/appWrite/AppWriteConfig";
import { useEffect, useState } from "react";
import { messagesSubscribe } from "../api/appWrite/api";

const Room = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getMessages()
        return () => {
            messagesSubscribe(setMessages)
        }
    }, []);

    const getMessages = async () => {
        const response = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.messagesCollectionId
        )
        setMessages(response.documents)
        console.log(response)
    }


    return <div>
        <div>
            {messages.map(message => (
                <div key={message.$id}>
                    {message.body}
                </div>
            ))}
        </div>
    </div>;
};

export default Room;
