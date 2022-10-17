import React, {FC} from 'react';
import {ICommentItem} from "../../../types/comments";

import styles from './styles.module.scss'
import CommentItem from "../commentItem/CommentItem";

interface ICommentListProps {
    comments: ICommentItem[]
}

const CommentList:FC<ICommentListProps> = ({comments}) => {
    const list = comments?.map((item,i,array)=>{
        return(
           <div className={styles.item} key={item.id}>
               <CommentItem
                   {...item}
               />
           </div>
        )
    }) ;


    return (
        <div className={styles.root}>
            {comments && list}
        </div>
    );
};

export default CommentList;