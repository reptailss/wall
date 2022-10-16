import {addDoc,
    setDoc,
    getDocs,
    collection,
    doc,
    getDoc,
    serverTimestamp,
    updateDoc,
    deleteDoc
} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {useState} from "react";
import {useSnackBar} from "../useSneckBar/useSnackBars";
import {
    IDeleteAvatarsCollection,
    IGetAvatarsCollection,
    IUpdateCurrentAvatarProps,
    ICounterAvatarsProps, ISetAvatarsCommentsProps, IAddAvatarsCollectionProps
} from "../../types/avatar/avatar";






export function useAvatar() {
    const {setSnackBar} = useSnackBar();
    const [loadingUpdateCurrentAvatar, setUpdateCurrentAvatar] = useState<boolean>(false);
    const [loadingAddAvatarsCollection, setAddAvatarsCollection] = useState<boolean>(false);
    const [loadingDeleteAvatarCollection, setLoadingDeleteAvatarCollection] = useState<boolean>(false);
    const [loadingGetAvatarCollection, setGetAvatarCollection] = useState<boolean>(false);
    const [loadingGetTotalAvatars, setLoadingGetTotalAvatars] = useState<boolean>(false);
    const [loadingSetTotalAvatars, setLoadingSetTotalAvatars] = useState<boolean>(false);



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

    const addAvatarsCollection = async (props: IAddAvatarsCollectionProps) =>{
        setAddAvatarsCollection(true);
        const {id, pathImg,idAvatar} = props;
        try {

            const ref = doc(db,
                "users",
                id, "avatars",
                idAvatar);

            await setDoc(ref, {
                pathImg: pathImg,
                totalLikes:0,
                totalComments:0,
                timestamp: serverTimestamp()
            });
            setAddAvatarsCollection(false);
        } catch (error: any) {
            setAddAvatarsCollection(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };


    const deleteAvatarsCollection = async (props: IDeleteAvatarsCollection) => {
        setLoadingDeleteAvatarCollection(true);
        const {idUser, idAvatar} = props;
        try {
            await deleteDoc(doc(db, "users",idUser, "avatars",idAvatar));
            setSnackBar('ви успішно видалили фотографію!', 'success');
            setLoadingDeleteAvatarCollection(false);
        } catch (error: any) {
            setLoadingDeleteAvatarCollection(false);
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

    const getTotalAvatars = async (props: ICounterAvatarsProps) => {
        setLoadingGetTotalAvatars(true);
        const {idUser, pathRoot, pathItemId} = props;
        const docRef = doc(db, "users", idUser, pathRoot, pathItemId,);
        try {
            const res = await getDoc(docRef);
            setLoadingGetTotalAvatars(false);

            if (res.exists()) {
                return res.data().totalAvatars;
            } else {
                return 0;
            }

        } catch (error: any) {
            setSnackBar(error.code, 'error');
            console.log(error);
            setLoadingGetTotalAvatars(false);
            throw  error;
        }

    };

    const setTotalAvatars = async (props: ISetAvatarsCommentsProps) => {
        setLoadingSetTotalAvatars(true);
        const {idUser, pathRoot, pathItemId, totalAvatars} = props;
        try {
            await updateDoc(doc(db, "users", idUser, pathRoot, pathItemId), {
                totalAvatars: totalAvatars
            });
            setLoadingSetTotalAvatars(false);

        } catch (error: any) {
            setSnackBar(error.code, 'error');
            console.log(error);
            setLoadingSetTotalAvatars(false);
            throw  error;
        }
    };




    return {
        loadingUpdateCurrentAvatar,
        loadingAddAvatarsCollection,
        loadingGetAvatarCollection,
        loadingDeleteAvatarCollection,
        loadingGetTotalAvatars,
        loadingSetTotalAvatars,

        getTotalAvatars,
        setTotalAvatars,
        deleteAvatarsCollection,
        getAvatarsCollection,
        addAvatarsCollection,
        updateCurrentAvatar,

    };
}