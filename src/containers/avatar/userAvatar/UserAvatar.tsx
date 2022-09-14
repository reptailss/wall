import React, {FC, useRef, useState} from 'react';
import styles from './styles.module.scss'

import img from '../../../resources/img/avatar.png'



import Link from "next/link";

import {useRouter} from "next/router";


interface UserAvatar {
    currentAvatar: string
}

const UserAvatar:FC<UserAvatar> = ({currentAvatar}) => {


const router = useRouter();
    const { id }: any = router.query;
    return (

        <div className={styles.root}>


            <Link href={`/avatars/${id}`}>
                <a>
                    <img
                        className={styles.img}
                        src={currentAvatar}
                        alt="avatar"
                    />
                </a>


            </Link>





        </div>
    );
};

export default UserAvatar;