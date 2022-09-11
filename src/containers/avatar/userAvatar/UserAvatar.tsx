import React, {FC} from 'react';
import styles from './styles.module.scss'
import Image from 'next/image'
import img from '../../../resources/img/avatar.png'
import SpinnerBlock from "../../../components/spinner/Spinner";

interface UserAvatar {
    currentAvatar: string
}

const UserAvatar:FC<UserAvatar> = ({currentAvatar}) => {



    return (

        <div className={styles.root}>



            <img
                className={styles.img}
                src={currentAvatar}
                alt="avatar"
            />
        </div>
    );
};

export default UserAvatar;