import React, {useEffect, useState} from 'react';
import ChatItem from "./chatItem/ChatItem";


import styles from './styles.module.scss'
import {useChats} from "../../../hooks/useChats/useChats";
import {useAppSelector} from "../../../hooks/redux";
import {IChatUser} from "../../../types/chats";
import {db} from "../../../firebase/firebase";




import {doc,
    onSnapshot
    ,collection,
    query,orderBy} from "firebase/firestore";
import NotItems from "../../../components/notItems/NotItems";


const ChatsList = () => {


    const {id} = useAppSelector(state => state.user);

    const {getUserChats, loadingGetUserChats} = useChats();

    const [chats, setChats] = useState<IChatUser[]>([]);

    const onGetUserChat = async () => {
        const res = await getUserChats({
            currentUserId: id
        });
        //@ts-ignore
        setChats(res);
    };
    useEffect(() => {
        if (id) {
            onGetUserChat();
        }
    }, [id]);

    let unsub = () => {};

    useEffect(() => {
        if(db && id){
            unsub = onSnapshot(
                query(collection(db, "users", id, 'userChats'), orderBy('lastMessageTimeStamp', 'desc'),),
                (snapShot) => {
                    let list: any = [];
                    snapShot.docs.forEach((doc) => {
                        list.push({id: doc.id, ...doc.data()});
                    });
                    setChats(list);
                },
                (error) => {
                    console.log(error);
                }
            );


        }

        return () => {
            unsub();
        };
    }, [db, id]);

    const listChats = chats && chats.map((item) => {
        return <ChatItem
            key={item.id}
            {...item}
        />


    });

    return (
        <div className={styles.list}>
            {chats.length ? listChats : !loadingGetUserChats ? <NotItems text={'у вас ще немає чатів..'}/> : null }

        </div>
    );
};

export default ChatsList;