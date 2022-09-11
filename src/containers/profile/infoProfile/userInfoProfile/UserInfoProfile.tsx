import React, {FC} from 'react';
import styles from "../styles.module.scss";
import { Typography} from "@mui/material";

interface IUserInfoProfileProps {
    name: string,
}

const UserInfoProfile:FC<IUserInfoProfileProps> = ({name}) => {
    return (
        <div className={styles.topInfo}>
            <Typography
                color="text.primary"
                className={styles.name}
                variant="body1">
                {name}
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