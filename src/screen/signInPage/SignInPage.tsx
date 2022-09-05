import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Login from "../../containers/auth/login/Login";
import styles from './styles.module.scss'
import Logo from "../../resources/svg/logo/Logo";
import {Typography} from "@mui/material";
import Modal from "../../components/modal/Modal";
import Register from "../../containers/auth/register/Register";
import SendPassword from "../../containers/auth/sendPassword/SendPassword";
import Button from "@mui/material/Button";
import Link from "next/link";
import LinkMU from '@mui/material/Link'

const SignInPage = () => {
    return (
        <Container className={styles.root}>
            <Row className={styles.row}>
                <Col className={styles.info} xl={4}>
                    <div className={styles.title}>

                        <Typography
                            variant="h1"
                            component="h1">
                            Wall
                        </Typography>;
                        <Logo/>
                    </div>
                    <div>
                        Перша Українська соціальна мережа
                    </div>
                </Col>
                <Col xl={4}>
                    <div className={styles.login}>
                        <Login/>
                    </div>
                    <div className={styles.registerInner}>

                    </div>
                    <div className={styles.help}>
                        <Button
                            variant="outlined"
                            component="div"
                            className={styles.btn}>
                            <Link href={'/register'}>
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
                            variant="outlined"
                            component="div"
                            className={styles.btn}>
                            <Link href={'/sendPassword'}>
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
                </Col>
            </Row>
        </Container>
    );
};

export default SignInPage;