import React, {FC} from 'react';
import {Typography,Paper} from "@mui/material";
import styles from './styles.module.scss'


interface INotItemsProps {
    text: string,
    mt?:boolean
}

const NotItems: FC<INotItemsProps> = ({text,mt}) => {



    return (
        <Paper
            style={{
                marginTop:mt ? '10px' : '0'
            }}
            className={styles.root}>
            <Typography

                color={'text.primary'}
                variant={'body2'}
            >
                {text}
            </Typography>
        </Paper>
    );
};

export default NotItems;