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
        const { id,isAuth} = useAppSelector(state => state.user);
        const {themeMode} = useAppSelector(state => state.theme);
        const dispatch = useAppDispatch();
        const theme = createTheme(getDesignTokens(themeMode));
        const {getUserProfile} = useUsers();

        const styleRoot = themeMode === 'dark' ? {
            backgroundColor: '#18191A'
        } : {};

        const router = useRouter();



        useEffect(() => {
            const onGetUserProfile = async () => {
                if (auth.currentUser && id) {
                    await getUserProfile(id)
                }
            };
            onGetUserProfile();
        }, [auth]);


        useEffect(() => {
            const onGetUser = () => {
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        // router.push(`/`);
                        dispatch(setUser({
                            email: user.email,
                            id: user.displayName,
                            token: user.refreshToken,
                        }));
                        dispatch(setIsAuth(true));

                        if(user.displayName){
                            getUserProfile(user.displayName)
                        }

                    } else {

                    }
                });

            };
            onGetUser();
            return () =>{
                onGetUser();
            }
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
                                {isAuth && <Navigate/>}
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