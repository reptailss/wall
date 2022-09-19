import React, {FC} from 'react';
import styles from "../styles.module.scss";
import { Typography} from "@mui/material";
import SkeletonText from "../../../../components/skeletons/SkeletonText";

interface IUserInfoProfileProps {
    name: string,
    status?: string
}

const UserInfoProfile:FC<IUserInfoProfileProps> = ({name,status}) => {



    return (
        <div className={styles.topInfo}>
            <Typography
                color="text.primary"
                className={styles.name}
                variant="body1">
                {name ? name : <SkeletonText/>}
            </Typography>
            <Typography
                color="text.secondary"
                className={styles.status}
                variant="body1">
                {status ? status : <SkeletonText/>}
            </Typography>
        </div>
    );
};

export default UserInfoProfile;