import React, {FC} from 'react';
import {Typography} from "@mui/material";
import styles from "./styles.module.scss";

interface INotFriendsProps {
    text:string
}
const NotFriends:FC<INotFriendsProps> = ({text}) => {
    return (
        <Typography
            className={styles.root}
            variant="body2">
            {text}
        </Typography>
    );
};

export default NotFriends;