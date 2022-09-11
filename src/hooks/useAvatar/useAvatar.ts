import {addDoc,setDoc,getDocs, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {useState} from "react";

import {useSnackBar} from "../useSneckBar/useSnackBars";
import {IGetAvatarsCollection, IUpdateCurrentAvatarProps} from "../../types/avatar/avatar";




export function useAvatar() {
    const {setSnackBar} = useSnackBar();
    const [loadingUpdateCurrentAvatar, setUpdateCurrentAvatar] = useState<boolean>(false);
    const [loadingAddAvatarsCollection, setAddAvatarsCollection] = useState<boolean>(false);
    const [loadingGetAvatarCollection, setGetAvatarCollection] = useState<boolean>(false);




    const updateCurrentAvatar = async (props: IUpdateCurrentAvatarProps) => {
        setUpdateCurrentAvatar(true);
        const {id, pathImg} = props;
        try {
            const updateAvatarRef = doc(db, "users",id);
            await updateDoc(updateAvatarRef, {
                currentAvatar: pathImg
            });
            setSnackBar('ви успішно Оновили свою автарку!', 'success');
            setUpdateCurrentAvatar(false);
        } catch (error: any) {
            setUpdateCurrentAvatar(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };

    const addAvatarsCollection = async (props: IUpdateCurrentAvatarProps) =>{
        setAddAvatarsCollection(true);
        const {id, pathImg} = props;
        try {
            const newaddAvatarsCollectiontRef = doc(collection(db, "users",id, "avatars"));
            await setDoc(newaddAvatarsCollectiontRef, {
                pathImg: pathImg,
                timestamp: serverTimestamp()
            });
            setAddAvatarsCollection(false);
        } catch (error: any) {
            setAddAvatarsCollection(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };


    const getAvatarsCollection = async (props:IGetAvatarsCollection) => {
        const {id} = props;
        const docRef = collection(db, "users",id, "avatars");
        setGetAvatarCollection(true);
        const res = await getDocs(docRef);
        try{
            const results = (res.docs.map((data) => {
                return { ...data.data(), id: data.id }
            }));
            setGetAvatarCollection(false);
            return results;


        }catch (error) {
            setGetAvatarCollection(false);
        }


    };






    return {
        loadingUpdateCurrentAvatar,
        loadingAddAvatarsCollection,
        loadingGetAvatarCollection,


        getAvatarsCollection,
        addAvatarsCollection,
        updateCurrentAvatar,

    };
}