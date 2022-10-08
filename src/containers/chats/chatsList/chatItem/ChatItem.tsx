import {Paper, Typography} from "@mui/material";
import AvatarUserSmall from "../../../../components/avatarUserSmall/AvatarUserSmall";


import styles from './styles.module.scss'
import {FC, useEffect, useState} from "react";
import {useUsers} from "../../../../hooks/useUser/UseUser";


import Link from "next/link";
import LinkMU from '@mui/material/Link'
import SkeletonText from "../../../../components/skeletons/SkeletonText";
import {IChatUser, IUnreadMessages} from "../../../../types/chats";
import {useAppSelector} from "../../../../hooks/redux";
import {useChats} from "../../../../hooks/useChats/useChats";


const ChatItem: FC<IChatUser> = ({lastMessage, interlocutorId, createUserChat, id}) => {

    const {id: currentUserId} = useAppSelector(state => state.user);

    const [unreadMessages, setUnreadMessages] = useState<IUnreadMessages[]>();

    const [avatar, setAvatar] = useState<string>('');

    const {
        getUserProfileOther,
        loadingGetUserProfileOther,
    } = useUsers();

    const {
        getUnreadMessages,
        loadingGetUnreadMessages
    } = useChats();

    const {text, userIdLastMessage} = lastMessage;

    const onGetUserProfile = async () => {
        const res = await getUserProfileOther(interlocutorId);
        //@ts-ignore
        setAvatar(res.currentAvatar);
    };

    const onGetUnreadMessages = async () => {
        const res = await getUnreadMessages({
            currentUserId, userChatId: id
        });
        //@ts-ignore
        setUnreadMessages(res);
    };

    useEffect(() => {
        if (interlocutorId) {
            onGetUserProfile();
        }
    }, [interlocutorId]);


    useEffect(() => {
        if (lastMessage) {
            onGetUnreadMessages();
        }
    }, [lastMessage]);

    return (

        <Link href={`/userChat/${id}`}>
            <LinkMU underline="none"
                    component={'div'}
            >
                <Paper
                    className={styles.root}
                >
                    <Link href={`/users/${interlocutorId}`}>
                        <LinkMU underline="none"
                                component={'div'}
                        >
                            <AvatarUserSmall
                                pathImg={avatar}
                            />
                        </LinkMU>
                    </Link>
                    <div
                        className={styles.inner}
                    >
                        <Typography
                            component={'div'}
                            variant={'body2'}
                            className={styles.name}>
                            {loadingGetUserProfileOther ?
                                <div className={styles.skeletonName}><SkeletonText/></div> : interlocutorId}
                        </Typography>

                      <div className={styles.wrap}>
                          <Typography
                              component={'div'}
                              color={'text.other'}
                              variant={'body2'}
                              className={styles.messages}>
                              {loadingGetUserProfileOther ?
                                  <div className={styles.skeletonMessage}><SkeletonText/></div> :
                                  <>
                                      {userIdLastMessage === currentUserId && 'ви:  '}
                                      {text}
                                  </>}
                          </Typography>

                          {unreadMessages && unreadMessages.length > 0 && unreadMessages.length ?  <Typography
                              variant={'body2'}
                              color={'text.other'}
                              className={styles.unread}>
                              {unreadMessages.length}
                          </Typography> : null }


                      </div>
                    </div>

                </Paper>
            </LinkMU>
        </Link>

    );
};

export default ChatItem;