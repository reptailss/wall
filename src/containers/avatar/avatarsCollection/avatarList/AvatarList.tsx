import React, {FC} from 'react';


import styles from './styles.module.scss'
import {IAvatarItem} from "../../../../types/avatar/avatar";


interface IAvatarListProps {
    avatars: IAvatarItem[]
}

const AvatarList: FC<IAvatarListProps> = ({avatars}) => {



    const list = avatars?.map((item, i, array) => {
        const {pathImg,id} = item;
        return (
            <div
            key={id}
            >
                <img src={pathImg} alt=""/>

            </div>
        )
    });


    return (
        <div className={styles.root}>
            {avatars && list}
        </div>
    );
};

export default AvatarList;