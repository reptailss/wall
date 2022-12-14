import React, {FC} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Login from "../../containers/auth/login/Login";
import styles from './styles.module.scss'
import Logo from "../../resources/svg/logo/Logo";
import {Paper, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import LinkMU from '@mui/material/Link'
import useMedia from "../../hooks/useMedia/useMedia";
import {useAppDispatch} from "../../hooks/redux";
import {setCloseModalSignIn} from "../../redux/slice/userSlice";

interface ISignInPageProps {
    modal?: boolean
}

const SignInPage:FC<ISignInPageProps> = ({modal}) => {

    const {isDesktop,isTablet} = useMedia();
    const dispatch = useAppDispatch();

    const closeModal = ()=>{
        dispatch(setCloseModalSignIn(true))
        setTimeout(()=>{
            dispatch(setCloseModalSignIn(false))
        },500)
    };


    const variantH1 = modal && !isDesktop && !isTablet ? 'h3' : 'h1';


    return (
        <Container className={styles.root}>
            <Row className={styles.row}>
                <Col className={styles.info} xl={4}>
                    <div className={styles.title}>

                        <Typography
                            variant={variantH1}
                            color={'text.primary'}>
                            Wall
                        </Typography>;
                        <Logo/>
                    </div>
                    <Typography
                        color={'text.other'}
                        variant="body1">
                        Перша Українська соціальна мережа
                    </Typography>
                </Col>
                <Col xl={4}>
                    <div className={styles.login}>
                        <Login/>
                    </div>
                    <div className={styles.registerInner}>

                    </div>
                    <div className={styles.help}>
                        <Button
                            onClick={closeModal}
                            variant="outlined"
                            component="div"
                            className={styles.btn}>
                            <Link
                                  href={'/register'}>
                                <LinkMU
                                    underline="none"
                                    variant="body2"
                                    component="div"
                                    color="secondary">
                                    Реєстрація
                                </LinkMU
                                ></Link>
                        </Button>
                        <Button
                            onClick={closeModal}
                            variant="outlined"
                            component="div"
                            className={styles.btn}>
                            <Link

                                href={'/sendPassword'}>
                                <LinkMU
                                    underline="none"
                                    variant="body2"
                                    component="div"
                                    color="secondary">
                                    Забули, пароль?
                                </LinkMU
                                ></Link>
                        </Button>

                    </div>
                    <Paper className={styles.wrap}>
                        <Typography
                            color={'text.other'}
                            variant={'body2'}
                            className={styles.test}>
                            you can use a test user whose details are described below:
                        </Typography>
                        <div className={styles.item}>
                            <Typography
                                variant={'body1'}
                                color={'text.secondary'}
                                className={styles.info}>
                               name:
                            </Typography>
                            <Typography
                                variant={'body1'}
                                color={'text.primary'}>
                                admin@admin.com
                            </Typography>
                        </div>
                        <div className={styles.item}>
                            <Typography
                                variant={'body1'}
                                color={'text.secondary'}
                                className={styles.info}>
                                password:
                            </Typography>
                            <Typography
                                variant={'body1'}
                                color={'text.primary'}>
                                12345678
                            </Typography>
                        </div>

                    </Paper>

                </Col>
            </Row>
        </Container>
    );
};

export default SignInPage;