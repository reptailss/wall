import React, {FC, useEffect, useState} from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
;
;
import {db} from "../../firebase/firebase";
import {useLikes} from "../../hooks/useLikes/useLikes";
import { ILikeItem} from "../../types/likes";
import {useAppSelector} from "../../hooks/redux";
import LikeList from "./likeList/LikeList";

interface LikesProps {
    idUser: string,
    pathRoot: string,
    pathItemId : string,
    authorNameLike:string
}




const Likes:FC<LikesProps> = ({idUser,pathRoot,pathItemId,authorNameLike}) => {

    const{id:idCurrentUser,profile} = useAppSelector(state => state.user);


    const [likes, setLikes] = useState<ILikeItem[]>();
    const [isLike, setIsLike] = useState<boolean>(false);

    const {
        loadingAddLike,
        loadingDeleteLike,
        loadingGetLikes,

        getLikes,
        addLike,
        deleteLike
    } = useLikes();


    const onGetLikes = async () => {
        const res = await getLikes({
            pathRoot, idUser,pathItemId
        });
        //@ts-ignore
        setLikes(res)
    };

    useEffect(() => {
        if (pathItemId && db) {
            onGetLikes();
        }
    }, [pathItemId]);


    useEffect(() => {
        if (likes) {
            setIsLike(likes.findIndex((like) => like.id === idCurrentUser) !== -1);
        }
    }, [likes]);

    const onClickLike = async () => {

        if (!isLike) {
            await addLike({
                idUser, pathItemId, idCurrentUser,pathRoot,authorNameLike:profile.name
            });
            await onGetLikes();
        } else {
            await deleteLike({
                idUser, pathItemId, idCurrentUser,pathRoot
            });
            await onGetLikes();
        }

    };


    const colorFavorite = isLike ? 'info' : 'inherit';
    const num = likes ? likes.length : 0;

    return (
        <>

            <IconButton
                disabled={loadingGetLikes || loadingAddLike || loadingDeleteLike}
                onClick={onClickLike}
                aria-label="share">
                <Badge
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    badgeContent={num} color="primary">
                    <FavoriteIcon
                        color={colorFavorite}
                    />
                </Badge>
            </IconButton>

            {likes && <LikeList likes={likes}/>}
        </>


    );
};

export default Likes;