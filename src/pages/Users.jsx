import { appWriteCreateChat } from './../api/appWrite/api';
import { motion } from 'framer-motion';
import state from "../store";
import { useSnapshot } from "valtio";
import { toast } from 'sonner';
const Users = () => {
    const snap = useSnapshot(state)

    const createChat = () => {
        console.log(state.activeUserInfo.$id)
        console.log(state.userCollection)

        toast.promise(appWriteCreateChat(),
            {
                loading: "Initializing chat",
                success: () => {
                    // navigate('/login')
                    return "Chat created successfully"
                },
                error: (error) => {
                    return `Error stablishing chat. ${error}`
                },
            })
    }

    const userHandler = (index, user) => {
        state.activeUser = index
        state.activeUserInfo = user
    }

    return (
        <main className="chats">
            <h1>USERS</h1>
            <div>
                <section>
                    <h2>List of Users</h2>
                    <ul>
                        {snap.users.documents && snap.users.documents.length > 0 ? snap.users.documents.map((user, index) => {
                            console.log("MAPING")
                            if (user.$id === state.userCollection) {
                                console.log("Esse é o usuario logado: ", user)
                                return
                            } else {
                                return (
                                    <motion.li
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.2 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        key={user.$id}
                                        onClick={() => userHandler(index, user)}
                                        className={snap.activeUser === index ? 'active' : ''}>
                                        <p key={index + user.$id}>User: {user.username}</p>
                                    </motion.li>
                                );
                            }

                        }) : <h4>No users found</h4>}
                        {console.log("USERS", snap.users.documents)}
                    </ul>
                </section>
                <div className="userInfoContainer">
                    {
                        snap.activeUser !== null && snap.activeUserInfo ? <>
                            <div className="userInfo">
                                <img src={snap.activeUserInfo.profileImage ? snap.activeUserInfo.profileImage : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'} alt="userInfo" />
                                <div>
                                    <h3>Name: {snap.activeUserInfo.name}</h3>
                                    <p>Nickname: {snap.activeUserInfo.username}</p>
                                    <p>Email: {snap.activeUserInfo.email}</p>
                                    <p>Active chats: {snap.activeUserInfo.chats.length}</p>
                                </div>
                                <button onClick={() => createChat()}>Iniciate Chat</button>
                            </div>
                        </> : null
                    }
                </div>
            </div>
        </main>
    );
};

export default Users;
