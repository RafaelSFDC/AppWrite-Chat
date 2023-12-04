import { motion, AnimatePresence } from 'framer-motion';
import state from './../../store/index';
import { useSnapshot } from 'valtio';
import { appWriteCreateMessage } from "../../api/appWrite/api";
import Spinner from "../../components/Spinner";
import { IoIosImages } from "react-icons/io";
import { HiMicrophone } from "react-icons/hi2";
import { BiSolidSend } from "react-icons/bi";
import { formatForm } from '../../functions';
import ButtonMotion from './../../components/framerMotion/Button';
import { useEffect, useRef } from 'react';
import { useMemo } from 'react';

const ChatsMessages = () => {
    const snap = useSnapshot(state)
    const chatContainerRef = useRef();
    const chatRef = useMemo(() => snap.chats.documents?.[snap.activeChat]?.messages || [], [snap.activeChat, snap.chats.documents]);

    useEffect(() => {
        // Rola para baixo ao adicionar uma nova mensagem
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }

    }, [chatRef]);
    const formHandler = async (e) => {
        const form = await formatForm(e)
        form.user = state.userCollection
        form.chat = state.chats.documents[snap.activeChat].$id
        appWriteCreateMessage(form)
        e.target.reset()
    }

    return <div>
        {
            snap.activeChat !== null && snap.chats ?
                <>
                    <div className="chat">
                        <div className="header">
                            {snap.chats.documents[snap.activeChat].users.map((participant, index) => {
                                if (participant.$id !== state.userCollection) {
                                    return <div key={participant.$id + state.userCollection}>
                                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
                                        <p key={participant.$id + index}>{participant.username}</p>
                                    </div>
                                } else {
                                    return
                                }
                            }
                            )}
                            <div>
                                {/* <IoTrashBin onClick={() => deleteChat(snap.chats.documents[snap.activeChat].$id)} /> */}
                                <ul>
                                    <li>Clear all</li>
                                    <li>Files</li>
                                    <li>Profiles</li>
                                    <li>Search</li>
                                </ul>
                            </div>
                        </div>
                        <div className='body'>
                            <ul ref={chatContainerRef}>
                                <AnimatePresence>
                                    {snap.chats.documents[snap.activeChat].messages.map(message => (
                                        message.user[0].$id === state.userCollection ?
                                            <motion.li
                                                transition={{
                                                    duration: 0.3,
                                                    ease: "easeInOut"
                                                }}
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                className="user"
                                                key={message.$id}
                                            >
                                                <div>{message.body}</div>
                                                {/* <motion.div whileHover={{ scale: 1.2 }}>
                                                    <IoTrashBin onClick={() => appWriteDeleteMassege(message)} />
                                                </motion.div> */}
                                            </motion.li>
                                            :
                                            <motion.li
                                                transition={{
                                                    duration: 0.3,
                                                    ease: "easeInOut"
                                                }}
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                key={message.$id}
                                            >
                                                <motion.img whileHover={{ scale: 1.2 }} src={message.user[0].profileImage ? message.user[0].profileImage : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="userPhoto" />
                                                <div>
                                                    {message.body}
                                                </div>
                                            </motion.li>
                                    ))}
                                </AnimatePresence>
                            </ul>
                            <form action="post" onSubmit={formHandler}>
                                <textarea name="body" id="body" cols="30" rows="2"></textarea>
                                <button><IoIosImages /></button>
                                <button><HiMicrophone /></button>
                                <ButtonMotion type="submit"><BiSolidSend /></ButtonMotion>
                            </form>
                        </div>
                    </div>
                </>
                : snap.loading.chats ? <Spinner /> : null
        }
    </div>;
};

export default ChatsMessages;
