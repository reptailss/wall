import React, {FC, useEffect, useState} from 'react';
import {db} from "../../firebase/firebase";
import {useComments} from "../../hooks/useComments/useComments";
import {ICommentItem} from "../../types/comments";
import {useAppSelector} from "../../hooks/redux";
import CommentList from "./commentList/CommentList";
import CommentAdd from "./commentAdd/commentAdd";
import FullComments from "./fullComments/FullComments";

import styles from './styles.module.scss'



interface CommentsProps {
    idUser: string,
    pathRoot: string,
    pathItemId: string,
}


const Comments: FC<CommentsProps> = ({idUser, pathRoot, pathItemId}) => {

    const {id: idCurrentUser} = useAppSelector(state => state.user);

    const [comments, setComments] = useState<ICommentItem[]>();
    const[totalComments,setTotalComments] = useState<number>(0);


    const {
        getComments,
    } = useComments();


    const onGetComments = async () => {
        const res = await getComments({
            pathRoot, idUser, pathItemId,limitComment: 3,
            orderByComment:'desc'
        });
        //@ts-ignore
        setComments(res.reverse())
    };

    useEffect(() => {
        if (pathItemId && db) {
            onGetComments();
        }
    }, [pathItemId]);


    const onSetTotalComments = (num:number) =>{
        setTotalComments(num)
    };

    return (
        <>
            {comments && totalComments  > 3 && <div>
                <FullComments
                    totalComments={totalComments}
                    comments={comments}/>
            </div>}
            {comments && <CommentList comments={comments}/>}
            <div className={styles.commentAdd}>
                <CommentAdd
                    authorNameComment={idCurrentUser}
                    idUser={idUser}
                    pathItemId={pathItemId}
                    idCurrentUser={idCurrentUser}
                    pathRoot={pathRoot}
                    onAddCommentProps={onGetComments}
                    onSetTotalComments={onSetTotalComments}
                />
            </div>

        </>


    );
};

export default Comments;