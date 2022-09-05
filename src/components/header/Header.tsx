import React from 'react';
import {setThemeMode} from '../../redux/slice/themeSlice'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";


import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';


import styles from './styles.module.scss'
import {Col, Container, Row} from "react-bootstrap";
import Logo from "../../resources/svg/logo/Logo";
import Link from "next/link";
import LinkMU from '@mui/material/Link'
import UserSideBar from "../../containers/user/userSideBar/UserSideBar";
import {useRouter} from "next/router";

const Header = () => {
    const {themeMode} = useAppSelector(state => state.theme);
    const dispatch = useAppDispatch();

    const toggleTheme = () => {
        if (themeMode === 'light') {
            dispatch(setThemeMode('dark'))
        } else {
            dispatch(setThemeMode('light'))
        }

    };
    const {pathname} = useRouter();

    const visibleHeader = (pathname === '/signin') || (pathname === '/register') || (pathname === '/sendpassword') ;


    return (
        <>
            {!visibleHeader && <AppBar position="static">
                <Toolbar>
                    <Container>
                        <Row className={styles.row}>
                            <Col sx={3}>
                                <Link href={'/'}>
                                    <LinkMU underline="none"
                                            variant="h6"
                                            component="div"
                                            color="secondary"
                                            className={styles.logo}>
                                        <span>Wall</span>
                                        <Logo/>
                                    </LinkMU>
                                </Link>


                            </Col>
                            <Col className={styles.menu} sx={9}>
                                <Button color="secondary" onClick={toggleTheme}>
                                    theme
                                </Button>
                                <UserSideBar/>
                            </Col>
                        </Row>
                    </Container>


                </Toolbar>
            </AppBar>}
        </>
    );
};

export default Header;