import React from 'react';
import AvatarsCollection from "../../containers/avatar/avatarsCollection/AvatarsCollection";
import {useRouter} from 'next/router'
const AvatarsPage = () => {
    const router = useRouter();
    const { id }: any = router.query;
    return <AvatarsCollection id={id}/>
};

export default AvatarsPage;