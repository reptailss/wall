import React from 'react';
import styles from './styles.module.scss'
import {Typography} from "@mui/material";

const BtnFullLikes = () => {
    return (
        <Typography
            variant="caption"
            component="div"
        className={styles.btn}
        >
            та інші
        </Typography>
    );
};

export default BtnFullLikes;