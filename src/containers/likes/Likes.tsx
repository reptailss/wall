import React, {FC, useEffect, useState} from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import {db} from "../../firebase/firebase";
import {useLikes} from "../../hooks/useLikes/useLikes";
import {ILikeItem} from "../../types/likes";
import {useAppSelector} from "../../hooks/redux";
import LikeList from "./likeList/LikeList";
import FullLikes from "./fullLikes/FullLikes";


import styles from './styles.module.scss'

interface LikesProps {
    idUser: string,
    pathRoot: string,
    pathItemId: string,
    authorNameLike: string
}


const Likes: FC<LikesProps> = ({idUser, pathRoot, pathItemId}) => {

    const {id: idCurrentUser, profile} = useAppSelector(state => state.user);


    const {
        loadingGetLikes,
        loadingAddLike,
        loadingGetTotalLikes,
        loadingCheckLike,
        loadingSetTotalLikes,
        loadingDeleteLike,

        getLikes,
        addLike,
        deleteLike,
        getTotalLikes,
        setTotalLikes,
        checkLike
    } = useLikes();


    const [likes, setLikes] = useState<ILikeItem[]>();

    const [isLike, setIsLike] = useState<boolean>(false);
    const [totalLikesState, setTotalLikesState] = useState<number>(0);

    const onGetLikes = async () => {
        const res = await getLikes({
            pathRoot,
            idUser,
            pathItemId,
            limitLikes: 3,
            orderByLikes: 'desc'
        });
        //@ts-ignore
        setLikes(res)
    };


    const onGetCounter = async () => {
        const res = await getTotalLikes({
            idUser,
            pathRoot,
            pathItemId,
        });
        setTotalLikesState(res);
        return res;

    };
    const onSetCounter = async (num: number) => {
        await setTotalLikes({
            idUser,
            pathRoot,
            pathItemId,
            totalLikes: num
        });

    };
    const onClickLike = async () => {

        const res = await onGetCounter();

        if (!isLike) {
            await addLike({
                idUser, pathRoot, pathItemId, idCurrentUser, authorNameLike: profile.name
            });
            await onSetCounter(res + 1);
            await onGetLikes();
            await onGetCounter();
            await onCheckLike();
        } else {
            await deleteLike({
                idUser, pathItemId, idCurrentUser, pathRoot
            });
            await onSetCounter(res - 1);
            await onGetLikes();
            await onGetCounter();
            await onCheckLike();
        }


    };
    const onCheckLike = async () => {
        const res = await checkLike({
            idUser, pathItemId, idCurrentUser, pathRoot
        })
        setIsLike(res);
    };


    useEffect(() => {
        if (pathItemId && db) {
            onCheckLike();
            onGetCounter();
            onGetLikes();
        }
    }, [pathItemId]);


    const colorFavorite = isLike ? 'info' : 'inherit';

    const disabled =  loadingGetLikes ||
        loadingAddLike  ||
        loadingDeleteLike  ||
        loadingGetTotalLikes  ||
        loadingCheckLike  ||
        loadingSetTotalLikes  ||
        loadingDeleteLike;

    return (
        <>
            <IconButton
                disabled={disabled}
                onClick={onClickLike}
                aria-label="share">
                <Badge
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    badgeContent={totalLikesState} color="primary">
                    <FavoriteIcon
                        fontSize={'small'}
                        color={colorFavorite}
                    />
                </Badge>
            </IconButton>
            <div className={styles.root}>
                {likes && <LikeList likes={likes}/>}
                {likes && totalLikesState > 1 && <FullLikes likes={likes}/>}
            </div>

        </>


    );
};

export default Likes;