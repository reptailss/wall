import React, {FC} from 'react';
import {ILikeItem} from "../../../types/likes";

import styles from './styles.module.scss'
import FullLikes from "../fullLikes/FullLikes";
import {Typography} from "@mui/material";
import LikeItem from "../likeItem/LikeItem";

interface ILikeListProps {
    likes: ILikeItem[]
}

const LikeList:FC<ILikeListProps> = ({likes}) => {
    const list = likes?.map((item,i,array)=>{
        if(i>3){
            return
        }
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
    }) ;


    return (
        <div className={styles.root}>
            {likes && list}
            {likes.length > 2 ? <FullLikes likes={likes}/>: null}
        </div>
    );
};

export default LikeList;