import {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'
import HomePage from "../src/screen/homePage/HomePage";
import {wrapper} from "../src/redux/store";


const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Моя сторінка</title>
            </Head>
            <HomePage/>
        </>
    )
};

export default Home

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) => async (ctx) =>{

    return{
        props:{}
    }
});