import { account, appwriteConfig, avatars, client, databases } from "./AppWriteConfig";
import { ID, Query } from "appwrite";
import state from './../../store/index';
import { toast } from 'sonner';


//==================================
// CREDENTIALS
//==================================
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
//==================================
// GET DOCUMENTS
//==================================
export const appWriteGetChats = async () => {
    const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.chatsCollectionId
    )
    console.log("the chats", response)
    state.chats = response
    appWriteChatSubscribe()
    return response
}
export const appWriteChatSubscribe = () => {
    const updateState = (response) => {
        const chatId = response.payload.chat[0].$id;
        const index = state.chats.documents.findIndex((doc) => doc.$id === chatId);
        if (index !== -1) {
            state.chats.documents[index].messages.push(response.payload);
        }
    };

    client.subscribe([`databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.messagesCollectionId}.documents`], (response) => {
        console.log("REALTIME", response)
        if (response.events.includes("databases.*.collections.*.documents.*.create")) {
            console.log("CREATED", response)
            updateState(response)

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
export const appWriteGetUsers = async () => {
    const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
    )
    console.log("the chats", response)
    state.users = response
    return response
}
//==================================
// CREATE DOCUMENTS
//==================================
export async function appWriteCreateUser(user, setLoading) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.username,
        );

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await appWriteSaveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,
        });

        return newUser;
    } catch (error) {
        console.log("THE ERROR", error);
        throw error
    } finally {
        setLoading(false)
    }
}
export async function appWriteSaveUserToDB(user) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: user.accountId,
                email: user.email,
                name: user.name,
                profileImage: user.imageUrl,
                username: user.username,
            }
        );
        return newUser;
    } catch (error) {
        console.log("THE ERROR", error);
        throw error
    }
}
export const appWriteCreateMessage = async (message) => {
    console.log("BODY SENDED:    ", message)
    const response = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.messagesCollectionId, ID.unique(), {
        body: message.body,
        chat: [
            message.chat
        ],
        user: [
            message.user
        ]
    })
    console.log("RESPONSE", response)
    return response
}