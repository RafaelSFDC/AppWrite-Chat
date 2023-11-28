import { IoMdSend } from "react-icons/io";
import { useEffect } from 'react';
import { appWriteCreateMessage, appWriteGetChats } from './../api/appWrite/api';
import { motion } from 'framer-motion';
import state from "../store";
import { useSnapshot } from "valtio";
import { formatForm } from "../functions";
const Settings = () => {
    const snap = useSnapshot(state)
    useEffect(() => {
        return () => {
            appWriteGetChats()
        }
    }, []);

    const formHandler = async (e) => {
        const form = await formatForm(e)
        form.user = state.userCollection
        form.chat = state.chatId
        appWriteCreateMessage(form)
        e.target.reset()
    }

    const chatHandler = (index, id) => {
        state.activeChat = index
        state.chatId = id
    }

    return (
        <main className="chats">
            <h1>SETTINGS</h1>
            <div>
                <section>
                    <h2>My Chats</h2>
                    <ul>
                        {snap.chats.documents && snap.chats.documents.length ? snap.chats.documents.map((chat, index) => {
                            console.log("MAPING")
                            // Verifica se algum participante tem $id igual ao do usuário
                            const hasCurrentUser = chat.users && chat.users.some(participant => participant.$id === state.userCollection);
                            // Se houver algum participante com $id igual ao do usuário, renderiza
                            if (hasCurrentUser) {
                                console.log("MAPING 2")
                                return (
                                    <motion.li whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.2 },
                                    }}
                                        whileTap={{ scale: 0.9 }} key={chat.id} onClick={() => chatHandler(index, chat.$id)} className={snap.activeChat === index ? 'active' : ''}>
                                        {chat.users && chat.users
                                            .filter(participant => participant.$id !== state.userCollection) // Filtra os participantes diferentes do usuário
                                            .map((participant, index) => (
                                                <p key={index}>Chat with: {participant.username}</p>
                                            ))}
                                    </motion.li>
                                );
                            }
                            // Se não houver participantes com $id igual ao do usuário, não renderiza
                            return

                        }) : <h4>No chats found</h4>}
                    </ul>
                </section>
                <div>
                    {
                        snap.activeChat !== null && snap.chats ? <>
                            <div className="chat">
                                <div>User</div>
                                <ul>
                                    {snap.chats.documents[snap.activeChat].messages.map(message => (
                                        message.user[0].$id === state.userCollection ?
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
                        </> : null
                    }
                </div>
            </div>
        </main>
    );
};

export default Settings;
