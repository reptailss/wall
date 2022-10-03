import {Paper, Typography} from "@mui/material";
import AvatarUserSmall from "../../../../components/avatarUserSmall/AvatarUserSmall";


import styles from './styles.module.scss'
import {FC, useEffect, useState} from "react";
import {ITimestamp} from "../../../../types/timestamp";
import {useUsers} from "../../../../hooks/useUser/UseUser";


import Link from "next/link";
import LinkMU from '@mui/material/Link'
import SkeletonText from "../../../../components/skeletons/SkeletonText";
import {IChatUser} from "../../../../types/chats";


const ChatItem: FC<IChatUser> = ({lastMessage, interlocutorId, createUserChat,id}) => {

    const [avatar, setAvatar] = useState<string>('');


    const {getUserProfileOther,loadingGetUserProfileOther} = useUsers();

    const onGetUserProfile = async () => {
        const res = await getUserProfileOther(interlocutorId);
        //@ts-ignore
        setAvatar(res.currentAvatar);
    };

    useEffect(() => {
        if (interlocutorId) {
            onGetUserProfile();
        }
    }, [interlocutorId]);

    return (

        <Link href={`/userChat/${id}`}>
            <LinkMU underline="none">
                <Paper
                    className={styles.root}
                >


                    <Link href={`/users/${interlocutorId}`}>
                        <LinkMU underline="none">
                            <AvatarUserSmall
                                pathImg={avatar}
                            />
                        </LinkMU>
                    </Link>

                    <div
                        className={styles.inner}
                    >

                        <Link href={`/users/${interlocutorId}`}>
                            <LinkMU underline="none">
                                <Typography
                                    variant={'body2'}
                                    className={styles.name}>
                                    {loadingGetUserProfileOther ? <div className={styles.skeletonName}><SkeletonText/></div> : interlocutorId}
                                </Typography>
                            </LinkMU>
                        </Link>



                        <Typography
                            color={'text.other'}
                            variant={'body2'}
                            className={styles.messages}>
                            {loadingGetUserProfileOther ? <div className={styles.skeletonMessage}><SkeletonText/></div> : interlocutorId}
                        </Typography>
                    </div>

                </Paper>
            </LinkMU>
        </Link>

    );
};

export default ChatItem;