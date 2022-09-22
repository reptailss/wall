import React, {FC, useRef, useState} from 'react';
import styles from './styles.module.scss'
import {AnimatePresence, motion} from "framer-motion";
import img from '../../../resources/img/avatar.png'



import Link from "next/link";

import {useRouter} from "next/router";
import useMedia from "../../../hooks/useMedia/useMedia";
import SkeletonPhoto from "../../../components/skeletons/SkeletonPhoto";
import {useAppSelector} from "../../../hooks/redux";


interface UserAvatar {
    currentAvatar: string
}

const UserAvatar:FC<UserAvatar> = ({currentAvatar}) => {
const {id:currentIdUser} = useAppSelector(state => state.user);



const router = useRouter();
    const { id }: any = router.query;
    const {pathname} = useRouter();

    const idAvatar = (pathname === '/') ? currentIdUser : id;

    const avatar = currentAvatar ? <motion.div
        key={'img'}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{
            type: 'Tween',
            opacity: {duration: 1.2},
        }}
    >
        <Link href={`/avatars/${idAvatar}`}>
            <a>
                <img

                    className={styles.img}
                    src={currentAvatar}
                    alt="avatar"
                />
            </a>


        </Link>
    </motion.div> : <SkeletonPhoto/>;

    return (

        <div className={styles.root}>
            {avatar}
        </div>
    );
};

export default UserAvatar;