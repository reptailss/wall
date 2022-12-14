import React, {FC, useEffect, useState} from 'react';
import {useAvatar} from '../../../hooks/useAvatar/useAvatar'
import {IAvatarItem} from "../../../types/avatar/avatar";
import AvatarList from "./avatarList/AvatarList";
import {Col, Row} from "react-bootstrap";

import styles from './styles.module.scss'
import AvatarSidebar from "./avatarSidebar/AvatarSidebar";
import {Paper, Typography} from "@mui/material";
import {useAppSelector} from "../../../hooks/redux";
import Comments from "../../comments/Comments";
import ChangeAvatarBtn from "../changeAvatarBtn/ChangeAvatarBtn";
import SpinnerBlock from "../../../components/spinner/Spinner";
import useMedia from "../../../hooks/useMedia/useMedia";

interface IAvatarsCollectionProps {
    id: string
}

const AvatarsCollection: FC<IAvatarsCollectionProps> = ({id}) => {

    const {id: currentUserId} = useAppSelector(state => state.user);
    const myPage = id === currentUserId;

    const{isDesktop,isTablet} = useMedia();

    const [avatars, setAvatars] = useState<IAvatarItem[]>();
    const [indexAvatar, setIndexAvatar] = useState<number>(0);

    const onChangeIndex = (index: number) => {
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
    }, [id]);

    const stylePadding = {padding: 0};

    const styleList = isTablet || isDesktop ?  {} : stylePadding;


    const colAvatarList = myPage ? 8 : 10;

    const content = loadingGetAvatarCollection ? <SpinnerBlock/> : avatars && avatars.length ? <>
        <AvatarList
            onChangeIndex={onChangeIndex}
            idUser={id}
            avatars={avatars}/>
        <Comments
            idUser={id}
            pathRoot={'avatars'}
            pathItemId={avatars[indexAvatar].id}
        />
    </> : <Typography
        variant={'body2'}
        color={'text.other'}
        className={styles.notAvatar}>
        ?????? ???????? ???? ????????????..
        {myPage ?  <div className={styles.addPhoto}>
            <ChangeAvatarBtn
                text={'???????????????? ????????'}
            />
        </div> : null}
    </Typography>;

    return (
        <div>
            <Row className={styles.root}>
                {avatars && <Col className={styles.counterroot} xl={12}>
                    <Paper className={styles.counter}>
                        {indexAvatar + 1} ???????? ?? {avatars.length}
                    </Paper>
                </Col>}
                <Row className={styles.wrap}>
                    <Col
                        style={styleList}
                        className={styles.list}
                        xl={colAvatarList}>
                        {content}
                    </Col>

                    {myPage && avatars && avatars.length ? <Col xl={3}>
                        <AvatarSidebar
                            indexAvatar={indexAvatar}
                            idUser={id}
                            avatars={avatars}
                        />
                    </Col> : null}
                </Row>

            </Row>

        </div>
    );
};

export default AvatarsCollection;