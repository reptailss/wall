import React, {FC} from 'react';

import AvatarUserSmall from "../../components/avatarUserSmall/AvatarUserSmall";
import Paper from '@mui/material/Paper';
import NavigateItem from "./navigateItem/navigateItem";
import styles from './styles.module.scss'
import MessageBtnState from "../chats/messageBtnState/MessageBtnState";
import {useRouter} from "next/router";
import FriendsBtnState from "../friends/FriendsBtnState/FriendsBtnState";
import GradeIcon from '@mui/icons-material/Grade';
import {useAppSelector} from "../../hooks/redux";
import SearchIcon from '@mui/icons-material/Search';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';


interface INavigateProps {
    transparent?: boolean,
    onClickNavigateItem?: () => void,
}

const Navigate: FC<INavigateProps> = ({transparent,onClickNavigateItem}) => {
    const {pathname} = useRouter();

    const visibleNavigate = (pathname === '/signin') || (pathname === '/register') || (pathname === '/sendpassword');

    const {totalFriends, profile} = useAppSelector(state => state.user);
    const {totalOtherRequest} = totalFriends;
    const {currentAvatar} = profile;

    const pathFriends = totalOtherRequest > 0 ? '/friendsOtherRequest' : '/friendsConfirmed';

    const style = {
        backgroundImage: 'none',
        backgroundColor: 'transparent',
        boxShadow: 'none'
    };



    return (
        <>
            {!visibleNavigate && <Paper
                style={transparent ? style : {}}
                className={styles.root}>
                <NavigateItem
                    onClickNavigateItem={onClickNavigateItem}
                    icon={<AvatarUserSmall
                        pathImg={`${currentAvatar}`}
                    />}
                    text={'Моя сторінка'}
                    path={'/'}
                />

                <NavigateItem
                    onClickNavigateItem={onClickNavigateItem}
                    icon={<EmojiPeopleIcon
                        fontSize={'large'}
                    />}
                    text={'Люди'}
                    path={'/search'}
                />

                <NavigateItem
                    onClickNavigateItem={onClickNavigateItem}
                    icon={<GradeIcon
                        fontSize={'large'}
                    />}
                    text={'Новини'}
                    path={'/ribbon'}
                />
                <NavigateItem
                    onClickNavigateItem={onClickNavigateItem}
                    icon={<FriendsBtnState
                        firnedsUnmout={totalOtherRequest}
                    />}
                    text={'Друзі'}
                    path={pathFriends}
                />
                <NavigateItem
                    onClickNavigateItem={onClickNavigateItem}
                    icon={<MessageBtnState/>}
                    text={'Повідомлення'}
                    path={'/chats'}
                />




            </Paper>}
        </>

    );
};

export default Navigate;