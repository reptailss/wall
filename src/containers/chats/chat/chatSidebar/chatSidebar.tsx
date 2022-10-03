import React, {FC, useEffect, useState} from 'react';
import {IUserProfile} from "../../../../types/profile";
import {useUsers} from "../../../../hooks/useUser/UseUser";
import AvatarUserSmall from "../../../../components/avatarUserSmall/AvatarUserSmall";
import styles from './styles.module.scss'
import {Button, ButtonGroup, Paper, Typography} from "@mui/material";

import BackBtn from "../../../../components/backBtn/BackBtn";

interface IChatSidebarProps {
    userId: string,
    onChangeDirection: (direction: 'asc' | 'desc') => void,
    direction: 'asc' | 'desc',
}

const ChatSidebar: FC<IChatSidebarProps> = ({userId, direction, onChangeDirection}) => {

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


const variantAsc = direction === 'asc' ? 'contained' : 'outlined';
const variantDesc = direction === 'desc' ? 'contained' : 'outlined';

return (
    <Paper className={styles.root}>
        <BackBtn
            path={'/chats'}
            text={'діалоги'}
        />
        <div>
            <div
                className={styles.btnswrap}>
                <Typography
                    className={styles.text}
                    color={'text.other'}
                    variant="body2"
                    component="h1">
                    спочатку
                </Typography>;
                <ButtonGroup
                    className={styles.btns}
                    disableElevation
                    aria-label="Disabled elevation buttons">
                    <Button
                        size={'small'}
                        className={styles.btn}
                        variant={variantAsc}
                        onClick={() => {onChangeDirection('asc')}}
                    >старі</Button>
                    <Button
                        size={'small'}
                        className={styles.btn}
                        variant={variantDesc}
                        onClick={() => {onChangeDirection('desc')}}
                    >нові</Button>
                </ButtonGroup>
            </div>
        </div>
        <div className={styles.info}>
            <AvatarUserSmall
                pathImg={currentAvatar}
            />
            <Typography
                className={styles.name}
                color={'text.primary'}
                variant={'body2'}>
                {userId}
            </Typography>

        </div>
    </Paper>
);
}
;

export default ChatSidebar;