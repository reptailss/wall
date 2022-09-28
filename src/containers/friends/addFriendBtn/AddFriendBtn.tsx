import {FC, useEffect, useState} from 'react';
import styles from "./styles.module.scss";
import LoadingButton from '@mui/lab/LoadingButton';
import {useFriends} from "../../../hooks/useFriends/useFriends";
import {useAppSelector} from "../../../hooks/redux";
import {Button} from "@mui/material";


interface IAddFriendBtnProps {
    userId: string
}

const AddFriendBtn: FC<IAddFriendBtnProps> = ({userId}) => {

        const {id} = useAppSelector(state => state.user);



        const {
            addFriendsRequest,
            deleteFriendsRequest,
            deleteFriend,
            confirmFriend,
            checkFriendStatus,
            statusFriend,

            loadingCheckFriendStatus,
            loadingAddFriendsRequest,
            loadingDeleteFriendsRequest,
            loadingConfirmFriend,
            addFriend


        } = useFriends();



        const onAddFriends = async () => {
            // await addFriendsRequest({
            //     props: {
            //         userId,
            //         currentUserId: id
            //     },
            //     snack: true,
            //     path: 'otherRequest'
            // });
            // await addFriendsRequest({
            //     props: {
            //         userId,
            //         currentUserId: id
            //     },
            //     snack: true,
            //     path: 'myRequest'
            // });
            //
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


    const onDeleteRequest = async () => {
        await deleteFriendsRequest({
            props: {
                userId,
                currentUserId: id
            },
            snack: true,
            path: 'otherRequest'
        });
        await deleteFriendsRequest({
            props: {
                userId,
                currentUserId: id
            },
            snack: true,
            path: 'myRequest'
        });

    };


        const onConfirmFriend = async () => {
            await confirmFriend({
                userId,
                currentUserId: id
            })
        };



        const checkFriend = async () => {
           await  checkFriendStatus({
               userId,
               currentUserId: id
           })
        };

        useEffect(() => {
            if (id) {
                checkFriend();
            }


        }, [id]);

    const loading = loadingAddFriendsRequest
    || loadingDeleteFriendsRequest
    || loadingConfirmFriend
    || loadingCheckFriendStatus;

        const text = statusFriend === 'otherRequest' ? 'прийняти заявку'
            : statusFriend === 'myRequest' ? 'відмінити заявку'
                : statusFriend === 'confirm' ? 'видалити друга'
                    : 'добавити в друзі';

        const onClickBtn = async () => {
            if(statusFriend === 'initial'){
              await  onAddFriends();
            }
            if(statusFriend === 'otherRequest'){
                await  onConfirmFriend();
            }
            if(statusFriend === 'myRequest'){
                await  onDeleteRequest();
            }
            if(statusFriend === 'confirm'){
                await  onDeleteFriends();
            }
            await checkFriend();
        }

        return(
            <div className={styles.root}>
                <LoadingButton
                        loading={loading}
                    onClick={onClickBtn}
                    disabled={loading}
                    component={'div'}
                    className={styles.redAvatarBtn}
                    variant="outlined" color="secondary">
                    {text}
                </LoadingButton>


            </div>
        )




}

export default AddFriendBtn;