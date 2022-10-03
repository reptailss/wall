import React, {FC, useEffect, useState} from 'react';

import {IWallPostItem} from "../../../types/wall/post";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


import {convertSecondstoDate, OptionsDateTime} from '../../../helpers/date';

import styles from './styles.module.scss'

import AvatarUserSmall from "../../../components/avatarUserSmall/AvatarUserSmall";
import Link from "next/link";
import {Col} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import WallSidebarPostItem from "./wallSidebarPostItem/WallSidebarPostItem";
import {useRouter} from "next/router";
import {useAppSelector} from "../../../hooks/redux";
import Likes from "../../likes/Likes";
import Comments from "../../comments/Comments";
import {useUsers} from "../../../hooks/useUser/UseUser";
import {IUserProfile} from "../../../types/profile";

const WallPostItem: FC<IWallPostItem> = ({text, pathImg, timestamp, authorName, authorId, id, idUserWhoseWall}) => {


    const {id: idUser} = useAppSelector(state => state.user);

    const date = timestamp ? convertSecondstoDate(timestamp.seconds) : new Date();
    const UAdate = new Intl.DateTimeFormat('uk', OptionsDateTime).format(date);
    const {pathname} = useRouter();

    const {getUserProfileOther,loadingGetUserProfileOther} = useUsers();

    const [profileUserOther,setrofileUserOther] = useState<IUserProfile>({name: '',
        dateBirth: 0,
        city: '',
        jop: '',
        maritalStatus: '',
        timestamp:{seconds:0,nanoseconds:0},
        currentAvatar: ''});


    const onGetUser = async () =>{
        const res = await getUserProfileOther(authorId);
        //@ts-ignore
        setrofileUserOther(res);
    };

    useEffect(  () => {
        if(authorId){
            onGetUser();
        }

    },[authorId]);

    const imgList = pathImg?.map((item, i, array) => {
        const arrlength = array.length;
        const colXl = arrlength === 1 ? 12 :
            arrlength === 2 ? 6 :
                arrlength === 3 ? 4 : 2;
        const colSx = arrlength === 1 ? 12 : 2;
        return (
            <Col
                key={item}
                sx={colSx}
                xl={colXl}>
                <CardMedia
                    className={styles.img}
                    component="img"
                    image={item}
                    alt="img"
                />
            </Col>
        )
    });

    const sidebarPostItem = authorId === idUser || pathname === '/' ? <WallSidebarPostItem
        idUser={idUserWhoseWall}
        idPost={id}/> : null;


    return (
        <Card>
            <CardHeader
                avatar={
                    <AvatarUserSmall
                        pathImg={profileUserOther.currentAvatar}
                        name={authorId}/>
                }
                action={
                    sidebarPostItem
                }
                title={<Link
                    href={`/users/${authorId}`}>
                    <a>
                        <Typography
                            color="secondary"
                            variant="body2"
                        >{authorId}
                        </Typography>
                    </a>
                </Link>}
                subheader={<Typography
                    variant="body2"
                    className={styles.date}>{UAdate}</Typography>}
            />

            <CardContent>
                <Typography variant="body2" color="text.other">
                    {text}
                </Typography>
            </CardContent>
            <Row className={styles.rowImg}>
                {imgList}
            </Row>
            <div className={styles.likes}>
                <Likes
                    idUser={idUserWhoseWall}
                    pathItemId={id}
                    pathRoot={'posts'}
                    authorNameLike={authorName}
                />
            </div>

            <div className={styles.comments}>
                <Comments
                    idUser={idUserWhoseWall}
                    pathItemId={id}
                    pathRoot={'posts'}
                />
            </div>
        </Card>
    );
};

export default WallPostItem;