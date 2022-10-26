import React, {FC} from 'react';
import {Button, Paper} from "@mui/material";

import styles from './styles.module.scss'
import {useAvatar} from "../../../../hooks/useAvatar/useAvatar";
import {useAppSelector} from "../../../../hooks/redux";
import {IAvatarItem} from "../../../../types/avatar/avatar";
import {useUsers} from "../../../../hooks/useUser/UseUser";
import {useRouter} from "next/router";


interface IAvatarSidebarProps {
    indexAvatar: number,
    idUser: string,
    avatars: IAvatarItem[],
}

const AvatarSidebar:FC<IAvatarSidebarProps> = ({indexAvatar,idUser,avatars}) => {
    const {updateCurrentAvatar,
        loadingUpdateCurrentAvatar
        ,deleteAvatarsCollection,
        loadingDeleteAvatarCollection} = useAvatar();
    const {getUserProfile} = useUsers();
    const {id} = useAppSelector(state => state.user);
    const router = useRouter();

    const onUpdateCurrentAvatar = async () => {
        if (avatars  && indexAvatar) {
            await updateCurrentAvatar({id, pathImg: avatars[indexAvatar].pathImg});
            await getUserProfile(id);
        }
    };


const onDeleteAvatarsCollection = async () =>{
    if(avatars && indexAvatar) {
        await deleteAvatarsCollection({
            idUser:id,
            idAvatar:avatars[indexAvatar].id
        });
        router.push('/');
    }
}
    return (
        <Paper className={styles.root}>
            <Button
                onClick={onUpdateCurrentAvatar}
                disabled={loadingUpdateCurrentAvatar}
                variant="contained"
                className={styles.btn}
                size="small"
            >
            встановити на аватарку
            </Button>
            <Button
                disabled={loadingDeleteAvatarCollection}
                onClick={onDeleteAvatarsCollection}
                variant="contained"
                className={styles.btn}
                size="small"
            >
                видалити
            </Button>
        </Paper>
    );
};

export default AvatarSidebar;