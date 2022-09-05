import React from 'react';
import Button from '@mui/material/Button';
import styles from "./styles.module.scss";

const ChangeUserAvatar = () => {
    return (
        <Button
            className={styles.redAvatarBtn}
            variant="outlined"  color="secondary" >
            змінити
        </Button>
    );
};

export default ChangeUserAvatar;