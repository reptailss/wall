import React, {FC, useEffect, useState} from 'react';
import {useUsers} from "../../../../hooks/useUser/UseUser";
import {IUserProfile} from "../../../../types/profile";
import {Avatar, Paper, Typography} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import styles from "./styles.module.scss";
import {IFriendItem} from "../../../../types/friends";
import SkeletonText from "../../../../components/skeletons/SkeletonText";
import Link from "next/link";
import LinkMU from '@mui/material/Link'
import {useAppSelector} from "../../../../hooks/redux";
import {useFriends} from "../../../../hooks/useFriends/useFriends";

interface IFriendItemRequestProps extends IFriendItem{
    myPage?: boolean
}


const FriendItemConfirmed: FC<IFriendItemRequestProps> = ({id,myPage}) => {
    const {id: currentUserId} = useAppSelector(state => state.user);
    const [profileFriend, setProfileFriend] = useState<IUserProfile>({
        name: '',
        dateBirth: 0,
        city: '',
        jop: '',
        maritalStatus: '',
        timestamp: {seconds: 0, nanoseconds: 0},
        currentAvatar: ''
    });

    const {
        getUserProfileOther,
        loadingGetUserProfileOther,

    } = useUsers();

    const {

        loadingDeleteFriend,
        deleteFriend
    } = useFriends();

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


    const onDeleteFriend = async () => {
        await deleteFriend({
            userId: id,
            currentUserId

        });

    };
    const {name, currentAvatar} = profileFriend;

    return (
        <Paper className={styles.root}>
            <div className={styles.info}>
                <Link href={`users/${id}`}>
                    <LinkMU underline="none"
                            component="div"
                            color="secondary">
                        <Avatar
                            className={styles.avatar}
                            alt="avatar" src={currentAvatar}/>
                    </LinkMU>
                </Link>
                <Link href={`users/${id}`}>
                    <LinkMU underline="none"
                            component="div"
                            color="secondary">
                        <Typography
                            className={styles.name}
                            variant="body2" color="text.other"
                        >
                            {!loadingGetUserProfileOther ? name : <SkeletonText/>}
                        </Typography>
                    </LinkMU>
                </Link>

            </div>
            {myPage ?  <div className={styles.sidebar}>
                <LoadingButton
                    loading={loadingDeleteFriend}
                    onClick={onDeleteFriend}
                    disabled={loadingDeleteFriend}
                    className={styles.btn}
                    variant="outlined" color="secondary">
                    видалити
                </LoadingButton>
            </div> : null}
        </Paper>
    );
};

export default FriendItemConfirmed;