
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import {FC, useEffect, useState} from "react";

import { collectionGroup, query, where, getDocs ,onSnapshot} from "firebase/firestore";
import {db} from "../../../firebase/firebase";
import {IUnreadMessages} from "../../../types/chats";
import {useAppSelector} from "../../../hooks/redux";

const MessageBtnState:FC = () => {
    const[unreadMessages,setUnreadMessages] = useState<IUnreadMessages[]>();

    const{id} = useAppSelector(state => state.user);



    let unsubUnreadMessages  = () => {};

    useEffect(() => {
        if(db){
            unsubUnreadMessages = onSnapshot(
                query(collectionGroup(db, 'unreadMessages'),where('whoId', '==', id)),
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
    }, [db]);

    const num = unreadMessages && unreadMessages.length ? unreadMessages.length : 0;

    return (
        <>

            <Badge badgeContent={num} color="primary">
                <MailIcon  fontSize="large" color="action" />
            </Badge>
        </>
    );
};

export default MessageBtnState;