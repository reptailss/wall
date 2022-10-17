import React, {FC, useEffect} from 'react';
import styles from "./styles.module.scss";
import LoadingButton from '@mui/lab/LoadingButton';
import {useFriends} from "../../../hooks/useFriends/useFriends";
import {useAppSelector} from "../../../hooks/redux";
import {Typography} from "@mui/material";


interface IAddFriendBtnProps {
    userId: string
}

const AddFriendBtn: FC<IAddFriendBtnProps> = ({userId}) => {

    const {id} = useAppSelector(state => state.user);


    const {

        deleteFriend,
        confirmFriend,
        checkFriendStatus,
        addFriend,
        deleteMyRequest,

        statusFriend,

        loadingCheckFriendStatus,
        loadingDeleteFriendsRequest,
        loadingConfirmFriend,
        loadingAddFriend,

    } = useFriends();


    const onAddFriends = async () => {

        await addFriend({
            userId,
            currentUserId: id
        });

        await checkFriend();
    };

    const onDeleteFriends = async () => {
        await deleteFriend({
            userId,
            currentUserId: id
        })
    };


    const onDeleteMyRequest = async () => {

        await deleteMyRequest({
            userId,
            currentUserId: id
        })

    };


    const onConfirmFriend = async () => {
        await confirmFriend({
            userId,
            currentUserId: id
        })
    };


    const checkFriend = async () => {
        await checkFriendStatus({
            userId,
            currentUserId: id
        })
    };

    useEffect(() => {
        if (id) {
            checkFriend();
        }


    }, [id]);

    const loading = loadingDeleteFriendsRequest
        || loadingConfirmFriend
        || loadingAddFriend
        || loadingCheckFriendStatus;

    const text = statusFriend === 'otherRequest' ? 'прийняти заявку'
        : statusFriend === 'myRequest' ? 'відмінити заявку'
            : statusFriend === 'confirm' ? 'видалити друга'
                : 'добавити в друзі';

    const onClickBtn = async () => {
        if (statusFriend === 'initial') {
            await onAddFriends();
        }
        if (statusFriend === 'otherRequest') {
            await onConfirmFriend();
        }
        if (statusFriend === 'myRequest') {
            await onDeleteMyRequest();
        }
        if (statusFriend === 'confirm') {
            await onDeleteFriends();
        }
        await checkFriend();
    };

    return (
        <div className={styles.root}>
            <LoadingButton
                loading={loading}
                onClick={onClickBtn}
                disabled={loading}
                component={'div'}
                className={styles.redAvatarBtn}
                variant="outlined" color="secondary">
                <Typography
                    variant={'caption'}
                >
                    {text}
                </Typography>
            </LoadingButton>
        </div>
    )


};

export default AddFriendBtn;