import React, {FC} from 'react';
import styles from './styles.module.scss'
import {Typography} from "@mui/material";

interface IBtnFullCommentsProps {
    totalComments:number
}

const BtnFullComments:FC<IBtnFullCommentsProps> = ({totalComments}) => {
    return (
        <Typography
            variant="body2"
            component="div"
        className={styles.btn}
        >
            переглянути всі коментарі ({totalComments})
        </Typography>
    );
};

export default BtnFullComments;