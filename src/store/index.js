import { proxy } from "valtio";


const state = proxy({
    logged: "",
    loading: true,
    userCollection: "",
    chatId: "65657670c056f50b1ca1",
    chats: [],
    activeChat: null,
    users: [],
    activeUser: null,
    activeUserInfo: null,

});


export default state;
