import React, {FC, useEffect, useState} from 'react';
import {useUsers} from "../../../../hooks/useUser/UseUser";
import {IUserProfile} from "../../../../types/profile";
import {Avatar, Typography} from "@mui/material";
import styles from "./styles.module.scss";
import {IFriendItem} from "../../../../types/friends";
import SkeletonText from "../../../../components/skeletons/SkeletonText";
import Link from "next/link";
import LinkMU from '@mui/material/Link'
import {useRouter} from "next/router";
import {useAppSelector} from "../../../../hooks/redux";

interface IUserSidebarItemProps extends IUserProfile{
    loadingGetNewUsers: boolean,
}


const  UserSidebarItem: FC<IUserSidebarItemProps> = ({name, currentAvatar,id,loadingGetNewUsers}) => {

const{id:currentUserId} = useAppSelector(state => state.user);


    const {pathname} = useRouter();

    const linkUser= pathname.includes('/users') ? `../users/${id}` :`users/${id}`;

    const myPage = id === currentUserId;


    return (
                <>
                    {!myPage ? <Link href={linkUser}>
                        <LinkMU underline="none"
                                component="div"
                                className={styles.link}
                                color="secondary">

                            <Avatar
                                className={styles.avatar}
                                alt="avatar" src={currentAvatar}/>

                            <Typography
                                className={styles.name}
                                color={'text.other'}
                                variant={'body2'}
                            >
                                {loadingGetNewUsers ? <SkeletonText/> : id}
                            </Typography>
                        </LinkMU>
                    </Link>: null}
                </>

    );
};

export default UserSidebarItem;