import React, {FC, useState} from 'react';


import Carousel from 'react-bootstrap/Carousel';
import styles from './styles.module.scss'
import {IAvatarItem} from "../../../../types/avatar/avatar";
import Likes from "../../../likes/Likes";
import {useAppSelector} from "../../../../hooks/redux";
import {Paper} from "@mui/material";


interface IAvatarListProps {
    avatars: IAvatarItem[],
    idUser: string,
    onChangeIndex: (index: number)=> void,
}

const AvatarList: FC<IAvatarListProps> = ({avatars, idUser,onChangeIndex}) => {


    const {name} = useAppSelector(state => state.user.profile);
    const [index, setIndex] = useState(0);



    const handleSelect = (selectedIndex: number, e) => {
        setIndex(selectedIndex);
        onChangeIndex(selectedIndex);
    };

    const list = avatars?.map((item, i, array) => {
        const {pathImg, id} = item;
        return (
            <Carousel.Item
                key={id}
            >
                <img
                    className={styles.img}
                    src={pathImg} alt=""/>
               <Paper className={styles.like}>
                   <Likes
                       idUser={idUser}
                       pathItemId={id}
                       pathRoot={'post'}
                       authorNameLike={name}
                   />
               </Paper>

            </Carousel.Item>
        )
    });

    return (
        <div className={styles.root}>


            <Carousel className={styles.slider} interval={null} activeIndex={index} onSelect={handleSelect}>
                {list}
            </Carousel>
        </div>
    );
};

export default AvatarList;