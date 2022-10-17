import React from 'react';
import {Button, Paper} from '@mui/material';
import styles from "./styles.module.scss";
import Link from "next/link";
import LinkMU from '@mui/material/Link'
import {useRouter} from "next/router";
import {useAppSelector} from "../../../hooks/redux";

const NavigateFriends = () => {

    const {pathname} = useRouter();

    const variantConfirmed = pathname === '/friendsConfirmed' ? 'contained' : 'outlined';
    const variantOtherRequest = pathname === '/friendsOtherRequest' ? 'contained' : 'outlined';
    const variantMytRequest = pathname === '/friendsMyRequest' ? 'contained' : 'outlined';



    const {totalConfirm, totalOtherRequest, totalMyRequest} = useAppSelector(state => state.user.totalFriends);

    return (
        <Paper className={styles.root}>
            <Link href={'/friendsConfirmed'}>
                <LinkMU underline="none"
                        component="div"
                        color="secondary">
                    <Button
                        component={'div'}
                        className={styles.btn}
                        variant={variantConfirmed}
                        color="secondary">
                        друзі ({totalConfirm})
                    </Button>
                </LinkMU>
            </Link>
            <Link href={'/friendsOtherRequest'}>
                <LinkMU underline="none"
                        component="div"
                        color="secondary">
                    <Button
                        component={'div'}
                        className={styles.btn}
                        variant={variantOtherRequest}
                        color="secondary">
                        заявки ({totalOtherRequest})
                    </Button>
                </LinkMU>
            </Link>
            <Link href={'/friendsMyRequest'}>
                <LinkMU underline="none"
                        component="div"
                        color="secondary">
                    <Button
                        component={'div'}
                        className={styles.btn}
                        variant={variantMytRequest}
                        color="secondary">
                        мої заявки ({totalMyRequest})
                    </Button>
                </LinkMU>
            </Link>
        </Paper>
    );
};

export default NavigateFriends;