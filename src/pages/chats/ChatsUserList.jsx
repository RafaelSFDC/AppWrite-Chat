import { useSnapshot } from "valtio";
import state from "../../store";
import ListMotion from './../../components/framerMotion/ListMotion';
import { appWriteCreateChat } from "../../api/appWrite/api";

const ChatsUserList = () => {
    const snap = useSnapshot(state)
    const chatHandler = async (id, index) => {
        state.activeChat = null
        state.activeUser = index
        state.activeUserId = id
        state.loading = false

        const chatIndex = await snap.chats.documents.findIndex((chat) => chat.users.some((user) => user.$id === snap.userCollection) && chat.users.some((user) => user.$id === id))

        if (chatIndex === -1) {
            createChat(id, index)
        } else {
            state.activeChat = chatIndex
            return
        }
    }

    const createChat = async (id) => {
        await appWriteCreateChat(id)
        state.chatCrated = true
    }
    return <nav>
        <input type="text" name="search" id="search" placeholder="Search...." />
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
