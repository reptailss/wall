import React, {FC, useEffect, useState} from 'react';
import {IRibbonItem} from "../../../../types/ribbon";
import {CardContent, Paper, Typography} from "@mui/material";

import styles from './styles.module.scss'
import Link from "next/link";
import LinkMU from '@mui/material/Link'

import Comments from "../../../comments/Comments";
import Likes from "../../../likes/Likes";
import {useUsers} from "../../../../hooks/useUser/UseUser";
import AvatarUserSmall from "../../../../components/avatarUserSmall/AvatarUserSmall";
import RibbonPhotoCarousel from "./ribbonPhotoCarousel/RibbonPhotoCarousel";


const RibbonItem: FC<IRibbonItem> = ({type, text, pathImg, userId, idRibbonContent}) => {

    const [index, setIndex] = useState(0);

    const [avatar, setAvatar] = useState<string>('');

    const idPostContentItem = type === 'updateAvatar' && idRibbonContent ? idRibbonContent :
        type === 'post' && idRibbonContent ? idRibbonContent :
            '';
    const idPostContentRoot = type === 'updateAvatar' && idRibbonContent ? 'avatars' :
        type === 'post' && idRibbonContent ? 'posts' :
            '';

    const {
        getUserProfileOther,
        loadingGetUserProfileOther,
    } = useUsers();

    const onGetUserProfile = async () => {
        const res = await getUserProfileOther(userId);
        //@ts-ignore
        setAvatar(res.currentAvatar);
    };


    useEffect(() => {
        if (userId) {
            onGetUserProfile();
        }
    }, [userId]);


    const textInfo = type === 'updateAvatar' ? 'оновив аватарку' : '';


    return (
        <Paper
            className={styles.root}>
            <div>
                <div className={styles.info}>
                    <Link href={`/users/${userId}`}>
                        <LinkMU underline="none"
                                component={'div'}
                        >
                            <Typography
                                className={styles.link}
                                variant={'body2'}
                            >
                                <AvatarUserSmall
                                    pathImg={avatar}
                                />
                                <span className={styles.id}>
                                    {userId}
                             </span>
                            </Typography>
                        </LinkMU>
                    </Link>
                    <Typography
                        variant={'body2'}
                        color={'text.other'}
                    >
                        {textInfo}
                    </Typography>
                </div>

                {pathImg && pathImg.length === 1 && <img
                    className={styles.img}
                    src={pathImg[0]} alt=""/>}

                {pathImg && pathImg.length > 1 &&
                <RibbonPhotoCarousel
                    data={pathImg}
                />
                }

            </div>

            {type === 'post' && <CardContent>
                <Typography variant="body2" color="text.other">
                    {text}
                </Typography>
            </CardContent>}


            <div className={styles.likes}>
                <Likes
                    idUser={userId}
                    pathItemId={idPostContentItem}
                    pathRoot={idPostContentRoot}
                    authorNameLike={userId}
                />
            </div>

            <div className={styles.comments}>
                <Comments
                    idUser={userId}
                    pathItemId={idPostContentItem}
                    pathRoot={idPostContentRoot}
                />
            </div>

        </Paper>
    );
};

export default RibbonItem;