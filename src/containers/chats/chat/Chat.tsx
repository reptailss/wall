import React, {useEffect, useRef, useState,useLayoutEffect} from 'react';
import {useRouter} from "next/router";
import ChatSidebar from "./chatSidebar/chatSidebar";
import {useChats} from "../../../hooks/useChats/useChats";
import {useAppSelector} from "../../../hooks/redux";
import {IChatUser, IMessage} from "../../../types/chats";
import SpinnerBlock from "../../../components/spinner/Spinner";
import AddCombinedMessage from "./combinedChat/addCombinedMessage/AddCombinedMessage";

import styles from './styles.module.scss'
import {ITimestamp} from "../../../types/timestamp";
import {db} from "../../../firebase/firebase";

import useInfiniteScroll from "react-infinite-scroll-hook";

import CombinedChatItem from "./combinedChat/combinedChatList/combinedChatItem/CombinedChatItem";
import CombinedChatList from './combinedChat/combinedChatList/CombinedChatList'

import {doc, onSnapshot} from "firebase/firestore";


const Chat = () => {

    const {id: currentUserId} = useAppSelector(state => state.user);

    const {getUserChat} = useChats();

    const [chatData, setChatData] = useState<IChatUser>();

    const onGetUserChat = async () => {
        const res = await getUserChat({
            userChatId: id,
            currentUserId
        });
        //@ts-ignore
        setChatData(res);

    };

    useEffect(() => {

        if (currentUserId && id) {
            onGetUserChat();
        }

    }, [currentUserId]);

    const router = useRouter();
    const {id}: any = router.query;

    const [messages, setMessages] = useState<IMessage[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    const [totalMessages, setTotalMessages] = useState<number>(0);
    const messagesEndRef = useRef(null);
    const scrollBottomRef = useRef(null);
    const [direction, setDirection] = useState<'asc' | 'desc'>('desc');

    const {
        getMessages,
        loadMessagesPage,
        loadingLoadPageMessages,
        loadingGetMessages,

    } = useChats();

    useEffect(() => {
        if (id && db) {
            onGetMessages();
        }

    }, [id, direction]);


    const scrollToBottom = () => {
        //@ts-ignore
        scrollBottomRef.current?.scrollIntoView({behavior: "smooth"})
    };

    const onGetMessages = async () => {
        const res = await getMessages({
            limitComment: 14,
            orderByComment: direction,
            combinedId: id
        });
        //@ts-ignore
        const resReverse = res.reverse();
        //@ts-ignore
        setMessages(resReverse);
    };

    const onLoadMessages = async ({limit, directionOrder, startId}: { limit?: number, directionOrder: 'asc' | 'desc', startId: ITimestamp }) => {
        if (messages) {
            setLoading(true);
            if (limit) {
                const res = await loadMessagesPage({
                    limitComment: limit,
                    orderByComment: directionOrder,
                    startId: startId,
                    combinedId: id
                });
                // @ts-ignore
                const resReverse = res.reverse();
                // @ts-ignore
                setMessages(prevState => [...resReverse,...prevState]);
            } else {
                const res = await loadMessagesPage({
                    orderByComment: directionOrder,
                    startId: startId,
                    combinedId: id

                });
                // @ts-ignore
                const resReverse = res.reverse();
                // @ts-ignore
                setMessages(prevState => [ ...resReverse,...prevState]);

            }
            setLoading(false);

        }
    };


    const onLoadNewMessages = async ({limit, directionOrder, startId}: { limit?: number, directionOrder: 'asc' | 'desc', startId: ITimestamp }) => {
        if (messages) {
            setLoading(true);
            if (limit) {
                const res = await loadMessagesPage({
                    limitComment: limit,
                    orderByComment: directionOrder,
                    startId: startId,
                    combinedId: id
                });
                // @ts-ignore
                const resReverse = res.reverse();
                // @ts-ignore
                setMessages(prevState => [...prevState,...res]);
            } else {
                const res = await loadMessagesPage({
                    orderByComment: directionOrder,
                    startId: startId,
                    combinedId: id

                });
                // @ts-ignore
                const resReverse = res.reverse();
                // @ts-ignore
                setMessages(prevState => [ ...prevState,...res]);

            }
            setLoading(false);

        }
    };


    useLayoutEffect( () =>{
        scrollToBottom()
    },[messages]);

    useEffect(()=>{
        if(messages && totalMessages > messages.length){
            onLoadNewMessages({  limit: 3,
                directionOrder: direction,
                startId: messages[0].createMessage});
        }
    },[totalMessages]);

    useEffect(() => {
        if (id && db && currentUserId && messages && messagesEndRef && totalMessages > messages.length) {
            setHasNextPage(true);
        } else {
            setHasNextPage(false);
        }
    }, [totalMessages, messages]);


    let unsub = () => {
    };

    useEffect(() => {
        if (id && db) {
            unsub = onSnapshot(doc(db, "chats", id), (doc) => {
                if (doc.exists()) {
                    setTotalMessages(doc.data().totalMessages);
                }
            });
        }

        return () => {
            unsub();
        }
    }, [id && db]);

    const [sentryRef, {rootRef}] = useInfiniteScroll({
        loading,
        hasNextPage,
        onLoadMore: () => {
            if (messages) {
                onLoadMessages({
                    limit: 3,
                    directionOrder: direction,
                    startId: messages[0].createMessage
                })
            }
        },

    });

    return (

        <div className={styles.root}>
            {chatData ? <ChatSidebar
                direction={direction}
                onChangeDirection={setDirection}
                userId={chatData.interlocutorId}/> : <SpinnerBlock/>}
            <div className={styles.chatlist}>

                <div
                    ref={rootRef}
                    className={styles.list}>
                    <div ref={messagesEndRef}/>
                    {(loading || hasNextPage) && (
                        <div className={styles.spinnerinner}
                             ref={sentryRef}>
                            <SpinnerBlock/>
                        </div>
                    )}
                    {messages && <CombinedChatList
                        messages={messages}
                    />}

                    <div ref={scrollBottomRef}/>
                </div>



            </div>
            <AddCombinedMessage
                combinedId={id}
            />
        </div>
    );
};


export default Chat;