import { IoMdSend } from "react-icons/io";
import { appWriteCreateMessage, appWriteDeleteChat, appWriteDeleteMassege, appWriteGetChats } from './../api/appWrite/api';
import { motion, AnimatePresence } from 'framer-motion';
import state from "../store";
import { useSnapshot } from "valtio";
import { formatForm } from "../functions";
import { IoTrashBin } from "react-icons/io5";
import { toast } from 'sonner';
const Chats = () => {
    const snap = useSnapshot(state)

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

    const deleteChat = (id) => {
        toast.promise(appWriteDeleteChat(id),
            {
                loading: "Deleting chat...",
                success: () => {
                    return "Chat deleted successfully"
                },
                error: (error) => {
                    return `Chat deletion failed. ${error}`
                },
            })
    }

    return (
        <main className="chats">
            <h1>CHATS</h1>
            <div>
                <section>
                    <h2>My Chats</h2>
                    <ul>
                        <AnimatePresence>
                            {snap.chats.documents && snap.chats.documents.length ? snap.chats.documents.map((chat, index) => {
                                const hasCurrentUser = chat.users && chat.users.some(participant => participant.$id === state.userCollection);
                                if (hasCurrentUser) {
                                    return (
                                        <motion.li
                                            whileHover={{
                                                scale: 1.05,
                                                transition: { duration: 0.2 },
                                            }}
                                            whileTap={{ scale: 0.9 }}
                                            exit={{ x: -150, opacity: 0 }}
                                            key={chat.id}
                                            onClick={() => chatHandler(index, chat.$id)}
                                            className={snap.activeChat === index ? 'active' : ''}>
                                            {chat.users && chat.users
                                                .filter(participant => participant.$id !== state.userCollection) // Filtra os participantes diferentes do usuário
                                                .map((participant, index) => (
                                                    <p key={index}>Chat with: {participant.username}</p>
                                                ))}
                                        </motion.li>
                                    );
                                }
                                return
                            }) : <h4>No chats found</h4>}
                        </AnimatePresence>
                    </ul>
                </section>
                <div>
                    {
                        snap.activeChat !== null && snap.chats ? <>
                            <div className="chat">
                                <div className="header">
                                    <span>Users:</span>
                                    <div>
                                        {snap.chats.documents[snap.activeChat].users.map((participant, index) => {
                                            if (participant.$id !== state.userCollection) {
                                                return <motion.div whileHover={{ scale: 1.1 }} key={participant.$id + state.userCollection}>
                                                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
                                                    <p key={participant.$id + index}>{participant.username}</p>
                                                </motion.div>
                                            } else {
                                                return <motion.div whileHover={{ scale: 1.1 }} key={participant.$id + state.userCollection}>
                                                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
                                                    <p key={participant.$id + index}>You</p>
                                                </motion.div>
                                            }
                                        }
                                        )}
                                    </div>
                                    <motion.div whileHover={{ scale: 1.2 }}>
                                        <IoTrashBin onClick={() => deleteChat(snap.chats.documents[snap.activeChat].$id)} />
                                    </motion.div>
                                </div>
                                <ul>
                                    <AnimatePresence>
                                        {snap.chats.documents[snap.activeChat].messages.map(message => (
                                            message.user[0].$id === state.userCollection ?
                                                <motion.li
                                                    transition={{
                                                        duration: 0.8,
                                                        ease: "easeInOut"
                                                    }}
                                                    initial={{ x: -150, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    exit={{ x: 150, opacity: 0 }}
                                                    className="user"
                                                    key={message.$id}
                                                >
                                                    {message.body}
                                                    <motion.div whileHover={{ scale: 1.2 }}>
                                                        <IoTrashBin onClick={() => appWriteDeleteMassege(message)} />
                                                    </motion.div>
                                                </motion.li>
                                                :
                                                <motion.li
                                                    transition={{
                                                        duration: 0.8,
                                                        ease: "easeInOut"
                                                    }}
                                                    initial={{ x: -150, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    exit={{ x: 150, opacity: 0 }}
                                                    key={message.$id}
                                                >
                                                    <motion.img whileHover={{ scale: 1.2 }} src={message.user[0].profileImage ? message.user[0].profileImage : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="userPhoto" />
                                                    {message.body}
                                                </motion.li>
                                        ))}
                                    </AnimatePresence>

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
        </main >
    );
};

export default Chats;
