import React, {FC, useState} from 'react';
import styles from './styles.module.scss'
import {Button, Paper} from "@mui/material";
import SideBarInfoProfile from "./sideBarInfoProfile/SideBarInfoProfile";
import UserInfoProfile from "./userInfoProfile/UserInfoProfile";
import {IUserProfile} from "../../../types/profile";
import {AnimatePresence} from "framer-motion";
import SideBarRedProfile from "./sideBarRedProfile/SideBarRedProfile";


import {useRouter} from "next/router";
import {useAppSelector} from "../../../hooks/redux";

export interface IInfoProfileProps {
    profile: IUserProfile,
    idUser: string,
    loadingProfile: boolean
}


const InfoProfile: FC<IInfoProfileProps> = ({profile, idUser, loadingProfile}) => {

    const [redProfile, setRedProfile] = useState<boolean>(false);
    const {name, dateBirth, city, jop, maritalStatus, timestamp} = profile;
    const {pathname} = useRouter();
    const {id, isAuth} = useAppSelector(state => state.user);


    const profileBlock = redProfile ? <SideBarRedProfile
            dateBirth={dateBirth}
            city={city}
            jop={jop}
            maritalStatus={maritalStatus}
            timestamp={timestamp}
        /> :
        <SideBarInfoProfile
            loadingProfile={loadingProfile}
            dateBirth={dateBirth}
            city={city}
            jop={jop}
            maritalStatus={maritalStatus}
            timestamp={timestamp}
        />;

    const onRedProfile = () => {
        setRedProfile(!redProfile)
    };

    const redProfileButton = idUser === id || pathname === '/' ? <Button
        onClick={onRedProfile}
        className={styles.btn}
    >
        редагувати профіль
    </Button> : null;


    return (
        <AnimatePresence>
            <div className={styles.root}>
                <Paper className={styles.paper}>
                        {isAuth && !loadingProfile && redProfileButton}
                    <UserInfoProfile
                        name={name}
                        status={'...'}
                    />
                    {profileBlock}
                </Paper>

            </div>
        </AnimatePresence>


    );
};

export default InfoProfile;