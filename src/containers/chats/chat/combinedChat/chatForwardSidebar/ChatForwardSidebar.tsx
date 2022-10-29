import React, {FC} from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import styles from "../combinedChatList/styles.module.scss";
import DeleteIcon from '@mui/icons-material/Delete';
import {IMessage} from "../../../../../types/chats";
import {useChats} from "../../../../../hooks/useChats/useChats";
import {useAppSelector} from "../../../../../hooks/redux";
import Badge from '@mui/material/Badge';

interface IChatDeleteSidebarProps {
    selectMessages: string[],
    messages: IMessage[]
    setSelectMessages: (deleteMessages: string[]) => void,
    setMessages: (messages: IMessage[]) => void,
    userId: string,
    combinedId:string
}

const ChatForwardSidebar: FC<IChatDeleteSidebarProps> = ({selectMessages,
                                                             setSelectMessages,
                                                             messages,
                                                             setMessages,
                                                             combinedId,
                                                             userId}) => {

    const {id} = useAppSelector(state => state.user);


    const {deleteMessageCombinedChat, loadingDeleteMessageCombinedChat} = useChats();

    const onDeleteMessage = async () => {
        await deleteMessageCombinedChat({
            messages: selectMessages,
            currentUserId: id,
            userId,
            combinedId
        });
        setTimeout(()=>{
            const newMessages = messages.filter(item => !selectMessages.includes(item.id));
            setMessages(newMessages);
            setSelectMessages([]);
        },250)
    };


    return (
        <div>


            <LoadingButton
                loading={loadingDeleteMessageCombinedChat}
                disabled={loadingDeleteMessageCombinedChat}
                onClick={onDeleteMessage}
                className={styles.btn}
                variant="text" color="secondary">
                <Badge badgeContent={selectMessages.length} color="primary">
                    <DeleteIcon/>
                </Badge>
            </LoadingButton>
        </div>
    );
};

export default ChatForwardSidebar;