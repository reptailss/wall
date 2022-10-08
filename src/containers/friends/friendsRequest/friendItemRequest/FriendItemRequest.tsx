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
import AddMessageBtn from "../../../chats/addMessageBtn/AddMessageBtn";

interface IFriendItemRequestProps extends IFriendItem {
    path: 'otherRequest' | 'myRequest'
}


const FriendItemRequest: FC<IFriendItemRequestProps> = ({id, path}) => {
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
        confirmFriend,
        deleteMyRequest,
        deleteOtherRequest,

        loadingDeleteOtherRequest,
        loadingDeleteMyRequest,
        loadingConfirmFriend,

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

    const onConfirmFriend = async () => {
        await confirmFriend({
            userId: id, currentUserId
        });
    };

    const onDeleteOtherRequest = async () => {
        await deleteOtherRequest({
            userId: id,
            currentUserId
        });
    };

    const onDeleteMyRequest = async () => {
        await deleteMyRequest({
            userId: id,
            currentUserId
        });

    };

    const loadingBtn = loadingConfirmFriend
        || loadingDeleteMyRequest
        || loadingDeleteOtherRequest;

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
            <div className={styles.sidebar}>
             <div className={styles.messages}>
                 <AddMessageBtn userId={id}/>
             </div>

                {path === 'otherRequest' ? <>
                        <LoadingButton
                            loading={loadingBtn}
                            onClick={onConfirmFriend}
                            disabled={loadingBtn}
                            className={styles.btn}
                            size={'small'}
                            variant="outlined" color="secondary">
                            підтвредити
                        </LoadingButton>
                        <LoadingButton
                            loading={loadingBtn}
                            onClick={onDeleteOtherRequest}
                            disabled={loadingBtn}
                            className={styles.btn}
                            size={'small'}
                            variant="outlined" color="secondary">
                            відхилити
                        </LoadingButton>
                    </> :
                    <>
                        <LoadingButton
                            loading={loadingBtn}
                            onClick={onDeleteMyRequest}
                            disabled={loadingBtn}
                            className={styles.btn}
                            size={'small'}
                            variant="outlined" color="secondary">
                            відмінити заявку
                        </LoadingButton>
                    </>}
            </div>
        </Paper>
    );
};

export default FriendItemRequest;