import React, {FC} from 'react';
import styles from './styles.module.scss'
import {Paper} from "@mui/material";
import SideBarInfoProfile from "./sideBarInfoProfile/SideBarInfoProfile";
import UserInfoProfile from "./userInfoProfile/UserInfoProfile";
import {IUserProfile} from "../../../types/profile";

export interface IInfoProfileProps {
  profile:IUserProfile
}



const InfoProfile:FC<IInfoProfileProps> = ({profile}) => {

const {name,surname,dateBirth,city,jop,maritalStatus,timestamp} = profile;
    return (
        <div className={styles.root}>
            <Paper className={styles.paper}>
                <UserInfoProfile
                name={name}
                surname={surname}
                />
                <SideBarInfoProfile
                    dateBirth={dateBirth}
                    city={city}
                    jop={jop}
                    maritalStatus={maritalStatus}
                    timestamp={timestamp}

                />
            </Paper>

        </div>
    );
};

export default InfoProfile;