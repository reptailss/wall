import React, {FC} from 'react';
import styles from "./styles.module.scss";
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';

interface IUnreadStateIconProps {
    unread: boolean
}

const UnreadStateIcon:FC<IUnreadStateIconProps> = ({unread}) => {
    return (
        <div className={styles.unreadState}>
            {unread ?  <DoneIcon
                    className={styles.iconUnread}
                /> :
                <DoneAllIcon
                    className={styles.iconUnread}
                />}

        </div>
    );
};

export default UnreadStateIcon;