import React, {FC} from 'react';
import {ILikeItem} from "../../../types/likes";

import styles from './styles.module.scss'
import {Typography} from "@mui/material";
import LikeItem from "../likeItem/LikeItem";

interface ILikeListProps {
    likes: ILikeItem[]
}

const LikeList:FC<ILikeListProps> = ({likes}) => {
    const list = likes?.map((item,i,array)=>{

        const sign = i === array.length -1 ? '' : ',';
        return(
           <div className={styles.item} key={item.id}>
               <LikeItem
                   {...item}
               />
               <Typography
                   variant="caption"
                   component="div"
               >
                   {sign}
               </Typography>

           </div>
        )
    });

    const content = likes.length ? <div className={styles.root}>
       <Typography
            variant="caption"
            component="div"
        >
            Сподобалось:
        </Typography>
        {list}
    </div> : null;

    return (
        <>
            {content}
        </>
    );
};

export default LikeList;