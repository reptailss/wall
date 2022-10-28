import React, {FC, useEffect} from 'react';
import styles from "./styles.module.scss";
import {Paper, Typography} from "@mui/material";
import {IMessage, IUnreadMessages} from "../../../../../../types/chats";
import {convertSecondstoDate, OptionsDateTimeComment} from "../../../../../../helpers/date";
import {useAppSelector} from "../../../../../../hooks/redux";
import {useInView} from "react-intersection-observer";
import {useChats} from "../../../../../../hooks/useChats/useChats";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

interface ICombinedChatItemProps extends IMessage {
    unreadMessages?: IUnreadMessages[]
    userChatId: string,
    onChangeDeleteMessages: (messageId:string) => void,
    setDeleteMessages: (deleteMessages:string[]) => void,
    deleteMessages: string[]
}

const CombinedChatItem: FC<ICombinedChatItemProps> = ({
                                                          userId,
                                                          text,
                                                          createMessage,
                                                          id: idMessages,
                                                          unreadMessages,
                                                          userChatId,
                                                          onChangeDeleteMessages,
                                                          deleteMessages,
                                                          setDeleteMessages

                                                      }) => {
    const {id: currentUserId} = useAppSelector(state => state.user);
    const date = createMessage ? convertSecondstoDate(createMessage.seconds) : new Date();
    const UAdate = new Intl.DateTimeFormat('uk', OptionsDateTimeComment).format(date);

    const {deleteUnreadMessages, loadingDeleteUnreadMessage, deleteMessageCombinedChat} = useChats();

    const {ref, inView, entry} = useInView({
        /* Optional options */
        threshold: 0,
    });

    const onDeleteUnreadMessage = async (id: string) => {
        await deleteUnreadMessages({
            currentUserId, userChatId, idMessages: id
        })
    };

    useEffect(() => {
        if (inView && unreadMessages) {
            const unread = unreadMessages.find(element => element.id === idMessages);
            if (!loadingDeleteUnreadMessage && unread) {
                onDeleteUnreadMessage(unread.id);
            }
        }
    }, [inView, unreadMessages]);



    const activeMessage = deleteMessages.includes(idMessages);
    const onDeleteMessages =  () => {
        if(activeMessage){
            setDeleteMessages( deleteMessages.filter(item => item !== idMessages))
        } else{
            onChangeDeleteMessages(idMessages)
        }
    };




    return (
        <div
            onClick={onDeleteMessages}
            className={styles.root}
            style={{flexDirection: currentUserId && currentUserId === userId ? 'row-reverse' : 'row',
                backgroundColor: activeMessage ? 'rgba(192,192,192, .1)' : 'transparent'
            }}
        >
            <Paper
                // style={style}
                className={styles.content}>
                {deleteMessages.length ?    <div className={styles.delete}>
                    {!activeMessage ? <RadioButtonUncheckedIcon/> : <CheckCircleOutlineIcon
                        color={'info'}
                    /> }

                </div> : null}
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