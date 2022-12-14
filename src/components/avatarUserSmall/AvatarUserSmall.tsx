import React, {FC} from 'react';
import {useAuth} from "../../hooks/useAuth/useAuth";
import styles from "./styles.module.scss";
import Avatar from '@mui/material/Avatar';
import SkeletonAvatar from "../skeletons/SkeletonAvatar";
import {AnimatePresence, motion} from "framer-motion";
import {opacity} from "../../constans/motion/inex";


interface IAvatarUserSmallProps {
    pathImg?: string,
    name?: string
}

const AvatarUserSmall: FC<IAvatarUserSmallProps> = ({pathImg, name}) => {

    const {loadingUser} = useAuth();

    const src = pathImg ? pathImg : '';

    return (
        <AnimatePresence>
            <motion.div
                key={'avatar'}
                initial={opacity.hidden}
                animate={opacity.visible}
                exit={opacity.hidden}
                transition={opacity.transition}
            >
                {!loadingUser || !pathImg ?
                    <Avatar
                        className={styles.avatar}
                        sizes="small"
                        alt={name}
                        src={src}>
                    </Avatar> :
                    <SkeletonAvatar/>}
            </motion.div>
        </AnimatePresence>
    );
};

export default AvatarUserSmall;