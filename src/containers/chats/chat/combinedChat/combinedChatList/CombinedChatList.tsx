import React, {FC, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {IMessage, IUnreadMessages} from "../../../../../types/chats";

import CombinedChatItem from "./combinedChatItem/CombinedChatItem";

import styles from './styles.module.scss'
import {useAppSelector} from "../../../../../hooks/redux";
import {useChats} from "../../../../../hooks/useChats/useChats";
import AddIcon from '@mui/icons-material/Add';
import LoadingButton from '@mui/lab/LoadingButton';

import {db} from "../../../../../firebase/firebase";

import {doc, onSnapshot,collection} from "firebase/firestore";
import ChatForwardSidebar from "../chatForwardSidebar/ChatForwardSidebar";
import {AnimatePresence, motion} from "framer-motion";



interface ICombinedChatListProps {
    combinedId: string,
    userId:string
}

const CombinedChatList: FC<ICombinedChatListProps> = ({combinedId,userId}) => {


    const {id: currentUserId} = useAppSelector(state => state.user);


    const [messages, setMessages] = useState<IMessage[]>();
    const[unreadMessages,setUnreadMessages] = useState<IUnreadMessages[]>();
    const[unreadMessagesInterlocutor,setUnreadMessagesInterlocutor] = useState<IUnreadMessages[]>();
    const [firstRender, setFirstRender] = useState<boolean>(false);
    const [scroll, setScroll] = useState<boolean>(false);
    const [totalMessages, setTotalMessages] = useState<number>(0);
    const[selectMessages,setSelectMessages] = useState<string[]>([]);


    const {
        getMessages,
        loadMessagesPage,
        loadingLoadPageMessages,
        loadingGetMessages,

    } = useChats();

    const messagesEndRef = useRef(null);



    const scrollToBottom = () => {
        //@ts-ignore
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    };


    useEffect(() => {
        if (combinedId && db) {
            onGetMessages();

        }

    }, [combinedId]);

    useLayoutEffect(()=>{

       if(messages && !firstRender) {
           scrollToBottom();
           setFirstRender(true);
       }

        if(scroll && messages  &&  messages.length  ){
            scrollToBottom()
        }
    },[messages]);


    const onGetMessages = async () => {
        const res = await getMessages({
            limitComment: 10,
            orderByComment: "desc",
            combinedId
        });
        //@ts-ignore
        const resReverse = res.reverse();
        //@ts-ignore
        setMessages(resReverse);
        setScroll(true)
    };

    const onLoadOldMessages = async () => {
        if (messages && messages.length) {
            const res = await loadMessagesPage({
                limitComment: 7,
                orderByComment: "desc",
                startId: messages[0].createMessage,
                combinedId
            });
            // @ts-ignore
            const resReverse = res.reverse();
            // @ts-ignore
            setMessages(prevState => [...resReverse, ...prevState]);
            setScroll(false)

        }
    };

    const onLoadNewMessages = async () => {
        if (messages && messages.length) {
            const res = await loadMessagesPage({
                orderByComment: "asc",
                startId: messages[messages.length -1].createMessage,
                combinedId
            });
            // @ts-ignore
            setMessages(prevState => [...prevState, ...res]);
            setScroll(true)



        }
    };


    let unsub = () => {
    };

    useEffect(() => {
        if (combinedId && db) {
            unsub = onSnapshot(doc(db, "chats", combinedId), (doc) => {
                if (doc.exists()) {
                    setTotalMessages(doc.data().totalMessages);
                }
            });
        }

        return () => {
            unsub();
        }
    }, [combinedId, db]);



    let unsubUnreadMessageInterlocutor = () => {};

    useEffect(() => {
        if (db && combinedId) {
            unsubUnreadMessageInterlocutor = onSnapshot(
                collection(db, "users", userId, 'userChats' , combinedId,"unreadMessages"),
                (snapShot) => {
                    let list: any = [];
                    snapShot.docs.forEach((doc) => {
                        list.push({id: doc.id, ...doc.data()});
                    });
                    setUnreadMessagesInterlocutor(list);
                },
                (error) => {
                    console.log(error);
                }
            );

        }

        return () => {
            unsubUnreadMessageInterlocutor();
        };
    }, [db, combinedId]);







    let unsubUnreadMessages  = () => {};

    useEffect(() => {
        if(db && combinedId){
            unsubUnreadMessages = onSnapshot(
                collection(db, "users", currentUserId, 'userChats' , combinedId,"unreadMessages"),
                (snapShot) => {
                    let list: any = [];
                    snapShot.docs.forEach((doc) => {
                        list.push({id: doc.id, ...doc.data()});
                    });
                    setUnreadMessages(list);
                },
                (error) => {
                    console.log(error);
                }
            );
        }

        return () => {
            unsubUnreadMessages();
        };
    }, [db, combinedId]);

    useEffect(() =>{
        if (messages && messages.length) {
            onLoadNewMessages();
        }else if (combinedId && db){
            onGetMessages();
        }

    },[totalMessages]);

    const onChangeSelectMessages = (messageId:string) => {
        setSelectMessages([...selectMessages,messageId])
    };


    const list = messages && messages?.map((item) => {
        return <CombinedChatItem
            unreadMessages={unreadMessages}
            userChatId={combinedId}
            key={item.id}
            onChangeSelectMessages={onChangeSelectMessages}
            setSelectMessages={setSelectMessages}
            selectMessages={selectMessages}
            unreadMessagesInterlocutor={unreadMessagesInterlocutor}
            {...item}
        />
    });




    return (
        <div className={styles.root}>
            <AnimatePresence>
                {selectMessages && messages && selectMessages.length?  <motion.div
                    className={styles.sidebarForward}
                    key={'sidebarForward'}
                    initial={{
                        y:-40}}
                    animate={{
                        y:0
                    }}
                    exit={{
                        y:-40
                    }}>
                  <ChatForwardSidebar
                      messages={messages}
                      setSelectMessages={setSelectMessages}
                      setMessages={setMessages}
                        selectMessages={selectMessages}
                      combinedId={combinedId}
                      userId={userId}
                    />

                </motion.div> : null}
            </AnimatePresence>
            {messages &&  totalMessages > messages.length ?   <LoadingButton
                loading={loadingLoadPageMessages}
                disabled={loadingLoadPageMessages}
                onClick={onLoadOldMessages}
                className={styles.btn}
                variant="text" color="secondary">
                <AddIcon
                    fontSize={'small'}
                />
            </LoadingButton> : null }

            <div

                className={styles.list}>
                {list}
                <div ref={messagesEndRef}/>
            </div>

        </div>
    );
};

export default CombinedChatList;