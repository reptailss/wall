import React, {FC, useEffect, useState} from 'react';
import {useAvatar} from '../../../hooks/useAvatar/useAvatar'
import {IAvatarItem} from "../../../types/avatar/avatar";
import AvatarList from "./avatarList/AvatarList";
import {Col, Row} from "react-bootstrap";

import styles from './styles.module.scss'
import AvatarSidebar from "./avatarSidebar/AvatarSidebar";
import {Paper} from "@mui/material";
import {useAppSelector} from "../../../hooks/redux";
import Comments from "../../comments/Comments";

interface IAvatarsCollectionProps {
    id: string
}

const AvatarsCollection: FC<IAvatarsCollectionProps> = ({id}) => {

    const {id:currentUserId} = useAppSelector(state => state.user);
    const myPage = id === currentUserId;


    const [avatars, setAvatars] = useState<IAvatarItem[]>();
    const[indexAvatar,setIndexAvatar] = useState<number>(0);

    const onChangeIndex = (index:number) => {
        setIndexAvatar(index)
    };



    const {getAvatarsCollection, loadingGetAvatarCollection} = useAvatar();

    const onGetAvatars = async () => {
        const res = await getAvatarsCollection({
            id
        });
        //@ts-ignore
        setAvatars(res)
    };

    useEffect(() => {
        if (id) {
            onGetAvatars();
        }
    }, [id])


    const colAvatarList = myPage ? 8 : 10;

    return (
        <div>
            <Row className={styles.root}>
                {avatars && <Col className={styles.counterroot} xl={12}>
                   <Paper className={styles.counter}>
                       {indexAvatar +1} фото з {avatars.length}
                   </Paper>
                </Col>}
                <Col xl={colAvatarList}>
                    {avatars && <AvatarList
                        onChangeIndex={onChangeIndex}
                        idUser={id}
                        avatars={avatars}/>}
                    {avatars &&   <Comments
                        idUser={currentUserId}
                        pathRoot={'avatars'}
                        pathItemId={avatars[indexAvatar].id}
                    />}
                </Col>

                {myPage && <Col xl={3}>
                    <AvatarSidebar
                        indexAvatar={indexAvatar}
                        idUser={id}
                        avatars={avatars}
                    />
                </Col>}

            </Row>

        </div>
    );
};

export default AvatarsCollection;