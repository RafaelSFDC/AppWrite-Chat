import { proxy } from "valtio";


const state = proxy({
    logged: "",
    loading: true,
});


export default state;
