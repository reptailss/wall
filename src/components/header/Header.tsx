import React, {FC, ReactElement, ReactNode} from 'react';
import {setThemeMode} from '../../redux/slice/themeSlice'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";


import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';



import styles from './styles.module.scss'
import {Col, Container, Row} from "react-bootstrap";
import Logo from "../../resources/svg/logo/Logo";
import Link from "next/link";
import LinkMU from '@mui/material/Link'
import UserSideBar from "../../containers/user/userSideBar/UserSideBar";
import {useRouter} from "next/router";
import SignInButton from "../signInButton/signInButton";
import useMedia from "../../hooks/useMedia/useMedia";
import MobileNavigate from "../../containers/mobileNavigate/mobileNavigate";


import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';


interface Props {
    children: React.ReactElement;
}

function HideOnScroll(props: Props) {
    const { children} = props;

    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}


const Header = () => {
    const {themeMode} = useAppSelector(state => state.theme);
    const dispatch = useAppDispatch();

    const{isDesktop} = useMedia();

    const{isAuth} = useAppSelector(state => state.user);

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
          <HideOnScroll>

              {!visibleHeader ? <AppBar >
                  <Toolbar>

                      <Container>
                          <Row className={styles.row}>
                              <Col className={styles.innerLogo} sx={3}>
                                  {isAuth && !isDesktop && <div className={styles.mobileNavigate}>
                                      <MobileNavigate/>
                                  </div>}
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
                                  {!isAuth && <SignInButton/>}


                                  <UserSideBar/>
                              </Col>
                          </Row>
                      </Container>


                  </Toolbar>
              </AppBar> : <div>

              </div>}
          </HideOnScroll>
        </>
    );
};

export default Header;