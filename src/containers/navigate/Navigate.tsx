import React from 'react';

import AvatarUserSmall from "../../components/avatarUserSmall/AvatarUserSmall";
import Paper from '@mui/material/Paper';
import NavigateItem from "./navigateItem/navigateItem";
import styles from './styles.module.scss'
import MessageBtnState from "../chats/messageBtnState/MessageBtnState";
import {useRouter} from "next/router";
import FriendsBtnState from "../friends/FriendsBtnState/FriendsBtnState";
import {useAppSelector} from "../../hooks/redux";


const Navigate = () => {
    const {pathname} = useRouter();

    const visibleNavigate = (pathname === '/signin') || (pathname === '/register') || (pathname === '/sendpassword');

    const {totalFriends,profile} = useAppSelector(state => state.user);
    const {totalOtherRequest} = totalFriends;
    const{currentAvatar} = profile;

    const pathFriends = totalOtherRequest > 0 ? '/friendsOtherRequest' : '/friendsConfirmed';

    return (
        <>
            {!visibleNavigate && <Paper

                className={styles.root}>
                <NavigateItem
                    icon={<AvatarUserSmall
                        pathImg={`${currentAvatar}`}
                    />}
                    text={'Моя сторінка'}
                    path={'/'}
                />
                <NavigateItem
                    icon={<FriendsBtnState
                        firnedsUnmout={totalOtherRequest}
                    />}
                    text={'Друзі'}
                    path={pathFriends}
                />
                <NavigateItem
                    icon={<MessageBtnState/>}
                    text={'Повідомлення'}
                    path={'/chats'}
                />


            </Paper>}
        </>

    );
};

export default Navigate;