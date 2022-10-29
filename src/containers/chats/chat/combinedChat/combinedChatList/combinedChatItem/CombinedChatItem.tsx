import React, {FC, useEffect} from 'react';
import styles from "./styles.module.scss";
import {Paper, Typography} from "@mui/material";
import {IMessage, IUnreadMessages} from "../../../../../../types/chats";
import {convertSecondstoDate, OptionsDateTimeComment,OptionsTimeMessage} from "../../../../../../helpers/date";
import {useAppSelector} from "../../../../../../hooks/redux";
import {useInView} from "react-intersection-observer";
import {useChats} from "../../../../../../hooks/useChats/useChats";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import {AnimatePresence, motion} from "framer-motion";
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';

interface ICombinedChatItemProps extends IMessage {
    unreadMessages?: IUnreadMessages[]
    userChatId: string,
    onChangeSelectMessages: (messageId: string) => void,
    setSelectMessages: (deleteMessages: string[]) => void,
    selectMessages: string[],
    unreadMessagesInterlocutor:IUnreadMessages[] | undefined
}

const CombinedChatItem: FC<ICombinedChatItemProps> = ({
                                                          userId,
                                                          text,
                                                          createMessage,
                                                          id: idMessages,
                                                          unreadMessages,
                                                          userChatId,
                                                          onChangeSelectMessages,
                                                          selectMessages,
                                                          setSelectMessages,
                                                          unreadMessagesInterlocutor

                                                      }) => {
    const {id: currentUserId} = useAppSelector(state => state.user);
    const date = createMessage ? convertSecondstoDate(createMessage.seconds) : new Date();
    const UAdate = new Intl.DateTimeFormat('uk', OptionsTimeMessage).format(date);

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


    const activeMessage = selectMessages.includes(idMessages);
    const onSelectMessages = () => {
        if (activeMessage) {
            setSelectMessages(selectMessages.filter(item => item !== idMessages))
        } else {
            onChangeSelectMessages(idMessages)
        }
    };

    const notUnreadMessage = unreadMessagesInterlocutor && unreadMessagesInterlocutor.find(element => element.id === idMessages);


    return (

        <div>

            <div
                onClick={onSelectMessages}
                className={styles.root}
                style={{
                    flexDirection: currentUserId && currentUserId === userId ? 'row-reverse' : 'row',
                    backgroundColor: activeMessage ? 'rgba(192,192,192, .1)' : 'transparent',
                }}
            >

                <AnimatePresence>
                {currentUserId && !(currentUserId === userId) && selectMessages.length ? <motion.div
                    key={idMessages +'pl'}
                    initial={{
                        paddingLeft:0}}
                    animate={{
                        paddingLeft:40
                    }}
                    exit={{
                        paddingLeft:0
                    }}
                    style={{overflow:'hidden'}}
                >
                </motion.div> : null}
            </AnimatePresence>




                <Paper
                    className={styles.content}>
                    <AnimatePresence>
                        {selectMessages.length ? <motion.div
                            style={{overflow:'hidden'}}
                            key={idMessages}
                            initial={{
                                x:-40}}
                            animate={{
                                x:0
                            }}
                            exit={{
                                x:-40
                            }}

                            className={styles.delete}>
                            {!activeMessage ? <RadioButtonUncheckedIcon/> : <CheckCircleOutlineIcon
                                color={'info'}
                            />}

                        </motion.div> : null}
                    </AnimatePresence>


                    <Typography

                        ref={ref}
                        variant="caption"
                        color="text.other"
                        className={styles.text}>
                        {text}
                    </Typography>
               <div className={styles.inner}>
                   <Typography className={styles.date}
                               color={"text.primary"}
                               variant="caption"
                   >{UAdate}</Typography>

                   <div className={styles.unreadState}>
                       {notUnreadMessage &&  currentUserId === userId ?<DoneIcon
                           className={styles.iconUnread}
                       /> : !notUnreadMessage &&  currentUserId === userId ?  <DoneAllIcon
                           className={styles.iconUnread}
                       /> : null}
                   </div>
               </div>




                </Paper>


            </div>

        </div>
    );
};

export default CombinedChatItem;