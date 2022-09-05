import React, {FC} from 'react';
import styles from "../styles.module.scss";
import { Typography} from "@mui/material";

interface IUserInfoProfileProps {
    name: string,
    surname:string
}

const UserInfoProfile:FC<IUserInfoProfileProps> = ({name,surname}) => {
    return (
        <div className={styles.topInfo}>
            <Typography
                color="text.primary"
                className={styles.name}
                variant="body1">
                {name} {surname}
            </Typography>
            <Typography
                color="text.secondary"
                className={styles.status}
                variant="body1">
                status...
            </Typography>
        </div>
    );
};

export default UserInfoProfile;