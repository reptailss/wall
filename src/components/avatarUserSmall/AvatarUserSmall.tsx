import React, {FC} from 'react';
import {useAuth} from "../../hooks/useAuth/useAuth";
import styles from "./styles.module.scss";
import avatarsrc from "../../resources/svg/avatar/avatar.svg";
import Avatar from '@mui/material/Avatar';
import SkeletonAvatar from "../skeletons/SkeletonAvatar";
import {AnimatePresence, motion} from "framer-motion";
import {opacity} from "../../constans/motion/inex";
import {useAppSelector} from "../../hooks/redux";


interface IAvatarUserSmallProps {
    pathImg?: string,
    name?: string
}

const AvatarUserSmall:FC<IAvatarUserSmallProps> = ({pathImg,name}) => {

    const {loadingUser} = useAuth();

    const {isAuth} = useAppSelector(state => state.user);

    const src = pathImg ? pathImg : '';
    // const nameAvatar = !pathImg && name ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` : null;

    return (
        <AnimatePresence>
            <motion.div
                key={'avatar'}
                initial={opacity.hidden}
                animate={opacity.visible}
                exit={opacity.hidden}
                transition={opacity.transition}
            >
                {!loadingUser && isAuth ? <Avatar
                    className={styles.avatar}
                    sizes="small"
                    alt={name}
                    src={src}
                    >
                    {/*{nameAvatar}*/}
                </Avatar> : <SkeletonAvatar/>}
            </motion.div>
        </AnimatePresence>
    );
};

export default AvatarUserSmall;