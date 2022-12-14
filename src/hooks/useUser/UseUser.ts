import {doc,
    getDoc,
    serverTimestamp,
    setDoc,
    updateDoc ,
    collection,
    getDocs,query,
    orderBy,
    limit
} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {IGetNewUsers, IUpdateUserProfileProps, IUpUserProfileProps} from "../../types/profile";
import {useState} from "react";

import {useSnackBar} from "../useSneckBar/useSnackBars";
import {useAppDispatch} from "../redux";
import {setUserSliceProfile,setLoadingProfile} from '../../redux/slice/userSlice'




export function useUsers() {
    const {setSnackBar} = useSnackBar();

    const [loadingGetUserProfile,
        setloadingGetUserProfile] = useState<boolean>(true);
    const [loadingGetUserProfileOther,
        setLoadingGetUserProfileOther] = useState<boolean>(true);

    const [loadingUpdateUserProfile,
        setLoadingUpdateUserProfile] = useState<boolean>(false);

    const [loadingGetNewUsers,
        setLoadingGetNewUsers] = useState<boolean>(false);

    const dispatch = useAppDispatch();


    const setUserProfile = async (props: IUpdateUserProfileProps) => {

        setloadingGetUserProfile(true);
        const {id, body, snack} = props;
        try {
            await setDoc(doc(db, 'users', id), {
                ...body,
                timestamp: serverTimestamp()
            });

            if (snack) {
                setSnackBar('Ви успішно Оновили профіль!', 'success');
            }

            setloadingGetUserProfile(false);
        } catch (error: any) {
            setloadingGetUserProfile(false);
            setSnackBar(error.code, 'error');
            console.log(error)
            throw  error;
        }
    };

    const updateUserProfile = async (props: IUpUserProfileProps) => {

        setLoadingUpdateUserProfile(true);
        const {id, body, snack} = props;
        try {
            await updateDoc (doc(db, 'users', id), {
                ...body,
            });

            if (snack) {
                setSnackBar('Ви успішно Оновили профіль!', 'success');
            }

            setLoadingUpdateUserProfile(false);
        } catch (error: any) {
            setLoadingUpdateUserProfile(false);
            setSnackBar(error.code, 'error');
            console.log(error)
            throw  error;
        }
    };

    const getUserProfile = async (id: string ) => {
        setloadingGetUserProfile(true);
        dispatch(setLoadingProfile(true));
        const docRef = doc(db, "users", id);
        try {
            const res = await getDoc(docRef);
            const profile = res.data();
            dispatch(setUserSliceProfile({
                ...profile
            }));
            setloadingGetUserProfile(false);
            dispatch(setLoadingProfile(false));

        } catch (error: any) {
            setloadingGetUserProfile(false);
            dispatch(setLoadingProfile(false));
            setSnackBar(error.code, 'error');
            console.log(error);
            throw  error;
        }

    };

    const getUserProfileOther = async (id: string) => {
        const docRef = doc(db, "users", id);
        setLoadingGetUserProfileOther(true);
        try {
            const res = await getDoc(docRef);
            setLoadingGetUserProfileOther(false);
            return res.data();


        } catch (error: any) {
            setLoadingGetUserProfileOther(false)
            setSnackBar(error.code, 'error');
            console.log(error);
            throw  error;
        }

    };

    const getNewUsers = async (props:IGetNewUsers) => {

        const{limitUsers} = props;

        const docRef =  query(collection(db, "users"),
            orderBy('timestamp', 'desc')
            ,limit(limitUsers));

        setLoadingGetNewUsers(true);
        const res = await getDocs(docRef);
        try{
            const results = (res.docs.map((data) => {
                return { ...data.data(), id: data.id }
            }));
            setLoadingGetNewUsers(false);
            return results;


        }catch (error) {
            setLoadingGetNewUsers(false);
        }


    };




    return {
        loadingGetUserProfile,
        loadingGetUserProfileOther,
        loadingUpdateUserProfile,
        loadingGetNewUsers,

        setUserProfile,
        getUserProfile,
        getUserProfileOther,
        updateUserProfile,
        getNewUsers,

    };
}