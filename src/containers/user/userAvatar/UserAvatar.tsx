import React from 'react';
import styles from './styles.module.scss'
import Button from '@mui/material/Button';

const UserAvatar = () => {
    return (
        <div className={styles.root}>
            <img className={styles.img} alt=""/>
        </div>
    );
};

export default UserAvatar;