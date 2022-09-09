import React, {FC, useEffect, useState} from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import {IAddLikePostProps} from "../../../../types/wall/post";
import {useWall} from "../../../../hooks/useWall/useWall";
import {db} from "../../../../firebase/firebase";


const WallPostLike: FC<IAddLikePostProps> = ({idUser, idPost, idCurrentUser}) => {

    const [likes, setLikes] = useState<{ id: string }[]>();
    const [isLike, setIsLike] = useState<boolean>(false);

    const {
        addLikePost,
        loadingAddLikePost,
        deleteLikePost,
        loadingDeleteLikePost,
        getLikesPost,
        loadingGetLikesPost
    } = useWall();


    const onGetLikes = async () => {
        const res = await getLikesPost({
            idPost, idUser
        });
        setLikes(res)
    };

    useEffect(() => {
        if (idPost && db) {
            onGetLikes();
        }
    }, [idPost]);


    useEffect(() => {
        if (likes) {
            setIsLike(likes.findIndex((like) => like.id === idCurrentUser) !== -1);
        }
    }, [likes]);

    const onClickLike = async () => {

        if (!isLike) {
            await addLikePost({
                idUser, idPost, idCurrentUser
            });
            await onGetLikes();
        } else {
            await deleteLikePost({
                idUser, idPost, idCurrentUser
            });
            await onGetLikes();
        }

    };


    const colorFavorite = isLike ? 'info' : 'inherit';
    const num = likes ? likes.length : 0;

    return (
        <IconButton
            disabled={loadingGetLikesPost || loadingAddLikePost || loadingDeleteLikePost}
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

    );
};

export default WallPostLike;