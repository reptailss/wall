import React, {useEffect,} from 'react';

import AvatarUserSmall from "../../components/avatarUserSmall/AvatarUserSmall";
import Paper from '@mui/material/Paper';
import NavigateItem from "./navigateItem/navigateItem";
import PeopleIcon from '@mui/icons-material/People';
import styles from './styles.module.scss'
import MessageBtnState from "../message/messageBtnState/MessageBtnState";
import avatarsrc from "../../resources/svg/avatar/avatar.svg"
import {useRouter} from "next/router";


const Navigate = () => {
    const {pathname} = useRouter();

    const visibleNavigate = (pathname === '/signin') || (pathname === '/register') || (pathname === '/sendpassword') ;

    const navigateData = [
        {
            icon: <AvatarUserSmall
                pathImg={`${avatarsrc}`}
            />, text: 'Моя сторінка', path: '/'
        },
        {
            icon: <PeopleIcon
                fontSize="large"
            />, text: 'Друзі', path: '/friends'
        },
        {icon: <MessageBtnState/>, text: 'Повідомлення', path: '/message'},
    ];

    const navigateList = navigateData.map((item) => {
        return <NavigateItem key={item.text} {...item}/>
    });

    return (
        <>
            {!visibleNavigate && <Paper

                className={styles.root}>
                {navigateList}
            </Paper>}
        </>

    );
};

export default Navigate;