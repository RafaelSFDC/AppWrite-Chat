import { useEffect, useState } from "react";
import { appWriteLogout } from "../api/appWrite/api";
import ButtonMotion from './../components/framerMotion/Button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Room = () => {
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    // useEffect(() => {
    //     getMessages()
    //     return () => {
    //         messagesSubscribe(setMessages)
    //     }
    // }, []);

    // const getMessages = async () => {
    //     const response = await databases.listDocuments(
    //         appwriteConfig.databaseId,
    //         appwriteConfig.messagesCollectionId
    //     )
    //     setMessages(response.documents)
    //     console.log(response)
    // }


    return <div className="room">
        <div>
            {messages.map(message => (
                <div key={message.$id}>
                    {message.body}
                </div>
            ))}
            <ButtonMotion onClick={() => toast.error('My first toast')}>
                TOAST
            </ButtonMotion>
            {/* <Logo /> */}
            <ButtonMotion onClick={appWriteLogout}>
                LOGOUT
            </ButtonMotion>
        </div>
    </div>;
};

export default Room;
