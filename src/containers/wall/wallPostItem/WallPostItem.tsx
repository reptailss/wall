import {FC} from 'react';

import {IWallPostItem} from "../../../types/wall/post";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import LinkMU from '@mui/material/Link'
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import {convertSecondstoDate,OptionsDateTime} from '../../../helpers/date';

import styles from './styles.module.scss'

import AvatarUserSmall from "../../../components/avatarUserSmall/AvatarUserSmall";
import Link from "next/link";
import React from "react";
import {Col} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {useAuth} from "../../../hooks/useAuth/useAuth";
import WallSidebarPostItem from "./wallSidebarPostItem/WallSidebarPostItem";
import {useRouter} from "next/router";
import {useAppSelector} from "../../../hooks/redux";

const WallPostItem:FC<IWallPostItem> = ({text,pathImg,timestamp,authorName,authorId,id}) => {

    const{id:idUser} = useAppSelector(state => state.user);

    const date = timestamp ? convertSecondstoDate(timestamp.seconds) : new Date();
    const UAdate = new Intl.DateTimeFormat('uk',OptionsDateTime).format(date);
    const {pathname} = useRouter();
const imgList = pathImg?.map((item,i,array) => {
    const arrlength = array.length;
    const colXl = arrlength === 1 ? 12 :
        arrlength === 2 ? 6 :
            arrlength === 3 ? 4 : 2;
    const colSx = arrlength === 1 ? 12 : 2;

   return(
       <Col sx={colSx} xl={colXl}>
           <CardMedia
               className={styles.img}
           component="img"
           image={item}
           alt="img"
           />
       </Col>
   )
});

    const sidebarPostItem = authorId ===  idUser || pathname === '/' ?<WallSidebarPostItem
        authorId={authorId}
        idPost={id}/>: null;


    return (
        <Card>
            <CardHeader
                avatar={
                    <AvatarUserSmall name={authorName}/>
                }
                action={
                    sidebarPostItem
                }
                title={<Link
                    href={`/users/${authorId}`}
                >
                    <a>
                        <Typography
                            color="secondary"
                            variant="body2"
                        >{authorName}
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
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>

        </Card>
    );
};

export default WallPostItem;