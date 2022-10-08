import React, {FC, useEffect, useState} from 'react';
import {IUserProfile} from "../../../../types/profile";
import {useUsers} from "../../../../hooks/useUser/UseUser";
import AvatarUserSmall from "../../../../components/avatarUserSmall/AvatarUserSmall";
import styles from './styles.module.scss'
import { Paper, Typography} from "@mui/material";
import Link from "next/link";
import LinkMU from '@mui/material/Link'

import BackBtn from "../../../../components/backBtn/BackBtn";
import Logo from "../../../../components/header/Header";
import {Col} from "react-bootstrap";

interface IChatSidebarProps {
    userId: string,
}

const ChatSidebar: FC<IChatSidebarProps> = ({userId }) => {

    const [profileUserOther, setrofileUserOther] = useState<IUserProfile>({
        name: '',
        dateBirth: 0,
        city: '',
        jop: '',
        maritalStatus: '',
        timestamp: {seconds: 0, nanoseconds: 0},
        currentAvatar: ''
    });


    const {getUserProfileOther} = useUsers();


    const onGetUser = async () => {
        const res = await getUserProfileOther(userId);
        //@ts-ignore
        setrofileUserOther(res);
    };

    useEffect(() => {
        if (userId) {
            onGetUser();
        }

    }, [userId]);

    const {currentAvatar} = profileUserOther;




return (
    <Paper className={styles.root}>
        <BackBtn
            path={'/chats'}
            text={'діалоги'}
        />
        <div className={styles.info}>



            <Link href={`/users/${userId}`}>
                <LinkMU underline="none"
                        component="div"
                >
                    <AvatarUserSmall
                        pathImg={currentAvatar}
                    />
                </LinkMU>
            </Link>

            <Link href={'/'}>
                <LinkMU underline="none"
                        component="div"
                        color="secondary"
                        className={styles.logo}>
                    <Typography
                        className={styles.name}
                        color={'text.primary'}
                        variant={'body2'}>
                        {userId}
                    </Typography>
                </LinkMU>
            </Link>

        </div>
    </Paper>
);
}
;

export default ChatSidebar;