import { account, appwriteConfig, client } from "./AppWriteConfig";
import state from './../../store/index';
import { toast } from 'sonner';

export const messagesSubscribe = (setState) => {
    const state = setState
    client.subscribe([`databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.messagesCollectionId}.documents`], (response) => {
        console.log("REALTIME", response)
        if (response.events.includes("databases.*.collections.*.documents.*.create")) {
            console.log("CREATED", response)
            return state(prevState => [response.payload, ...prevState])
        }
        if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
            console.log("DELETED", response)
            return state(prevState => prevState.filter(message => message.$id !== response.payload.$id))
        }
        if (response.events.includes("databases.*.collections.*.documents.*.update")) {
            return
        }
    })
}

export const checkUser = async () => {
    try {
        const response = await account.get()
        state.user = response
        state.logged = true
        return response
    } catch (error) {
        state.logged = false
        return false
    } finally {
        state.loading = false
        // return
    }
}

export const appWriteLogin = async (email, password, loading) => {
    const logInd = async () => {
        try {
            const response = await account.createEmailSession(email, password)
            state.logged = true
            return response;
        } catch (error) {
            throw new Error("Invalid credentials, please try again");
        } finally {
            loading(false)
        }
    }
    toast.promise(logInd,
        {
            loading: "Logging in...",
            success: "Logged in successfully",
            error: "Error logging in, please try again",
        })

}

export const appWriteLogout = async () => {
    const response = await account.deleteSession('current')
    state.logged = false
    return response
}

export const appWriteCreateMessage = async (message) => {
    const response = await client.databases.update(appwriteConfig.databaseId, appwriteConfig.messagesCollectionId, message)
    return response
}