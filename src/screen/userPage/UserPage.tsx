import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

import Wall from "../../../src/containers/wall";

import {Col, Row} from "react-bootstrap";
import InfoProfile from "../../../src/containers/profile/infoProfile/InfoProfile";
import {useUsers} from "../../hooks/useUser/UseUser";

import styles from './styles.module.scss'
import UserAvatar from "../../containers/avatar/userAvatar/UserAvatar";
import {IUserProfile} from "../../types/profile";
import {useAppSelector} from "../../hooks/redux";
import ChangeAvatarBtn from "../../containers/avatar/changeAvatarBtn/ChangeAvatarBtn";
import AddFriendBtn from "../../containers/friends/addFriendBtn/AddFriendBtn";
import FriendsSidebar from "../../containers/friends/friendsSidebar/FriendsSidebar";
import AddMessageBtn from "../../containers/chats/addMessageBtn/AddMessageBtn";


const UserPage = () => {

    const [profileUserOther, setrofileUserOther] = useState<IUserProfile>({
        name: '',
        dateBirth: 0,
        city: '',
        jop: '',
        maritalStatus: '',
        timestamp: {seconds: 0, nanoseconds: 0},
        currentAvatar: '',
        status: '...',
    });

    const router = useRouter();
    const {id}: any = router.query;
    const {getUserProfileOther, loadingGetUserProfileOther} = useUsers();
    const {id: currentUserId} = useAppSelector(state => state.user);
    const myPage = id === currentUserId;

    const onGetUser = async () => {
        const res = await getUserProfileOther(id);
        //@ts-ignore
        setrofileUserOther(res);
    };

    useEffect(() => {
        if (id) {
            onGetUser();
        }

    }, [id]);


    return (
        <Row>
            <Col className={styles.inner} xl={4}>
                <UserAvatar
                    currentAvatar={profileUserOther.currentAvatar}/>

                {myPage && <ChangeAvatarBtn
                    text={'змінити'}/>}

                {!myPage && id && <AddFriendBtn
                    userId={id}/>}

                {!myPage && <div className={styles.message}>
                    <AddMessageBtn
                        userId={id}/>
                </div>}
                <FriendsSidebar
                    userId={id}
                />

            </Col>
            <Col xl={8}>
                <InfoProfile
                    idUser={id}
                    loadingProfile={loadingGetUserProfileOther}
                    profile={profileUserOther}/>
                <Wall id={id}/>
            </Col>
        </Row>
    )


};

export default UserPage
