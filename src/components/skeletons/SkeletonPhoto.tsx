import React, {FC} from 'react';
import {Skeleton} from "@mui/material";
import styles from './styles.module.scss'
import {AnimatePresence, motion} from "framer-motion";

interface ISkeletonPhotoProps {
    height?: number,
    width?: number
}

const SkeletonPhoto: FC<ISkeletonPhotoProps> = ({height,width}) => {

    const clazz = height ? '' : styles.rootPhoto;


    return (

        <AnimatePresence>
            <motion.div
                className={styles.root}
                key={'skeleton'}
                exit={{opacity: 0}}
                transition={{
                    type: 'Tween',
                    opacity: {duration: 1.2},
                }}
            >
                <Skeleton
                    height={height}
                    width={width}
                    className={clazz}
                    variant="rounded"/>
            </motion.div>
        </AnimatePresence>
    )


};

export default SkeletonPhoto;