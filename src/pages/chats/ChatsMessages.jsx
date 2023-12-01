import { motion, AnimatePresence } from 'framer-motion';
import state from './../../store/index';
import { useSnapshot } from 'valtio';
import { IoTrashBin } from 'react-icons/io5';
import { appWriteDeleteMassege } from "../../api/appWrite/api";
import Spinner from "../../components/Spinner";
import { IoIosImages } from "react-icons/io";
import { HiMicrophone } from "react-icons/hi2";
import { BiSolidSend } from "react-icons/bi";

const ChatsMessages = () => {
    const snap = useSnapshot(state)
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
                            <motion.div whileHover={{ scale: 1.2 }}>
                                {/* <IoTrashBin onClick={() => deleteChat(snap.chats.documents[snap.activeChat].$id)} /> */}
                                <ul>
                                    <li>Clear all</li>
                                    <li>Files</li>
                                    <li>Profiles</li>
                                    <li>Search</li>
                                </ul>
                            </motion.div>
                        </div>
                        <div className='body'>
                            <ul>
                                <AnimatePresence>
                                    <li>A</li>
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
                            <form action="">
                                <textarea name="body" id="body" cols="30" rows="10"></textarea>
                                <button><IoIosImages /></button>
                                <button><HiMicrophone /></button>
                                <button><BiSolidSend /></button>
                            </form>
                        </div>
                    </div>
                </>
                : snap.loading.chats ? <Spinner /> : null
        }
    </div>;
};

export default ChatsMessages;
