import React from 'react';
import {Button, Paper} from '@mui/material';
import styles from "./styles.module.scss";
import Link from "next/link";
import LinkMU from '@mui/material/Link'
import {useRouter} from "next/router";
import {useAppSelector} from "../../../hooks/redux";

const NavigateFriends = () => {

    const {pathname} = useRouter();

    const variantlConfirmed = pathname === '/friendsConfirmed' ? 'contained' : 'outlined';
    const variantRequest = pathname === '/friendsRequest' ? 'contained' : 'outlined';
    const variantCurrentRequest = pathname === '/friendsCurrentRequest' ? 'contained' : 'outlined';

    const {id} = useAppSelector(state => state.user);


    const {totalConfirm, totalOtherRequest, totalRequest} = useAppSelector(state => state.user.totalFriends);

    return (
        <Paper className={styles.root}>
            <Link href={'/friendsConfirmed'}>
                <LinkMU underline="none"
                        component="div"
                        color="secondary">
                    <Button
                        component={'div'}
                        className={styles.btn}
                        variant={variantlConfirmed}
                        color="secondary">
                        друзі ({totalConfirm})
                    </Button>
                </LinkMU>
            </Link>
            <Link href={'/friendsRequest'}>
                <LinkMU underline="none"
                        component="div"
                        color="secondary">

                    <Button

                        component={'div'}
                        className={styles.btn}
                        variant={variantRequest}
                        color="secondary">
                        заявки ({totalOtherRequest})
                    </Button>
                </LinkMU>
            </Link>
            <Link href={'/friendsCurrentRequest'}>
                <LinkMU underline="none"
                        component="div"
                        color="secondary">

                    <Button

                        component={'div'}
                        className={styles.btn}
                        variant={variantCurrentRequest}
                        color="secondary">
                        мої заявки ({totalRequest})
                    </Button>
                </LinkMU>
            </Link>
        </Paper>
    );
};

export default NavigateFriends;