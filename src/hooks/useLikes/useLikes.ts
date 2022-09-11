import {setDoc,getDocs, collection, doc,deleteDoc } from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {useState} from "react";

import {useSnackBar} from "../useSneckBar/useSnackBars";
import {
    IAddLikeProps,
    ILikesProps,
    IMutationLikeProps

} from "../../types/likes/";



export function useLikes() {
    const {setSnackBar} = useSnackBar();

    const [loadingGetLikes, setLoadingGetLikes] = useState<boolean>(false);
    const [loadingDeleteLike, setLoadingDeleteLike] = useState<boolean>(false);
    const [loadingAddLike, setLoadingAddLike] = useState<boolean>(false);




    const addLike = async (props: IAddLikeProps) => {
        setLoadingAddLike(true);
        const {idUser,pathRoot,pathItemId,idCurrentUser,authorNameLike} = props;
        try {
            await setDoc(doc(db, "users", idUser, pathRoot,pathItemId,"likes",idCurrentUser), {
                like: true,
                authorNameLike:authorNameLike
            });
            setSnackBar('ви успішно поставили вподобайку!', 'success');
            setLoadingAddLike(false);
        } catch (error: any) {
            setLoadingAddLike(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };


    const deleteLike = async (props: IMutationLikeProps) => {
        setLoadingDeleteLike(true);
        const {idUser,pathRoot,pathItemId,idCurrentUser} = props;
        try {
            await deleteDoc(doc(db, "users", idUser, pathRoot,pathItemId,"likes",idCurrentUser));
            setLoadingDeleteLike(false);
        } catch (error: any) {
            setLoadingDeleteLike(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };


    const getLikes = async (props:ILikesProps) => {
        const {idUser,pathRoot,pathItemId} = props;
        const docRef = collection(db, "users",idUser, pathRoot,pathItemId,"likes");
        setLoadingGetLikes(true);
        const res = await getDocs(docRef);
        try{
            const results = (res.docs.map((data) => {
                return { ...data.data(), id: data.id }
            }));
            setLoadingGetLikes(false);
            return results;


        }catch (error) {
            setLoadingGetLikes(false);
        }


    };



    return {
        loadingAddLike,
        loadingDeleteLike,
        loadingGetLikes,

        getLikes,
        addLike,
        deleteLike
    };
}