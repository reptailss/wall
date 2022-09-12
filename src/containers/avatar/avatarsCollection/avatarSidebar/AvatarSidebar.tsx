import React from 'react';
import {Paper,Button} from "@mui/material";

import styles from './styles.module.scss'



interface IAvatarSidebarProps {
    indexAvatar: string,
    idUser: string,
    avatars: string,
}

const AvatarSidebar = ({indexAvatar,idUser,avatars}) => {
    return (
        <Paper className={styles.root}>


            <Button
                variant="contained"
                className={styles.btn}
                size="small"
            >
                <span> встановити на аватарку</span>

            </Button>

            <Button
                variant="contained"
                className={styles.btn}
                size="small"
            >
                <span>видалити</span>

            </Button>
        </Paper>
    );
};

export default AvatarSidebar;