import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import ChatSidebar from "./chatSidebar/chatSidebar";
import {useChats} from "../../../hooks/useChats/useChats";
import {useAppSelector} from "../../../hooks/redux";
import {IChatUser} from "../../../types/chats";
import AddCombinedMessage from "./combinedChat/addCombinedMessage/AddCombinedMessage";

import styles from './styles.module.scss'
import CombinedChatList from './combinedChat/combinedChatList/CombinedChatList'
import NotItems from "../../../components/notItems/NotItems";


const Chat = () => {

    const {id: currentUserId} = useAppSelector(state => state.user);

    const {getUserChat,loadingGetUserChats} = useChats();

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



    return (

        <div className={styles.root}>
            {chatData && chatData.ownerChat === currentUserId ? <>
                {chatData && <div className={styles.sidebar}>
                    <ChatSidebar
                        userId={chatData.interlocutorId}/>
                </div>}

                <div className={styles.chatlist}>

                    {chatData &&     <CombinedChatList
                        userId={chatData.interlocutorId}
                        combinedId={id}
                    />}
                </div>
                {chatData &&   <AddCombinedMessage
                    combinedId={id}
                    userId={chatData.interlocutorId}
                />}
            </>: !loadingGetUserChats ? <NotItems text={'у вас немає доступу до цього чату...'}/> : null}
        </div>
    );
};


export default Chat;