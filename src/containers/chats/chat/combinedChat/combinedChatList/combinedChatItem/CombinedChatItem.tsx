import React, {FC, useEffect} from 'react';
import styles from "./styles.module.scss";
import {Paper, Typography} from "@mui/material";
import {IMessage, IUnreadMessages} from "../../../../../../types/chats";
import {convertSecondstoDate, OptionsDateTimeComment} from "../../../../../../helpers/date";
import {useAppSelector} from "../../../../../../hooks/redux";
import {useInView} from "react-intersection-observer";
import {useChats} from "../../../../../../hooks/useChats/useChats";

interface ICombinedChatItemProps extends IMessage{
    unreadMessages?: IUnreadMessages[]
    userChatId:string,
}

const CombinedChatItem: FC<ICombinedChatItemProps> = ({userId, text, createMessage,id:idMessages,unreadMessages,userChatId}) => {
    const {id:currentUserId} = useAppSelector(state => state.user);
    const date = createMessage ? convertSecondstoDate(createMessage.seconds) : new Date();
    const UAdate = new Intl.DateTimeFormat('uk', OptionsDateTimeComment).format(date);

    const{deleteUnreadMessages,loadingDeleteUnreadMessage} = useChats();

    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 0,
    });

    const onDeleteUnreadMessage = async (id:string) =>{
        await  deleteUnreadMessages({
            currentUserId,userChatId,idMessages:id
        })
    };

    useEffect(() =>{
        if(inView && unreadMessages){
           const unread =  unreadMessages.find( element => element.id === idMessages );
           if(!loadingDeleteUnreadMessage && unread){
               onDeleteUnreadMessage(unread.id);
           }
        }
    },[inView,unreadMessages]);

    return (
        <div
            className={styles.root}
            style={{flexDirection: currentUserId && currentUserId === userId ? 'row-reverse' : 'row'}}
        >
            <Paper className={styles.content}>
                <Typography
                    ref={ref}
                    variant="caption"
                    color="text.other"
                    className={styles.text}>
                    {text}
                </Typography>
                <Typography className={styles.date}
                            color={"text.primary"}
                            variant="caption"
                >{UAdate}</Typography>
            </Paper>


        </div>
    );
};

export default CombinedChatItem;