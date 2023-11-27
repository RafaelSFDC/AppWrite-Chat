import { proxy } from "valtio";


const state = proxy({
    logged: "",
    loading: true,
    userCollection: "",
    chatId: "6564db66c3ebef74b1b2",
});


export default state;
