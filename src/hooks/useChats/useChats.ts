import {collection,
    doc,
    getDoc,
    getDocs,
    serverTimestamp,
    setDoc,
    updateDoc,
    orderBy,
    limit,
    startAfter,
    query,
} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {useState} from "react";

import {useSnackBar} from "../useSneckBar/useSnackBars";

import {
    IAddMessageCombinedChatProps,
    ICheckChatProps,
    ICreateChatProps,
    ICreateUserChatProps,
    IGetMessagesCombinedChatProps,
    IGetTotalMessagesCombinedChatProps,
    IGetUserChatProps,
    IGetUserChatsrops, IMessagesProps,
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

    const [loadingGetMessagesCombinedChat,
        setLoadingGetMessagesCombinedChat] = useState<boolean>(false);


    const [loadingGetTotalMessagesCombinedChat,
        setLoadingGetTotalMessagesCombinedChat] = useState<boolean>(false);

    const [loadingSetTotalMessagesCombinedChat,
        setLoadingSetMessagesCombinedChat] = useState<boolean>(false);


    const [loadingGetMessages,
        setLoadingGetMessages] = useState<boolean>(false);
    const [loadingLoadPageMessages,
        setLoLoadPageMessages] = useState<boolean>(false);


    const createCombinedId = (props: ICreateChatProps) => {

        const {userId, currentUserId} = props;

        return currentUserId > userId
            ? currentUserId + userId
            : currentUserId + userId
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
                lastMessage: '',
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
                lastMessage: '',
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


    const addMessageCombinedChat = async (props: IAddMessageCombinedChatProps) => {
        setLoadingAddMessageCombinedChat(true);
        const {combinedId, body} = props;
        try {
            const ref = doc(collection(db, "chats", combinedId, "messages"));
            await setDoc(ref, {
                ...body,
                createMessage: serverTimestamp()
            });
            const oldTotalMessages = await getTotalMessagesCombinedChat({combinedId});
            await setTotalMessagesCombinedChat({
                combinedId,
                totalMessages: oldTotalMessages + 1
            });

            setLoadingAddMessageCombinedChat(false);
        } catch (error: any) {
            setLoadingAddMessageCombinedChat(false);
            setSnackBar(error.code, 'error');
            throw  error;
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
        setLoLoadPageMessages(true);
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

        setLoLoadPageMessages(true);

        try {
            const res = await getDocs(queryRef);
            const results = (res.docs.map((data) => {
                return {...data.data(), id: data.id}
            }));
            setLoLoadPageMessages(false);
            return results;


        } catch (error) {
            setLoLoadPageMessages(false);
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

        loadingGetMessages,
        loadingLoadPageMessages,



        addMessageCombinedChat,
        getMessagesCombinedChat,
        createUserChat,
        createChat,
        getUserChats,
        getUserChat,
        CheckChat,
        setTotalMessagesCombinedChat,
        getTotalMessagesCombinedChat,

        loadMessagesPage,
        getMessages,
    };
}