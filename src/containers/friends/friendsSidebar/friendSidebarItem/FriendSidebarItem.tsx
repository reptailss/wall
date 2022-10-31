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


interface IFriendItemRequestProps extends IFriendItem {
    myPage?: boolean
}


const FriendSidebarItem: FC<IFriendItemRequestProps> = ({id, myPage}) => {
    const [profileFriend, setProfileFriend] = useState<IUserProfile>({
        name: '',
        dateBirth: 0,
        city: '',
        jop: '',
        maritalStatus: '',
        timestamp: {seconds: 0, nanoseconds: 0},
        currentAvatar: '',
        status:'',
    });

    const {
        getUserProfileOther,
        loadingGetUserProfileOther,

    } = useUsers();



    useEffect(() => {
        if (id) {
            onGetUserProfile();
        }
    }, [id]);


    const onGetUserProfile = async () => {
        const res = await getUserProfileOther(id);
        //@ts-ignore
        setProfileFriend(res);
    };


    const {pathname} = useRouter();

    const linkFriend = pathname.includes('/users') ? `../users/${id}` :`users/${id}`;


    return (
                <Link href={linkFriend}>
                    <LinkMU underline="none"
                            component="div"
                            className={styles.link}
                            color="secondary">

                        <Avatar
                            className={styles.avatar}
                            alt="avatar" src={profileFriend?.currentAvatar}/>

                        <Typography
                            className={styles.name}
                            color={'text.other'}
                            variant={'body2'}
                        >
                            {loadingGetUserProfileOther ? <SkeletonText/> : id}
                        </Typography>
                    </LinkMU>
                </Link>

    );
};

export default FriendSidebarItem;