import React, {FC, ReactNode, useEffect, useState} from 'react';
import Header from "../header/Header";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {getDesignTokens} from '../../constans/theme'
import styles from './styles.module.scss'
import {useRouter} from "next/router";
import {Col, Container, Row} from "react-bootstrap";
import Navigate from "../../containers/navigate/Navigate";
import {setUser,setIsAuth} from "../../redux/slice/userSlice";

import {getAuth, onAuthStateChanged,} from "firebase/auth";
import {useUsers} from "../../hooks/useUser/UseUser";

interface ILayoutProps {
    children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({children}) => {

        const auth = getAuth();
        const { id} = useAppSelector(state => state.user);
        const {themeMode} = useAppSelector(state => state.theme);
        const dispatch = useAppDispatch();
        const theme = createTheme(getDesignTokens(themeMode));
        const {getUserProfile} = useUsers();

        const styleRoot = themeMode === 'dark' ? {
            backgroundColor: '#18191A'
        } : {};

        const router = useRouter();
        useEffect(() => {
            if (typeof window !== "undefined") {
                if ( !(localStorage.getItem('token'))) {
                    router.push('/signin')
                }
            }

        }, []);


        useEffect(() => {
            const onGetUserProfile = async () => {
                if (auth.currentUser && id) {
                    await getUserProfile(id)
                }
            };
            onGetUserProfile();
        }, [auth]);


        useEffect(() => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    dispatch(setUser({
                        email: user.email,
                        id: user.uid,
                        token: user.refreshToken,
                    }));
                    dispatch(setIsAuth(true));

                    getUserProfile(user.uid)
                } else {

                }
            })
        }, []);



        return (
            <div
                style={styleRoot}
                className={styles.root}>
                <ThemeProvider theme={theme}>
                    <Col xl={12}>
                        <Header/>
                    </Col>
                    <Container
                        className={styles.container}>
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