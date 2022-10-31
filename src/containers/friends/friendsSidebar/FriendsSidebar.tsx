import React, {FC, useEffect, useState} from 'react';
import {useAppSelector} from "../../../hooks/redux";
import {useFriends} from "../../../hooks/useFriends/useFriends";
import {IFriendItem} from "../../../types/friends";
import SpinnerBlock from "../../../components/spinner/Spinner";

import FriendSidebarItem from "./friendSidebarItem/FriendSidebarItem";
import {Col, Row} from "react-bootstrap";
import Link from "next/link";
import LinkMU from '@mui/material/Link'

import styles from './styles.module.scss'
import {Paper, Typography} from "@mui/material";
import NotItems from "../../../components/notItems/NotItems";

interface IFriendsSidebarProps {
    userId: string,
    myPage?: boolean
}

const FriendsSidebar: FC<IFriendsSidebarProps> = ({userId, myPage}) => {

    const {totalFriends: currentTotalFriends} = useAppSelector(state => state.user);
    const {totalConfirm: currentTotalConfirm} = currentTotalFriends;
    const [totalConfirm, setTotalConfirm] = useState<number>(0);

    const {
        getFriendsConfirmedUsers,
        loadingGetFriendsConfirmedUsers,
        getTotalFriends,
    } = useFriends();

    const [friends, setFriends] = useState<IFriendItem[]>();

    const onGetTotalFriends = async () => {
        const res = await getTotalFriends({
            userId
        });
        setTotalConfirm(res.totalConfirm);
    };

    useEffect(() => {
        if (userId) {
            onGetFriendsConfirmedUsers();
        }
    }, [userId, currentTotalFriends]);

    useEffect(() => {
        if (!myPage && userId) {
            onGetTotalFriends();
        }
    }, [userId]);

    const onGetFriendsConfirmedUsers = async () => {

        const res = await getFriendsConfirmedUsers({
            userId,
            limitFriend: 6
        });
        //@ts-ignore
        setFriends(res);
    };


    const friendsList = friends && friends.map((item) => {
        return <Col xs={4}
                    md={2}
                    xl={4}
                    key={item.id}>
            <FriendSidebarItem
                {...item}/>
        </Col>
    });

    const pathLink = myPage ? '/friendsConfirmed' : `/userFriendsConfirmed/${userId}`;

    return (
        <div className={styles.root}>
            <Paper className={styles.info}>
                <Typography
                    color={'text.other'}
                    variant={'body2'}
                >
                    друзі ({myPage ? currentTotalConfirm : totalConfirm})
                </Typography>

                <Link href={pathLink}>
                    <LinkMU underline="none"
                            component="div"
                            color="secondary">
                        <Typography
                            className={styles.full}
                            variant={'body2'}
                        >
                            всі
                        </Typography>
                    </LinkMU>
                </Link>

            </Paper>
            <Row className={styles.root}>
                {loadingGetFriendsConfirmedUsers ? <SpinnerBlock/> : friends && friends.length ? friendsList :
                    null}
            </Row>

        </div>
    )
};

export default FriendsSidebar;