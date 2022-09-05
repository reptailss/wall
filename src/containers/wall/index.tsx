import React, {FC} from 'react';
import WallPostList from "./wallPostList/WallPostList";
import WallPostAdd from "./wallPostAdd/WallPostAdd";

import styles from './styles.module.scss'



interface IWallProps {
    id: string,
}

const Wall:FC<IWallProps> = ({id}) => {
    return (
        <div className={styles.root}>
            <WallPostAdd id={id}/>
            <WallPostList id={id} />
        </div>
    );
};

export default Wall;