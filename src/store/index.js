import { proxy } from "valtio";


const state = proxy({
    logged: "",
    loading: {
        start: true,
        chats: true
    },
    userCollection: "",
    chatId: "65657670c056f50b1ca1",
    chats: [],
    activeChat: null,
    users: [],
    activeUser: null,
    activeUserInfo: null,
    activeUserId: null,
    chatCrated: false
});


export default state;
