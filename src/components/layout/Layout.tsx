import React, {FC, ReactNode, useEffect} from 'react';
import Header from "../header/Header";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {getDesignTokens} from '../../constans/theme'
import styles from './styles.module.scss'
import {useAuth} from "../../hooks/useAuth/useAuth";
import SpinnerBlock from "../spinner/Spinner";
import {useRouter} from "next/router";
import {Col, Container, Row} from "react-bootstrap";
import Navigate from "../../containers/navigate/Navigate";
import {setIsAuth, setUser} from "../../redux/slice/userSlice";

import {getAuth, onAuthStateChanged,} from "firebase/auth";
import {useUsers} from "../../hooks/useUser/UseUser";

interface ILayoutProps {
    children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({children}) => {
        const auth = getAuth();
        const dispatch = useAppDispatch();
        const {themeMode} = useAppSelector(state => state.theme);
        const theme = createTheme(getDesignTokens(themeMode));
        const {loadingUser} = useAuth();
        const {pathname} = useRouter();
        const {getUserProfile} = useUsers();
        const styleRoot = themeMode === 'dark' ? {
            backgroundColor: '#18191A'
        } : {};

        const router = useRouter();
        useEffect(() => {
            if (typeof window !== "undefined") {
                if (!(localStorage.getItem('token'))) {
                    router.push('/signin')
                }
            }

        }, []);

        if (loadingUser) {
            return <div
                className={styles.spinnerInner}>
                <SpinnerBlock/>
            </div>
        }
        if ((pathname === '/signin') || (pathname === '/register') || (pathname === '/sendPassword')) {
            return (
                <div
                    style={styleRoot}
                    className={styles.root}>
                    <ThemeProvider theme={theme}>
                        <>
                            {children}
                        </>
                    </ThemeProvider>
                </div>
            )
        }


        const authChangeState = onAuthStateChanged(auth, async (user) => {
            if (user) {
                dispatch(setIsAuth(true));
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken,
                }));

                getUserProfile(user.uid);
                localStorage.setItem('id', user.uid);

            } else {

            }
        });


        return (
            <div
                style={styleRoot}
                className={styles.root}>
                <ThemeProvider theme={theme}>
                    <Col xl={12}>
                        <Header/>
                    </Col>
                    <Container
                        className={styles.container}
                    >
                        <Row>
                            <Col sx={12} xl={2}>
                                <Navigate/>
                            </Col>
                            <Col sx={12} xl={10}>
                                {children}
                            </Col>
                        </Row>

                    </Container>
                </ThemeProvider>
            </div>
        );
    }
;

export default Layout;