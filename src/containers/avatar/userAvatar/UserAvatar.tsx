import React, {FC} from 'react';
import styles from './styles.module.scss'

import img from '../../../resources/img/avatar.png'
import AvatarEditor from 'react-avatar-editor'


import Link from "next/link";
import LinkMU from '@mui/material/Link'
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


            {/*<AvatarEditor*/}
                {/*image={currentAvatar}*/}
                {/*width={250}*/}
                {/*height={250}*/}
                {/*border={50}*/}
                {/*color={[255, 255, 255, 0.6]} // RGBA*/}
                {/*scale={1.2}*/}
                {/*rotate={0}*/}
            {/*/>*/}

        </div>
    );
};

export default UserAvatar;