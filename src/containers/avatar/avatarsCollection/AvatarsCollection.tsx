import React, {FC, useState} from 'react';
import {useAvatar} from '../../../hooks/useAvatar/useAvatar'
import {IAvatarItem} from "../../../types/avatar/avatar";
import AvatarList from "./avatarList/AvatarList";

interface IAvatarsCollectionProps {
    id:string
}

const AvatarsCollection:FC<IAvatarsCollectionProps> = ({id}) => {

    const[avatars,setAvatars] = useState<IAvatarItem[]>()


   const {getAvatarsCollection,loadingGetAvatarCollection} = useAvatar();

    const onGetAvatars = async () => {
        const res = await getAvatarsCollection({
            id
        });
        //@ts-ignore
        setAvatars(res)
    };

    return (
        <div>
            {avatars && <AvatarList avatars={avatars}/>}
        </div>
    );
};

export default AvatarsCollection;