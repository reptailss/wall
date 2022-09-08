import {doc, getDoc, serverTimestamp, setDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {IUpdateUserProfileProps} from "../../types/profile";
import {useState} from "react";

import {useSnackBar} from "../useSneckBar/useSnackBars";
import {useAppDispatch} from "../redux";
import {setUserSliceProfile} from '../../redux/slice/userSlice'



export function useUsers() {
    const {setSnackBar} = useSnackBar();
    const [loadingSetUserProfile, setloadingSetUserProfile] = useState<boolean>(false);
    const [loadingGetUserProfile, setloadingGetUserProfile] = useState<boolean>(true);
    const [loadingGetUserProfileOther, setLoadingGetUserProfileOther] = useState<boolean>(true);
    const dispatch = useAppDispatch();


    const setUserProfile = async (props: IUpdateUserProfileProps) => {

        setloadingSetUserProfile(true);
        const {id, body, snack} = props;
        try {
            await setDoc(doc(db, 'users', id), {
                ...body,
                timestamp: serverTimestamp()
            });

            if (snack) {
                setSnackBar('Ви успішно Оновили профіль!', 'success');
            }

            setloadingSetUserProfile(false);
        } catch (error: any) {
            setloadingSetUserProfile(false);
            setSnackBar(error.code, 'error');
            console.log(error)
            throw  error;
        }
    };

    const getUserProfile = async (id: string) => {
        setloadingGetUserProfile(true)
        const docRef = doc(db, "users", id);
        try {
            const res = await getDoc(docRef);
            const profile = res.data();
            dispatch(setUserSliceProfile({
                ...profile
            }));
            setloadingGetUserProfile(false);

        } catch (error: any) {
            setloadingGetUserProfile(false)
            setSnackBar(error.code, 'error');
            console.log(error)
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
            console.log(error)
            throw  error;
        }

    };



    return {
        loadingSetUserProfile,
        loadingGetUserProfile,
        loadingGetUserProfileOther,
        setUserProfile,
        getUserProfile,
        getUserProfileOther,
    };
}