import React, {FC} from 'react';
import styles from "../styles.module.scss";
import { Typography} from "@mui/material";
import SkeletonText from "../../../../components/skeletons/SkeletonText";
import StatusSidebar from "./statusSidebar/StatusSidebar";

interface IUserInfoProfileProps {
    name: string,
    status: string,
    myProfile:boolean
}

const UserInfoProfile:FC<IUserInfoProfileProps> = ({name,status,myProfile}) => {



    return (
        <div className={styles.topInfo}>
            <Typography
                color="text.primary"
                className={styles.name}
                variant="body1">
                {name ? name : <SkeletonText/>}
            </Typography>

            <StatusSidebar
                myProfile={myProfile}
                status={status}/>
        </div>
    );
};

export default UserInfoProfile;