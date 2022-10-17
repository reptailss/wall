import React from 'react';
import FriendsConfirmed from "../../containers/friends/friendsConfirmed/FriendsConfirmed";
import {useRouter} from "next/router";
import {Paper} from "@mui/material";
import styles from './styles.module.scss'
import Link from "next/link";
import LinkMU from '@mui/material/Link'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


const UserFriendsConfirmedPage = () => {


    const router = useRouter();
    const {id}: any = router.query;


    return (
        <div>
            <Paper className={styles.info}>
                <Link href={`/users/${id}`}>
                    <LinkMU underline="none"
                            variant={'body2'}
                            component="div"
                            color="secondary"
                    >
                        <KeyboardBackspaceIcon/>
                        <span>
                            повернутись до {id}
                        </span>
                    </LinkMU>
                </Link>
            </Paper>
            <FriendsConfirmed
                userId={id}/>
        </div>
    );
};

export default UserFriendsConfirmedPage;