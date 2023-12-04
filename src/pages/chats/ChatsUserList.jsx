import { useSnapshot } from "valtio";
import state from "../../store";
import ListMotion from './../../components/framerMotion/ListMotion';
import { appWriteCreateChat } from "../../api/appWrite/api";
import { FiSearch } from "react-icons/fi";
import { toast } from 'sonner';

const ChatsUserList = () => {
    const snap = useSnapshot(state)
    const chatHandler = async (id, index) => {
        state.activeChat = null
        state.activeUser = index
        state.activeUserId = id
        state.loading = false
        if (snap.chatCrated) {
            toast.error("Establishing connection with other user, please wait")
            return
        }
        if (!snap.chats.documents) {
            toast.error("Error: no chats available, please try again")
            return
        }
        const chatIndex = await snap.chats.documents.findIndex((chat) => chat.users.some((user) => user.$id === snap.userCollection) && chat.users.some((user) => user.$id === id))
        if (chatIndex === -1) {
            state.chatCrated = true
            toast.promise(createChat(id, index), {
                loading: 'Establishing connection',
                success: (data) => {
                    return `Connected`;
                },
                error: 'Error on the server, please try again',
            });
        } else {
            state.activeChat = chatIndex
            return
        }
    }

    const createChat = async (id) => {
        await appWriteCreateChat(id)
    }
    return <nav className="userList">
        <div className="search-container">
            <input
                type="text"
                name="search"
                id="search"
                placeholder="Search...."
                className="search-input"
            />
            <FiSearch className="search-icon" />
        </div>
        <ul>
            {snap.users.documents && snap.users.documents.length > 0 ? snap.users.documents.map((user, index) => {
                if (user.$id === state.userCollection) {
                    return
                } else {
                    return (
                        <ListMotion
                            key={user.$id}
                            className={snap.activeUser === index ? 'active' : ''}
                            onClick={() => chatHandler(user.$id, index)}
                        >
                            <img src={user.profileImage ? user.profileImage : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="userInfo" />
                            <div>
                                <p key={index + user.$id}>{user.username}</p>
                                <span>User status...</span>
                            </div>
                        </ListMotion>
                    );
                }

            }) : <h4>No users found</h4>}
        </ul>
    </nav>;
};

export default ChatsUserList;
