import React, {FC, ReactNode, useEffect, useState} from 'react';
import Header from "../header/Header";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {getDesignTokens} from '../../constans/theme'
import styles from './styles.module.scss'
import {Col, Container, Row} from "react-bootstrap";
import Navigate from "../../containers/navigate/Navigate";
import {setIsAuth, setTotalFriends, setUser} from "../../redux/slice/userSlice";
import Toolbar from '@mui/material/Toolbar';
import {getAuth, onAuthStateChanged,} from "firebase/auth";
import {useUsers} from "../../hooks/useUser/UseUser";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import useMedia from "../../hooks/useMedia/useMedia";
import ModalSignIn from "./modalSignIn/ModalSignIn";
import {useRouter} from "next/router";

interface ILayoutProps {
    children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({children}) => {
        const auth = getAuth();
        const {id, isAuth} = useAppSelector(state => state.user);
        const {themeMode} = useAppSelector(state => state.theme);
        const dispatch = useAppDispatch();
        const theme = createTheme(getDesignTokens(themeMode));
        const {getUserProfile} = useUsers();
        const {isDesktop} = useMedia();
        const [loading, setLoading] = useState<boolean>(true);
        const [openModal, setOpenModal] = useState(false);

    const {pathname} = useRouter();

        const styleRoot = themeMode === 'dark' ? {
            backgroundColor: '#18191A'
        } : {};

        useEffect(() => {
            if (!isAuth && !loading && !(pathname === '/signin') && !(pathname === '/register') && !(pathname === '/sendPassword')) {
                setTimeout(() => {
                    setOpenModal(true);
                    setTimeout(() => {
                        setOpenModal(false)
                    }, 500)
                }, 1000)
            }
        }, [isAuth,loading]);


        useEffect(() => {
            const onGetUserProfile = async () => {
                if (auth.currentUser && id) {
                    await getUserProfile(id)
                }
            };
            onGetUserProfile();
        }, [auth]);

        let unsub = () => {
        };

        useEffect(() => {
            if (db && id && isAuth) {
                unsub = onSnapshot(doc(db, "users", id, "friends", "counter"), (doc) => {
                   if(!(doc.data() === undefined)){
                       dispatch(setTotalFriends(doc.data()))
                   }
                });
            }

            return () => {
                unsub();
            };
        }, [db, id, isAuth]);


        useEffect(() => {
            const onGetUser = () => {
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        dispatch(setUser({
                            email: user.email,
                            id: user.displayName,
                            token: user.refreshToken,
                        }));
                        dispatch(setIsAuth(true));
                        setLoading(false);

                        if (user.displayName) {
                            getUserProfile(user.displayName)
                        }

                    } else {
                        setLoading(false);
                    }
                });

            };
            onGetUser();
            return () => {
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
                        <Toolbar/>
                        <ModalSignIn
                            openModal={openModal}/>
                    </Col>
                    <Container>
                        <Row>
                            <Col sx={12} xl={2}>
                                {isAuth && isDesktop && <Navigate/>}
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