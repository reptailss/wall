import React, {FC} from 'react';
import {ILikeItem} from "../../../types/likes";
import Modal from "../../../components/modal/Modal";
import BtnFullLikes from './BtnFullLikes'
import LikeItem from "../likeItem/LikeItem";

import styles from './styles.module.scss'



interface ILikeListProps {
    likes: ILikeItem[]
}




const FullLikes:FC<ILikeListProps> = ({likes}) => {


    const list = likes?.map((item,i,array)=>{

        return(
                <LikeItem
                    key={item.id}

                    {...item}
                />
        )
    }) ;


    return (
        <>
            <Modal
                button={<BtnFullLikes/>}
            >
            <div className={styles.list}>
                {likes && list}
            </div>
            </Modal>

        </>
    );
};

export default FullLikes;