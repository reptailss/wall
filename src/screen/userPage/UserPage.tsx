
import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'react';

import Wall from "../../../src/containers/wall";

import {Col, Row} from "react-bootstrap";
import InfoProfile from "../../../src/containers/profile/infoProfile/InfoProfile";
import {useUsers} from "../../hooks/useUser/UseUser";;
import SpinnerBlock from "../../components/spinner/Spinner";

import styles from './styles.module.scss'
import UserAvatar from "../../containers/user/userAvatar/UserAvatar";




const UserPage = () => {

    const [profileUserOther,setrofileUserOther] = useState<any>();

    const router = useRouter();
    const { id }: any = router.query;
    const {getUserProfileOther,loadingGetUserProfileOther} = useUsers();

    const onGetUser = async () =>{
        const res = await getUserProfileOther(id);
        setrofileUserOther(res)
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


    const content = !loadingGetUserProfileOther ?   <>
        <Col xl={4}>
            <UserAvatar/>
        </Col>
        <Col xl={8}>
            <InfoProfile
                idUser={id}
                profile={profileUserOther}/>
            <Wall id={id}/>
        </Col>
    </> : spinner;



    return (
        <Row>
            {content}
        </Row>
    )



}

export default UserPage
