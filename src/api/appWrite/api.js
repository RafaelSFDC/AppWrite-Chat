import { account, appwriteConfig, client, databases } from "./AppWriteConfig";
import { ID, Query } from "appwrite";
import state from './../../store/index';
import { toast } from 'sonner';

export const getMessages = async (setState) => {
    const state = setState
    const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.messagesCollectionId
    )
    state(response.documents)
    console.log(response)
    return response
}
export const appWriteChatSubscribe = (setState) => {
    const state = setState
    client.subscribe([`databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.messagesCollectionId}.documents`], (response) => {
        console.log("REALTIME", response)
        if (response.events.includes("databases.*.collections.*.documents.*.create")) {
            console.log("CREATED", response)
            // return setState((prevState) => {
            //     Adiciona o novo elemento ao final da lista
            //     return [...(prevState || []), response.payload];
            //     console.log(response.payload)
            // });
        }
        if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
            console.log("DELETED", response)
            // return state(prevState => prevState.filter(message => message.$id !== response.payload.$id))
        }
        if (response.events.includes("databases.*.collections.*.documents.*.update")) {
            console.log("update")
            return
        }
    })
}

export const appWriteGetChats = async (setMessages) => {
    const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.chatsCollectionId
    )
    console.log("the chats", response.documents[0].messages)
    setMessages(response.documents[0].messages)
    return response
}

export const checkUser = async () => {
    try {
        const response = await account.get()
        state.user = response
        state.logged = true
        console.log(response)
        const userCollection = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", response.$id)]
        )
        state.userCollection = userCollection.documents[0].$id
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
    console.log("the message:", message)
    const response = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.messagesCollectionId, ID.unique(), message)
    return response
}