import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    startAfter,
    updateDoc,
} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {useState} from "react";

import {useSnackBar} from "../useSneckBar/useSnackBars";

import {
    IAddMessageCombinedChatProps,
    IAddUnreadMessagesProps,
    ICheckChatProps,
    ICreateChatProps,
    ICreateUserChatProps, IDeleteMessageCombinedChatProps,
    IDeleteUnreadMessagesProps,
    IGetMessagesCombinedChatProps,
    IGetTotalMessagesCombinedChatProps,
    IGetUnreadMessages,
    IGetUserChatProps,
    IGetUserChatsrops,
    IMessagesProps,
    ISetLastMessageProps,
    ISetTotalMessagesCombinedChatProps,
} from "../../types/chats";

export function useChats() {

    const {setSnackBar} = useSnackBar();


    const [loadingCreateUserChat,
        setLoadingCreateUserChat] = useState<boolean>(false);

    const [loadingCreateChat,
        setLoadingCreateChat] = useState<boolean>(false);

    const [loadingGetUserChats,
        setLoadingGetUserChats] = useState<boolean>(true);

    const [loadingGetUserChat,
        setLoadingGetUserChat] = useState<boolean>(true);


    const [loadingCheckChat,
        setLoadingCheckChat] = useState<boolean>(false);

    const [loadingAddMessageCombinedChat,
        setLoadingAddMessageCombinedChat] = useState<boolean>(false);

    const [loadingDeleteMessageCombinedChat,
        setLoadingDeleteMessageCombinedChat] = useState<boolean>(false);


    const [loadingGetMessagesCombinedChat,
        setLoadingGetMessagesCombinedChat] = useState<boolean>(false);


    const [loadingGetTotalMessagesCombinedChat,
        setLoadingGetTotalMessagesCombinedChat] = useState<boolean>(false);

    const [loadingSetTotalMessagesCombinedChat,
        setLoadingSetMessagesCombinedChat] = useState<boolean>(false);


    const [loadingGetMessages,
        setLoadingGetMessages] = useState<boolean>(false);

    const [loadingLoadPageMessages,
        setLoadPageMessages] = useState<boolean>(false);


    const [loadingDeleteUnreadMessage,
        setDeleteUnreadMessage] = useState<boolean>(false);


    const [loadingGetUnreadMessages,
        setLoadingGetUnreadMessages] = useState<boolean>(true);


    const createCombinedId = (props: ICreateChatProps) => {

        const {userId, currentUserId} = props;

        let arr = [];
        arr.push(userId);
        arr.push(currentUserId);
        arr.sort();
        return arr.join('');
    };


    const createUserChat = async (props: ICreateUserChatProps) => {
        setLoadingCreateUserChat(true);

        const {userId, interlocutorId, combinedId} = props;

        try {
            const ref = doc(db,
                "users",
                userId,
                "userChats",
                combinedId);

            await setDoc(ref, {
                lastMessage: {
                    userIdLastMessage: "",
                    text: ""
                },
                interlocutorId,
                createUserChat: serverTimestamp()
            });

            setLoadingCreateUserChat(false);
        } catch (error: any) {
            setLoadingCreateUserChat(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };


    const createChat = async (props: ICreateChatProps) => {
        setLoadingCreateChat(true);

        const {userId, currentUserId} = props;


        const combinedId = createCombinedId({userId, currentUserId});

        try {
            const ref = doc(db,
                "chats",
                combinedId);

            await setDoc(ref, {

                participant: [userId, currentUserId],
                totalMessages: 0,
                createChat: serverTimestamp()
            });

            await createUserChat({
                    userId,
                    interlocutorId: currentUserId,
                    combinedId
                }
            );

            await createUserChat({
                    userId: currentUserId,
                    interlocutorId: userId,
                    combinedId
                }
            );

            setLoadingCreateChat(false);
            return combinedId;
        } catch (error: any) {
            setLoadingCreateChat(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };


    const getUserChats = async (props: IGetUserChatsrops) => {

        const {currentUserId} = props;

        setLoadingGetUserChats(true);

        const ref = collection(db,
            "users",
            currentUserId,
            "userChats");

        const res = await getDocs(ref);
        try {
            const results = (res.docs.map((data) => {
                return {...data.data(), id: data.id}
            }));
            setLoadingGetUserChats(false);
            return results;


        } catch (error) {
            setLoadingGetUserChats(false);
        }
    };

    const CheckChat = async (props: ICheckChatProps) => {
        setLoadingCheckChat(true);

        const {userId, currentUserId} = props;

        const combinedId = createCombinedId({userId, currentUserId});

        const ref = doc(db,
            "chats",
            combinedId);


        try {
            const res = await getDoc(ref);
            setLoadingCheckChat(false);
            if (res.exists()) {
                return combinedId;
            } else {
                return false;
            }

        } catch (error: any) {
            setLoadingCheckChat(false);
            setSnackBar(error.code, 'error');
            console.log(error);
            throw  error;
        }

    };

    const getUserChat = async (props: IGetUserChatProps) => {

        setLoadingGetUserChat(true);

        const {userChatId, currentUserId} = props;

        const ref = doc(db, "users", currentUserId, "userChats", userChatId);

        try {
            const res = await getDoc(ref);
            setLoadingGetUserChat(false);
            return res.data();


        } catch (error: any) {
            setLoadingGetUserChat(false);
            setSnackBar(error.code, 'error');
            console.log(error);
            throw  error;
        }

    };


    const getTotalMessagesCombinedChat = async (props: IGetTotalMessagesCombinedChatProps) => {
        setLoadingGetTotalMessagesCombinedChat(true);
        const {combinedId} = props;
        const ref = doc(db, "chats", combinedId);
        try {
            const res = await getDoc(ref);
            setLoadingGetTotalMessagesCombinedChat(false);

            if (res.exists()) {
                return res.data().totalMessages;
            } else {
                return 0;
            }

        } catch (error: any) {
            setSnackBar(error.code, 'error');
            console.log(error);
            setLoadingGetTotalMessagesCombinedChat(false);
            throw  error;
        }

    };

    const setTotalMessagesCombinedChat = async (props: ISetTotalMessagesCombinedChatProps) => {
        setLoadingSetMessagesCombinedChat(true);
        const {combinedId, totalMessages} = props;
        const ref = doc(db, "chats", combinedId);
        try {
            await updateDoc(ref, {
                totalMessages: totalMessages
            });
            setLoadingSetMessagesCombinedChat(false);

        } catch (error: any) {
            setSnackBar(error.code, 'error');
            console.log(error);
            setLoadingSetMessagesCombinedChat(false);
            throw  error;
        }
    };

    const setLastMessage = async (props: ISetLastMessageProps) => {
        const {combinedId, userId, lastMessage, userIdLastMessage} = props;
        const ref = doc(db, "users", userId, "userChats", combinedId);
        try {

            await updateDoc(ref, {
                lastMessage: {
                    text: lastMessage,
                    userIdLastMessage
                },
                lastMessageTimeStamp: serverTimestamp()
            });

        } catch (error: any) {
            setSnackBar(error.code, 'error');
            console.log(error);
            throw  error;
        }
    };


    const addMessageCombinedChat = async (props: IAddMessageCombinedChatProps) => {
        setLoadingAddMessageCombinedChat(true);
        const {combinedId, body, userId, currentUserId, idMessages} = props;
        try {
            const ref = doc(db,
                "chats",
                combinedId, "messages",
                idMessages);

            await setDoc(ref, {
                ...body,
                createMessage: serverTimestamp()
            });

            await addUnreadMessages({
                userId,
                userChatId: combinedId,
                idMessages,
                text: body.text,
                currentUserId
            });

            const oldTotalMessages = await getTotalMessagesCombinedChat({combinedId});
            await setTotalMessagesCombinedChat({
                combinedId,
                totalMessages: oldTotalMessages + 1
            });

            await setLastMessage({
                userId, lastMessage: body.text,
                combinedId,
                userIdLastMessage: currentUserId,

            });

            await setLastMessage({
                userId: currentUserId, lastMessage: body.text,
                combinedId,
                userIdLastMessage: currentUserId
            });


            setLoadingAddMessageCombinedChat(false);
        } catch (error: any) {
            setLoadingAddMessageCombinedChat(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };

    const deleteMessageCombinedChat = async (props: IDeleteMessageCombinedChatProps) => {

        setLoadingDeleteMessageCombinedChat(true);

        const {combinedId, userId, currentUserId, messages} = props;

        try {

           await messages.forEach( async (id:string)=>{
                const ref = doc(db,
                    "chats",
                    combinedId, "messages",
                    id);

                await deleteDoc(ref);
                await deleteUnreadMessages({
                    currentUserId:userId,
                    userChatId:combinedId,
                    idMessages:id
                })
            });

            const lastMessages = await getMessages({
                combinedId, limitComment: 1, orderByComment: 'desc'
            });
            if (lastMessages && lastMessages.length) {
                const message = lastMessages[0];
                await setLastMessage({
                    userId: currentUserId,
                    combinedId,
                    //@ts-ignore
                    lastMessage: message.text,
                    //@ts-ignore
                    userIdLastMessage: message.userId

                });

                await setLastMessage({
                    userId: userId,
                    combinedId,
                    //@ts-ignore
                    lastMessage: message.text,
                    //@ts-ignore
                    userIdLastMessage: message.userId

                });

                const oldTotalMessages = await getTotalMessagesCombinedChat({combinedId});
                await setTotalMessagesCombinedChat({
                    combinedId,
                    totalMessages: oldTotalMessages - 1
                });

            } else{

                await setLastMessage({
                    userId: currentUserId,
                    combinedId,
                    //@ts-ignore
                    lastMessage: '',
                    //@ts-ignore
                    userIdLastMessage: ''
                });

                await setLastMessage({
                    userId: userId,
                    combinedId,
                    //@ts-ignore
                    lastMessage: '',
                    //@ts-ignore
                    userIdLastMessage: ''
                });

                const oldTotalMessages = await getTotalMessagesCombinedChat({combinedId});
                await setTotalMessagesCombinedChat({
                    combinedId,
                    totalMessages: oldTotalMessages - 1
                });
            }

            setLoadingDeleteMessageCombinedChat(false);

            return lastMessages;


        } catch (error: any) {
            setLoadingDeleteMessageCombinedChat(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };


    const addUnreadMessages = async (props: IAddUnreadMessagesProps) => {
        const {userId, userChatId, idMessages, text, currentUserId} = props;
        try {
            const ref = doc(db,
                "users",
                userId, "userChats",
                userChatId, "unreadMessages", idMessages);

            await setDoc(ref, {
                text, userId: currentUserId,
                unread: true,
                whoId: userId
            });

        } catch (error: any) {
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };

    const deleteUnreadMessages = async (props: IDeleteUnreadMessagesProps) => {
        setDeleteUnreadMessage(true);

        const {currentUserId, userChatId, idMessages} = props;
        try {
            const ref = doc(db,
                "users",
                currentUserId, "userChats",
                userChatId, "unreadMessages", idMessages);

            await deleteDoc(ref);


            setDeleteUnreadMessage(false);
        } catch (error: any) {
            setDeleteUnreadMessage(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };


    const getUnreadMessages = async (props: IGetUnreadMessages) => {

        const {currentUserId, userChatId} = props;

        setLoadingGetUnreadMessages(true);

        const ref = collection(db,
            "users",
            currentUserId,
            "userChats",
            userChatId,
            "unreadMessages");

        const res = await getDocs(ref);
        try {
            const results = (res.docs.map((data) => {
                return {...data.data(), id: data.id}
            }));
            setLoadingGetUnreadMessages(false);
            return results;


        } catch (error) {
            setLoadingGetUnreadMessages(false);
        }
    };


    const getMessagesCombinedChat = async (props: IGetMessagesCombinedChatProps) => {

        const {combinedId} = props;

        setLoadingGetMessagesCombinedChat(true);

        const ref = collection(db,
            "chat",
            combinedId,
            "messages");

        const res = await getDocs(ref);
        try {
            const results = (res.docs.map((data) => {
                return {...data.data(), id: data.id}
            }));
            setLoadingGetMessagesCombinedChat(false);
            return results;


        } catch (error) {
            setLoadingGetMessagesCombinedChat(false);
        }
    };


    const getMessages = async (props: IMessagesProps) => {
        const {
            combinedId,
            limitComment,
            orderByComment
        } = props;


        const docRef = collection(db,
            "chats",
            combinedId,
            "messages");

        const queryRef = limitComment ? query(docRef,
            orderBy("createMessage", orderByComment),
            limit(limitComment)) : query(docRef,
            orderBy("createMessage", orderByComment));
        setLoadingGetMessages(true);
        const res = await getDocs(queryRef);
        try {
            const results = (res.docs.map((data) => {
                return {...data.data(), id: data.id}
            }));
            setLoadingGetMessages(false);
            return results;


        } catch (error) {
            setLoadingGetMessages(false);
        }
    };

    const loadMessagesPage = async (props: IMessagesProps) => {

        setLoadPageMessages(true);

        const {
            combinedId,
            limitComment,
            orderByComment,
            startId
        } = props;

        const docRef = collection(db, "chats",
            combinedId,
            "messages");

        const queryRef = limitComment ? query(
            docRef,
            orderBy("createMessage", orderByComment),
            limit(limitComment),
            startAfter(startId)) :
            query(
                docRef,
                orderBy("createMessage", orderByComment),
                startAfter(startId));


        try {
            const res = await getDocs(queryRef);
            const results = (res.docs.map((data) => {
                return {...data.data(), id: data.id}
            }));
            setLoadPageMessages(false);
            return results;


        } catch (error) {
            setLoadPageMessages(false);
        }
    };


    return {
        loadingCreateUserChat,
        loadingCreateChat,
        loadingGetUserChats,
        loadingGetUserChat,
        loadingCheckChat,
        loadingAddMessageCombinedChat,
        loadingGetMessagesCombinedChat,
        loadingGetTotalMessagesCombinedChat,
        loadingSetTotalMessagesCombinedChat,
        loadingDeleteMessageCombinedChat,
        loadingGetMessages,
        loadingLoadPageMessages,
        loadingDeleteUnreadMessage,
        loadingGetUnreadMessages,


        getUnreadMessages,
        deleteUnreadMessages,
        addMessageCombinedChat,
        getMessagesCombinedChat,
        createUserChat,
        createChat,
        getUserChats,
        getUserChat,
        CheckChat,
        setTotalMessagesCombinedChat,
        getTotalMessagesCombinedChat,
        createCombinedId,
        loadMessagesPage,
        getMessages,
        deleteMessageCombinedChat
    };
}