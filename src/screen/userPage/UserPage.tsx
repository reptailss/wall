
import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'react';

import Wall from "../../../src/containers/wall";

import {Col, Row} from "react-bootstrap";
import InfoProfile from "../../../src/containers/profile/infoProfile/InfoProfile";
import {useUsers} from "../../hooks/useUser/UseUser";;
import SpinnerBlock from "../../components/spinner/Spinner";

import styles from './styles.module.scss'
import UserAvatar from "../../containers/avatar/userAvatar/UserAvatar";
import {IUserProfile} from "../../types/profile";




const UserPage = () => {

    const [profileUserOther,setrofileUserOther] = useState<IUserProfile>({name: '',
        surname: '',
        dateBirth: 0,
        city: '',
        jop: '',
        maritalStatus: '',
        timestamp:{seconds:0,nanoseconds:0},
        currentAvatar: ''});

    const router = useRouter();
    const { id }: any = router.query;
    const {getUserProfileOther,loadingGetUserProfileOther} = useUsers();

    const onGetUser = async () =>{
        const res = await getUserProfileOther(id);
        //@ts-ignore
        setrofileUserOther(res);
    };

    useEffect(  () => {
       if(id){
           onGetUser();
       }

    },[id]);

    const spinner = <Col
        className={styles.spinnerInner}
        sx={12}>
        <SpinnerBlock/>
    </Col>;




    return (
        <Row>
            <Col xl={4}>
                <UserAvatar
                    currentAvatar={profileUserOther.currentAvatar}
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



}

export default UserPage
