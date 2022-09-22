import React, {FC, useEffect, useRef, useState} from 'react';
import {ICommentItem} from "../../../types/comments";
import CommentItem from "../commentItem/CommentItem";

import styles from './styles.module.scss'
import {useAppSelector} from "../../../hooks/redux";
import {useComments} from "../../../hooks/useComments/useComments";
import {db} from "../../../firebase/firebase";
import CommentAdd from "../commentAdd/commentAdd";
import useInfiniteScroll from 'react-infinite-scroll-hook';
import SpinnerBlock from "../../../components/spinner/Spinner";
import {doc, onSnapshot} from "firebase/firestore";
import {ITimestamp} from "../../../types/timestamp";
import {ButtonGroup, Button, Typography} from '@mui/material';



interface ICommentListProps {
    idUser: string,
    pathRoot: string,
    pathItemId: string,

}

const FullComments: FC<ICommentListProps> = ({idUser, pathRoot, pathItemId}) => {


    const {id: idCurrentUser} = useAppSelector(state => state.user);

    const [comments, setComments] = useState<ICommentItem[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    const [totalComments, setTotalComments] = useState<number>(0);
    const messagesEndRef = useRef(null);
    const [direction,setDirection] = useState<'asc'| 'desc'>('asc');

    const {
        getComments,
        loadCommentsPage,
        loadingGetCommentsPage,
        loadingGetComments,
        getTotalComments
    } = useComments();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    };


    const onGetComments = async () => {
        const res = await getComments({
            pathRoot, idUser, pathItemId, limitComment: 14,
            orderByComment: direction
        });
        //@ts-ignore
        setComments(res);
    };

    const onLoadComments = async ({limit,directionOrder,startId}:{limit?:number,directionOrder:'asc'| 'desc',startId:ITimestamp}) => {
        if (comments) {
            setLoading(true);
            if (limit) {
                const res = await loadCommentsPage({
                    pathRoot, idUser, pathItemId, limitComment: limit,
                    orderByComment: directionOrder,
                    startId: startId
                });
                console.log(res);
                // @ts-ignore
                setComments(prevState => [...prevState, ...res]);
            } else {
                const res = await loadCommentsPage({
                    pathRoot, idUser, pathItemId,
                    orderByComment: directionOrder,
                    startId: startId

                });
                // @ts-ignore
                setComments(prevState => [...prevState, ...res]);

                if(!hasNextPage){
                    scrollToBottom();
                }
            }
            setLoading(false);

        }
    };


    useEffect(() => {
        if (pathItemId && db) {
            onGetComments();
        }

    }, [pathItemId,direction]);

    useEffect(() => {
        if (comments && messagesEndRef && totalComments > comments.length) {
            setHasNextPage(true);
        } else {
            setHasNextPage(false);
        }
    }, [totalComments, comments]);


    const list = comments && comments?.map((item, i, array) => {
        return (
            <CommentItem
                key={item.id}
                {...item}
            />
        )
    });

    let unsub = () => {
    };

    useEffect(() => {
        if (pathItemId && db) {
            unsub = onSnapshot(doc(db, "users", idUser, pathRoot, pathItemId), (doc) => {
                if (doc.exists()) {
                    setTotalComments(doc.data().totalComments)
                }
            });
        }

        return () => {
            unsub();
        }
    }, [pathItemId && db]);

    const [sentryRef, {rootRef}] = useInfiniteScroll({
        loading,
        hasNextPage,
        onLoadMore: () => {
           if(comments){
               onLoadComments({limit:5,
                   directionOrder:direction,
                   startId:comments[comments.length - 1].timestamp})
           }
        },

    });


    const onAddCommentProps = async () =>{
       if(comments){
           if(direction === 'asc'){
               if(!hasNextPage){
                   onLoadComments({directionOrder:'asc',startId:comments[comments.length - 1].timestamp})
               }
           } else{
               const res = await loadCommentsPage({
                   pathRoot, idUser, pathItemId,
                   orderByComment: 'asc',
                   startId:comments[0].timestamp

               });
               // @ts-ignore
               setComments(prevState => [...res, ...prevState]);
           }
       }


    };
    const onDirectionComments = (direction:'asc' | 'desc') =>{
        setDirection(direction)
    };

    const variantAsc = direction === 'asc' ? 'contained' : 'outlined';
    const variantDesc = direction === 'desc' ? 'contained' : 'outlined';

    const spinner = loadingGetComments || loadingGetCommentsPage ? <SpinnerBlock/> : null;
    return (
        <div className={styles.root}>
            <div
                className={styles.btnswrap}
            >
                <Typography
                    className={styles.text}
                    color={'text.other'}
                    variant="body2"
                    component="h1">
                спочатку
                </Typography>;
                <ButtonGroup
                    className={styles.btns}
                    disableElevation
                    aria-label="Disabled elevation buttons"
                >
                    <Button
                        size={'small'}
                        className={styles.btn}
                        variant={variantAsc}
                        onClick={() => { onDirectionComments('asc')}}
                    >старі</Button>
                    <Button
                        size={'small'}
                        className={styles.btn}
                        variant={variantDesc}
                        onClick={() => { onDirectionComments('desc')}}
                    >нові</Button>
                </ButtonGroup>
            </div>


            <div
                ref={rootRef}
                className={styles.list}>
                {comments && list}
                {(loading || hasNextPage) && (
                    <div className={styles.spinnerinner}
                         ref={sentryRef}>
                        <SpinnerBlock/>
                    </div>
                )}


                <div ref={messagesEndRef}/>
            </div>
            {spinner}
            <CommentAdd
                authorNameComment={idCurrentUser}
                idUser={idUser}
                pathItemId={pathItemId}
                idCurrentUser={idCurrentUser}
                pathRoot={pathRoot}
                onAddCommentProps={onAddCommentProps}
                onSetTotalComments={() => {
                }}
            />
        </div>
    );
};

export default FullComments;