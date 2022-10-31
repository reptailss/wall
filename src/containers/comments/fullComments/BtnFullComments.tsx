import React, {FC} from 'react';
import styles from './styles.module.scss'
import {Typography} from "@mui/material";
import SmsIcon from '@mui/icons-material/Sms';

interface IBtnFullCommentsProps {
    totalComments:number
}

const BtnFullComments:FC<IBtnFullCommentsProps> = ({totalComments}) => {

    const text = totalComments > 0 ? <>переглянути всі коментарі ({totalComments})</> : 'коментарі';

    return (
        <Typography
            variant="body2"
            component="div"
        className={styles.btn}
        >
            <SmsIcon
                fontSize={'small'}
                className={styles.icon}/>
            {text}
        </Typography>
    );
};

export default BtnFullComments;