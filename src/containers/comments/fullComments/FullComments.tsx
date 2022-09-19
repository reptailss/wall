import React, {FC} from 'react';
import {ICommentItem} from "../../../types/comments";
import Modal from "../../../components/modal/Modal";
import BtnFullComments from './BtnFullComments'
import CommentItem from "../commentItem/CommentItem";

import styles from './styles.module.scss'

interface ICommentListProps {
    comments: ICommentItem[],
    totalComments: number
}

const FullComments:FC<ICommentListProps> = ({comments,totalComments}) => {

    const list = comments?.map((item,i,array)=>{
        return(
                <CommentItem
                    key={item.id}
                    {...item}
                />
        )
    }) ;

    return (
        <>
            <Modal
                button={<BtnFullComments
                    totalComments={totalComments}
                />}
            >
            <div className={styles.list}>
                {comments && list}
            </div>
            </Modal>

        </>
    );
};

export default FullComments;