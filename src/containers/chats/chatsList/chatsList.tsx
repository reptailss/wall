import React, {useEffect, useState} from 'react';
import ChatItem from "./chatItem/ChatItem";


import styles from './styles.module.scss'
import {useChats} from "../../../hooks/useChats/useChats";
import {useAppSelector} from "../../../hooks/redux";
import {IChatUser} from "../../../types/chats";

const ChatsList = () => {


    const {id} = useAppSelector(state => state.user);

    const {getUserChats, loadingGetUserChats} = useChats();

    const [chats, setChats] = useState<IChatUser[]>([]);

    const onGetUserChat = async () => {
        const res = await getUserChats({
            currentUserId: id
        });
        console.log(res)
        //@ts-ignore
        setChats(res);
    };
    useEffect(() => {
        if (id) {
            onGetUserChat();
        }
    }, [id]);

    const listChats = chats && chats.map((item) => {
        return <ChatItem
            key={item.id}
            {...item}
        />


    });

    return (
        <div className={styles.list}>
            {listChats}
        </div>
    );
};

export default ChatsList;