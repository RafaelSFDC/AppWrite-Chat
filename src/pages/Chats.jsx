import { IoMdSend } from "react-icons/io";
import { useEffect, useState } from 'react';
import { appWriteCreateMessage, appWriteGetChats, appWriteChatSubscribe } from './../api/appWrite/api';
import { motion } from 'framer-motion';
import state from "../store";
import { useSnapshot } from "valtio";
import { formatForm } from "../functions";


const Chats = () => {
    const [messages, setMessages] = useState([]);
    useSnapshot(state)

    useEffect(() => {
        appWriteChatSubscribe(setMessages)
        return () => {

            appWriteGetChats(setMessages)
        }
    }, []);

    const formHandler = async (e) => {
        const form = await formatForm(e)
        form.user = state.userCollection
        form.chat = state.chatId
        appWriteCreateMessage(form)
        e.target.reset()
    }
    return (
        <main className="chats">
            <h1>Chats</h1>
            <div>
                <section>chatsList</section>
                <div>
                    <div className="chat">
                        <div>User</div>
                        <ul>
                            {messages.map(message => (
                                message.user.$id === state.userCollection ?
                                    <motion.li
                                        transition={{
                                            duration: 1,
                                            ease: "easeInOut"
                                        }}
                                        initial={{ x: -150, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        className="user"
                                        key={message.$id}
                                    >
                                        {message.body}
                                    </motion.li>
                                    : <motion.li
                                        transition={{
                                            duration: 1,
                                            ease: "easeInOut"
                                        }}
                                        initial={{ x: -150, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        key={message.$id}
                                    >
                                        {message.body}
                                    </motion.li>
                            ))}
                        </ul>
                    </div>
                    <form onSubmit={formHandler}>
                        {/* <button type="button">+</button> */}
                        <textarea name="body" cols="30" rows="10"></textarea>
                        {/* <button type="button">emoji</button> */}
                        <button type="submit">
                            <IoMdSend />
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Chats;
