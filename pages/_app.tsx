import '../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/firebase/firebase'
import {AppProps} from 'next/app'
import {useEffect} from 'react'
import Layout from "../src/components/layout/Layout";
import {Provider} from 'react-redux'
import store, {wrapper} from '../src/redux/store'
import SnackBars from "../src/components/snackBar/snackBar";
import Head from "next/head";
import {useRouter} from "next/router";


function MyApp({Component, pageProps}: AppProps) {
    const router = useRouter();
    const {pathname} = router;
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (!(localStorage.getItem('token'))) {
                if (!((pathname === '/signin') || (pathname === '/register') || (pathname === '/sendpassword'))) {
                    router.push('/signin')
                }

            }
        }


    }, []);

    return (

        <>
            <Head>
                <title>
                    Wall
                </title>
                <meta name="description" content="Wall"/>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
            </Head>
            <Provider store={store}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
                <SnackBars/>
            </Provider>
        </>


    )
}

export default wrapper.withRedux(MyApp)
