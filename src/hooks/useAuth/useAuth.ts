import {
    createUserWithEmailAndPassword,
    getAuth,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";


import {useAppDispatch} from "../redux";
import {removeUser, setUser,setIsAuth} from '../../redux/slice/userSlice'
import {useSnackBar} from "../useSneckBar/useSnackBars";
import {useRouter} from 'next/router'
import {useState} from "react";
import {useUsers} from "../useUser/UseUser";


export function useAuth() {
    const auth = getAuth();
    const {setSnackBar} = useSnackBar();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [loadingOut, setLoadingOut] = useState<boolean>(false);
    const [loadingUser, setLoadingUser] = useState<boolean>(false);
    const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
    const [loadingRegister, setLoadingRegister] = useState<boolean>(false);
    const [loadingSendPassword, setLoadingSendPassword] = useState<boolean>(false);


    const loginUser = async (email: string, password: string) => {
        setLoadingLogin(true);
        setLoadingUser(true);
        try{
            const res = await signInWithEmailAndPassword(auth, email, password);
           dispatch( setIsAuth(true));
            const{user} = res;
            dispatch(setUser({
                email: user.email,
                id: user.uid,
                token: user.refreshToken,
            }));
            localStorage.setItem('token', user.refreshToken);
            localStorage.setItem('id', user.uid);
            setLoadingLogin(false);
            setLoadingUser(false);
            setSnackBar('Ви успішно увійшли!', 'success');
            router.push('/');
        }catch (error:any) {
            setLoadingLogin(false);
            setLoadingUser(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };


    const logOutUser = async () => {
        setLoadingUser(true);
        setLoadingOut(true);
        try{
            await signOut(auth);
            dispatch( setIsAuth(false));
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            dispatch(removeUser());
            setLoadingOut(false);
            setLoadingUser(false);
            setSnackBar('Ви успішно вийшли з аккаунту!', 'info');
            router.push('/signin')
        }catch (error:any) {
            setLoadingOut(false);
            setLoadingUser(false);
            setSnackBar(error.code, 'error');

            throw  error;
        }
    };

    const registerUser = async (email: string, password: string) => {

        setLoadingUser(true);
        setLoadingRegister(true);
        try {

            const res = await await createUserWithEmailAndPassword(auth, email, password);
            const {user} = res;
            dispatch(setUser({
                email: user.email,
                id: user.uid,
                token: user.refreshToken,

            }));
            dispatch( setIsAuth(true));
            localStorage.setItem('token', user.refreshToken);
            localStorage.setItem('id', user.uid);
            setSnackBar('Ви успішно зареєструвалися!', 'success');
            router.push('/');
            setLoadingRegister(false);
            setLoadingUser(false);

            return {
                id:user.uid
            }
        } catch (error:any) {
            setLoadingRegister(false);
            setLoadingUser(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };



    const sendPasswordReset = async (email: string) => {

        try{
            await sendPasswordResetEmail(auth, email);
            setSnackBar('Скооро вам надійде лист на вашу пошту!', 'success');
            setLoadingSendPassword(false);
        }catch (error:any) {
            setLoadingSendPassword(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };







    return {
        loadingOut,
        loadingLogin,
        loadingRegister,
        loadingSendPassword,
        loadingUser,
        logOutUser,
        loginUser,
        registerUser,
        sendPasswordReset,



    };
}